/**
 * Central config describing every Supabase table the dashboard manages.
 * `fields` drives both the auto-generated form and the list view.
 * field.type options: text | textarea | number | boolean | url | image | date | tags | json
 *
 * Column names match the actual database schema exactly.
 */
export const tableConfigs = {
  profile: {
    label: 'Profile',
    table: 'profile',
    orderBy: null,
    singleton: true,
    titleField: 'full_name',
    fields: [
      { name: 'full_name', label: 'Full name', type: 'text', required: true },
      { name: 'job_title', label: 'Job title', type: 'text' },
      { name: 'bio', label: 'Bio', type: 'textarea' },
      {
        name: 'avatar_url',
        label: 'Avatar image',
        type: 'image',
        bucket: 'avatars',
        help: 'Shown full-height in the Hero. Use a vertical photo framed from mid-chest up — a tight face-only close-up will look cropped.',
        imageGuide: {
          recommendedSize: '1600 × 2000px (or larger, same ratio)',
          aspectRatio: '4 / 5',
          aspectRatioLabel: '4:5 portrait',
          objectPosition: 'object-top',
          previewWidth: 150,
          notes:
            'The Hero crops from the top down, so keep your head near the top third with room below for shoulders/torso. The dashed box shows the safe area — keep your face and torso inside it.',
        },
      },
      { name: 'cv_url', label: 'CV / resume file', type: 'image', bucket: 'cv' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
    ],
  },

  social_links: {
    label: 'Social Links',
    table: 'social_links',
    orderBy: 'order_index',
    titleField: 'platform',
    fields: [
      { name: 'platform', label: 'Platform name', type: 'text', required: true },
      { name: 'url', label: 'URL', type: 'url', required: true },
      { name: 'icon', label: 'Icon', type: 'social-icon', help: 'Pick the icon shown on your portfolio' },
      { name: 'order_index', label: 'Order', type: 'number' },
    ],
  },

  skills: {
    label: 'Skills',
    table: 'skills',
    orderBy: 'order_index',
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Skill name', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'text', help: 'e.g. Frontend, Backend, Tools' },
      { name: 'level', label: 'Level (0-100)', type: 'number' },
      { name: 'icon', label: 'Icon name', type: 'text' },
      { name: 'order_index', label: 'Order', type: 'number' },
    ],
  },

  projects: {
    label: 'Projects',
    table: 'projects',
    orderBy: 'order_index',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image_url', label: 'Cover image', type: 'image', bucket: 'projects' },
      { name: 'technologies', label: 'Technologies', type: 'text', help: 'e.g. React, Tailwind, Supabase' },
      { name: 'live_url', label: 'Live URL', type: 'url' },
      { name: 'github_url', label: 'GitHub URL', type: 'url' },
      { name: 'featured', label: 'Featured', type: 'boolean' },
      { name: 'order_index', label: 'Order', type: 'number' },
    ],
  },

  experience: {
    label: 'Experience',
    table: 'experience',
    orderBy: 'order_index',
    titleField: 'position',
    fields: [
      { name: 'position', label: 'Position / title', type: 'text', required: true },
      { name: 'company', label: 'Company', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'start_date', label: 'Start date', type: 'date' },
      { name: 'end_date', label: 'End date', type: 'date' },
      { name: 'current_job', label: 'Current position', type: 'boolean' },
      { name: 'order_index', label: 'Order', type: 'number' },
    ],
  },

  education: {
    label: 'Education',
    table: 'education',
    orderBy: 'order_index',
    titleField: 'degree',
    fields: [
      { name: 'institution', label: 'Institution', type: 'text', required: true },
      { name: 'degree', label: 'Degree', type: 'text', required: true },
      { name: 'field', label: 'Field of study', type: 'text' },
      { name: 'grade', label: 'Grade', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'start_date', label: 'Start date', type: 'date' },
      { name: 'end_date', label: 'End date', type: 'date' },
      { name: 'order_index', label: 'Order', type: 'number' },
    ],
  },

  certificates: {
    label: 'Certificates',
    table: 'certificates',
    orderBy: 'created_at',
    ascending: false,
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'issuer', label: 'Issuer', type: 'text' },
      { name: 'issue_date', label: 'Issue date', type: 'date' },
      { name: 'credential_url', label: 'Credential URL', type: 'url' },
      { name: 'image_url', label: 'Badge image', type: 'image', bucket: 'certificates' },
    ],
  },
}
