import { useCallback, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'

/**
 * Generic read/write hook for a single Supabase table.
 *
 * @param {string} table - table name
 * @param {object} options
 * @param {string} [options.orderBy] - column to order by
 * @param {boolean} [options.ascending]
 */
export function useSupabaseCRUD(table, { orderBy = 'order_index', ascending = true } = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    if (!supabase || !isSupabaseConfigured) {
      setData([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      let query = supabase.from(table).select('*')
      if (orderBy) query = query.order(orderBy, { ascending })
      const { data: rows, error: err } = await query
      if (err) {
        setError(err.message)
        setData([])
      } else {
        setData(rows ?? [])
      }
    } catch (e) {
      setError(e?.message || 'Database error')
      setData([])
    } finally {
      setLoading(false)
    }
  }, [table, orderBy, ascending])

  useEffect(() => {
    refetch()
  }, [refetch])

  const create = useCallback(
    async (values) => {
      if (!supabase) throw new Error('Supabase client is not configured')
      const { data: row, error: err } = await supabase.from(table).insert(values).select().single()
      if (err) throw new Error(err.message)
      await refetch()
      return row
    },
    [table, refetch]
  )

  const update = useCallback(
    async (id, values) => {
      if (!supabase) throw new Error('Supabase client is not configured')
      const { data: row, error: err } = await supabase
        .from(table)
        .update(values)
        .eq('id', id)
        .select()
        .single()
      if (err) throw new Error(err.message)
      await refetch()
      return row
    },
    [table, refetch]
  )

  const remove = useCallback(
    async (id) => {
      if (!supabase) throw new Error('Supabase client is not configured')
      const { error: err } = await supabase.from(table).delete().eq('id', id)
      if (err) throw new Error(err.message)
      await refetch()
    },
    [table, refetch]
  )

  return { data, loading, error, refetch, create, update, remove }
}
