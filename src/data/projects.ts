export interface ProjectCaseStudy {
  overview: string
  problem: string
  approach: string
  keyFeatures: string[]
  architecture: string
  challenges: string[]
  implementation: string
}

export interface ProjectItem {
  id: string
  title: string
  tagline: string
  category: 'ai-3d' | 'web-app' | 'desktop-system'
  featured: boolean
  flagship?: boolean
  description: string
  technologies: string[]
  imageUrl: string
  galleryImages?: string[]
  githubUrl?: string
  liveUrl?: string
  caseStudy: ProjectCaseStudy
}

const base = import.meta.env.BASE_URL || '/'

export const projectsData: ProjectItem[] = [
  {
    id: 'furnivision',
    title: 'FurniVision',
    tagline: 'AI-Powered Interior Design & 3D Visualization Platform',
    category: 'ai-3d',
    featured: true,
    flagship: true,
    description:
      'A responsive AI-powered web platform for real-time 3D room visualization and furniture customization, integrating Flowise AI recommendations, n8n workflow automation, and perceptual hashing for visual similarity analysis.',
    technologies: [
      'Nuxt.js',
      'Vue.js',
      'Three.js',
      'TresJS',
      'TypeScript',
      'Tailwind CSS',
      'Flowise',
      'n8n',
      'Supabase',
      'Sharp',
      'Perceptual Hashing',
      'Nuxt i18n',
      'Vite PWA',
    ],
    imageUrl: `${base}images/projects/furnivision-transformation.png`,
    galleryImages: [
      `${base}images/projects/furnivision-transformation.png`,
      `${base}images/projects/furnivision-room.jpeg`,
    ],
    githubUrl: 'https://github.com/Ahmed7assan1',
    caseStudy: {
      overview:
        'FurniVision bridges the gap between 2D furniture catalog exploration and spatial interior visualization. It provides a real-time 3D room configurator alongside automated AI consultation and image similarity analysis.',
      problem:
        'Traditional furniture browsing relies on static 2D imagery, making it difficult for clients to judge scale, spatial alignment, and harmonious style matching before making purchasing decisions.',
      approach:
        'Engineered a component-driven 3D web application utilizing Vue.js, TresJS, and Three.js for client-side rendering, coupled with an AI backend pipeline using Flowise and n8n to deliver real-time personalized recommendations.',
      keyFeatures: [
        'Real-time 3D room visualization with camera manipulation and material customization',
        '2D-to-3D visual asset workflow support and spatial placement',
        'Flowise-powered AI interior advisor with conversational context and style recommendations',
        'Automated n8n workflow pipelines connecting webhook events to notification and generation services',
        'Perceptual hashing and Sharp image processing to detect visual similarity across furniture models',
        'Supabase relational schema and storage buckets for 3D assets, furniture metadata, and user profiles',
        'Progressive Web App (PWA) configuration with Workbox for fast asset caching',
        'Bilingual English/Arabic support using Nuxt i18n',
      ],
      architecture:
        'Client-side Nuxt 3 application with TresJS canvas layers connected to Supabase for data persistence and authentication. AI inquiries route through a custom Flowise agentic flow, while automated tasks and notifications execute via orchestrated n8n workflows.',
      challenges: [
        'Optimizing 3D asset rendering performance and memory management across mobile and desktop browsers',
        'Synchronizing complex multi-parameter 3D room state with conversational AI prompt contexts',
        'Implementing fast client-side and server-side visual image similarity without bogging down server load',
      ],
      implementation:
        'Configured optimized Three.js geometry loaders, abstracted 3D scene controls into reusable Vue composables, implemented perceptual hash algorithms with Sharp for texture comparison, and deployed responsive Tailwind UI layouts.',
    },
  },
  {
    id: 'mohameek',
    title: 'Mohameek',
    tagline: 'Comprehensive Legal Services Platform with WebRTC & AI',
    category: 'web-app',
    featured: true,
    flagship: false,
    description:
      'A full-featured legal services platform enabling consultation scheduling, lawyer delegation, client reviews, real-time WebRTC video consultations, and an AI legal assistant powered by Flowise.',
    technologies: [
      'React.js',
      'TypeScript',
      'WebRTC',
      'Flowise',
      'Redux Toolkit',
      'Tailwind CSS',
      'REST APIs',
    ],
    imageUrl: `${base}images/projects/furnivision-room.jpeg`,
    githubUrl: 'https://github.com/Ahmed7assan1',
    caseStudy: {
      overview:
        'Mohameek is a dedicated platform designed to streamline the consultation workflow between clients and certified lawyers, offering verified booking, real-time remote consultations, and AI-driven preliminary legal guidance.',
      problem:
        'Access to preliminary legal advice and consultation scheduling often suffers from fragmented communication channels, lack of lawyer role-based management, and inefficient scheduling.',
      approach:
        'Built a single-page React application with Redux Toolkit for centralized state management, WebRTC peer-to-peer protocols for video consultations, and an integrated Flowise AI assistant.',
      keyFeatures: [
        'Role-based access control differentiating client and attorney workflows',
        'Consultation booking system with calendar scheduling and status updates',
        'Lawyer delegation and assignment mechanisms for multi-lawyer practices',
        'Integrated WebRTC video conferencing for secure remote sessions',
        'AI legal assistant powered by Flowise to address general inquiries and route cases',
        'Client review and feedback rating system for transparent accountability',
      ],
      architecture:
        'React single-page architecture consuming RESTful endpoints with state managed through Redux Toolkit. Real-time media streams negotiated via WebRTC signaling, while chatbot interactions connect to dedicated Flowise endpoints.',
      challenges: [
        'Ensuring reliable WebRTC peer connection establishment across diverse network configurations and firewalls',
        'Managing granular role-based access control and state synchronization between lawyer and client interfaces',
      ],
      implementation:
        'Implemented modular React components, typed service handlers for REST APIs, custom WebRTC connection hooks with error handling, and structured Redux slices for appointment lifecycles.',
    },
  },
  {
    id: 'coffee-shop-management',
    title: 'Coffee Shop Management System',
    tagline: 'Operational Dashboard for Product, Inventory & Order Tracking',
    category: 'web-app',
    featured: true,
    flagship: false,
    description:
      'A Vue.js-based management application for product handling, order tracking, inventory monitoring, and sales operations through a responsive dashboard interface.',
    technologies: ['Vue.js', 'JavaScript', 'Tailwind CSS', 'Pinia', 'REST APIs'],
    imageUrl: `${base}images/projects/furnivision-transformation.png`,
    githubUrl: 'https://github.com/Ahmed7assan1',
    caseStudy: {
      overview:
        'A dedicated point-of-sale and operational back-office dashboard built to track product catalog items, active customer orders, inventory thresholds, and daily sales metrics.',
      problem:
        'Small food and beverage establishments need fast, responsive, and lightweight management tools that run smoothly without complex hardware dependencies.',
      approach:
        'Designed a reactive Vue 3 dashboard using Pinia for centralized state, enabling rapid UI updates as orders are entered, processed, and fulfilled.',
      keyFeatures: [
        'Product catalog management with category filtering and price editing',
        'Real-time order creation, line-item calculations, and order status workflow',
        'Inventory tracking with stock depletion updates as orders finalize',
        'Daily sales summary dashboard displaying key operational metrics',
        'Clean, touch-friendly responsive interface built with Tailwind CSS',
      ],
      architecture:
        'Vue 3 component tree with Pinia stores handling catalog, active cart, and order history state, backed by clean API integration services.',
      challenges: [
        'Ensuring reactive state calculations remained instantaneous during rapid high-volume order entry',
        'Maintaining clean separation between inventory mutation logic and UI presentation',
      ],
      implementation:
        'Structured modular Vue components with strict prop validation, reactive computed properties for tax and total computations, and accessible forms.',
    },
  },
  {
    id: 'hotel-booking-system',
    title: 'Hotel Booking System',
    tagline: 'Desktop Reservation & Room Allocation Management',
    category: 'desktop-system',
    featured: false,
    flagship: false,
    description:
      'Desktop application for managing hotel room reservations, guest check-ins, and booking lifecycles with real-time SQL Server database transactions.',
    technologies: ['C#', '.NET', 'SQL Server', 'ADO.NET / Entity Framework'],
    imageUrl: `${base}images/projects/furnivision-room.jpeg`,
    caseStudy: {
      overview:
        'A robust desktop reservation management system developed as an academic software engineering project to model relational transactions and guest bookings.',
      problem:
        'Managing concurrent room allocations and guest stay records requires ACID-compliant database transactions to prevent double-booking.',
      approach:
        'Implemented a multi-tier C# desktop application connected to Microsoft SQL Server with structured data access layers.',
      keyFeatures: [
        'Room availability lookups filtered by room type, dates, and occupancy',
        'Guest registration and check-in / check-out processing',
        'Real-time database updates ensuring no double-booking conflicts',
        'Billing calculation based on stay duration and supplemental services',
      ],
      architecture:
        'Desktop client UI connecting to Microsoft SQL Server via parameterized queries and transactions.',
      challenges: [
        'Preventing race conditions and booking collisions across overlapping reservation date ranges',
      ],
      implementation:
        'Engineered transactional SQL queries and validation constraints in C# to guarantee reservation integrity.',
    },
  },
  {
    id: 'store-management-system',
    title: 'Store Management System',
    tagline: 'Inventory Control & Sales Transaction System',
    category: 'desktop-system',
    featured: false,
    flagship: false,
    description:
      'Desktop inventory management application featuring a graphical user interface and integrated MySQL database for product tracking and sales operations.',
    technologies: ['Java', 'Swing', 'MySQL', 'JDBC'],
    imageUrl: `${base}images/projects/furnivision-transformation.png`,
    caseStudy: {
      overview:
        'An academic desktop software application built in Java to explore object-oriented design patterns, GUI programming, and relational persistence.',
      problem:
        'Manual stock tracking in retail environments leads to discrepancy in stock levels and lost sales data.',
      approach:
        'Constructed an event-driven Java Swing interface connected to MySQL via JDBC for reliable CRUD operations and inventory tracking.',
      keyFeatures: [
        'Graphical user interface for adding, updating, and removing inventory items',
        'Real-time stock level monitoring with low-stock visual notifications',
        'Sales transaction logging and receipt summary generation',
        'Normalized MySQL database schema modeling products, categories, and sales',
      ],
      architecture:
        'Java Swing desktop frontend utilizing MVC pattern principles with JDBC data access objects communicating with MySQL.',
      challenges: [
        'Building responsive desktop GUI layouts with Java Swing while handling synchronous database I/O',
      ],
      implementation:
        'Implemented structured Java classes, JDBC prepared statements for SQL injection prevention, and Swing table models.',
    },
  },
]
