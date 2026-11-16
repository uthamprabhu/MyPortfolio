// Single source of truth for the home page.
// Roles, dates, places and numbers are copied from the résumé (Sep 2026); "Right now" comes from Utham directly.
// `claim` is the plain-language line; `details` is the engineering behind it.
// `demo` names a playable proof (see components/proof), `scores` draws Lighthouse rings.

// How I work: each principle is backed by something that actually happened.
export const principles = [
  {
    title: 'I look for the real problem.',
    body: 'On Scotty I found that anyone could open restricted pages just by typing the URL. I closed the gap with role-based access control across 100+ routes.',
    source: 'Scotty, Warpdrive',
  },
  {
    title: 'I follow a bug to its cause.',
    body: 'On CineArtery, saved edits were disappearing and pages showed stale data. I traced both to their root cause and fixed them.',
    source: 'CineArtery',
  },
  {
    title: 'I finish, including the boring parts.',
    body: 'A new filter I added to a GE HealthCare app broke existing ones. I fixed the regressions and covered the work with Jest tests.',
    source: 'GE HealthCare, TCS',
  },
  {
    title: 'AI tools are in my kit. The thinking is mine.',
    body: 'I use Claude Code and Cursor. They type fast. Understanding the problem, choosing the fix and owning the result is still my job.',
    source: 'How I use AI',
  },
]

export const experience = [
  {
    period: 'Right now',
    name: 'Projects in progress',
    role: 'Building end to end',
    where: 'Remote',
    items: [
      {
        title: 'WhatsApp automation for restaurants',
        kind: 'In progress',
        wip: true,
        claim: 'Customers ask, order and pay without leaving WhatsApp. Starting with one restaurant, built as a product others can use.',
        detailsLabel: "What's in it",
        details: [
          "Answers real customer queries from the restaurant's own information (RAG)",
          'Order bookings inside the chat',
          'Payments and payment confirmations',
          'Previous orders on record for every customer',
          'Next: a SaaS version other restaurants can sign up for',
        ],
      },
      {
        title: 'In-house event booking platform',
        kind: 'In progress, UK and Europe',
        wip: true,
        claim: 'Pick your seat on a 3D map of the venue, book, and walk in with a QR ticket. Full stack, end to end.',
        detailsLabel: "What's in it",
        details: [
          '3D visual seat selection',
          'End-to-end customer booking',
          'QR-code tickets, checked for authenticity in a separate check-in portal',
          'WhatsApp and email integration and automation',
        ],
      },
    ],
  },
  {
    period: 'Jan 2026 — Aug 2026',
    name: 'Contract, part-time',
    role: 'Frontend Engineer',
    where: 'Remote, India',
    items: [
      {
        title: 'CineArtery',
        kind: 'Media and entertainment platform',
        href: 'https://www.cineartery.com/',
        claim: 'Rebuilt a slow, duplicated Settings area so that going back to a page never waits on the network.',
        demo: 'cache',
        details: [
          'Redesigned the module in Figma in under a week, then rebuilt its 7+ pages and 50+ form fields in Next.js and TypeScript within a month',
          '15+ TanStack Query hooks over 30+ REST endpoints, through a Next.js API layer: query-key factories, optimistic updates, cache invalidation',
          'Revisiting a page makes zero extra API requests',
          '4 account types (Market, Rental, Producer, Cast & Crew) merged into config-driven components: 500+ duplicated lines removed, a new account type takes under 5 minutes to add',
          'Traced 2 bugs that lost saved edits and showed stale data to their root cause, and fixed both',
        ],
      },
      {
        title: 'FocuzOneMedia',
        kind: 'UK-based live events platform',
        href: 'https://www.focuzonemedia.com/',
        claim: 'Developed and built from scratch, end to end. 2,000+ visitors since launch, and real feedback from users who loved how it looks.',
        // [name, after, before]. The "before" numbers are Utham's recollection, so the page calls them approximate.
        scores: [['Performance', 99, 57], ['Accessibility', 97, 68], ['Best practices', 100, 72], ['SEO', 100, 75]],
        scoresNote: 'Starting scores are approximate.',
        details: [
          'Designed in Figma, built in Next.js, TypeScript and Tailwind CSS: 3 pages, 7 homepage sections, 20 reusable components',
          'Dedicated admin panel with token-based access',
          'Real-time waiting list that users can join, backed by a real database',
          'Email set up with Resend, plus a Tally forms integration',
          'Scores reached by optimising images, fonts and Core Web Vitals',
          'Content Security Policy against XSS; API keys for 3 integrations stay server-side',
        ],
      },
      {
        title: 'Mantra Ads',
        kind: 'Part-time project, agency site in Dubai',
        href: 'https://mantra-ads.com/',
        claim: 'The CEO reached out and asked me to replace their WordPress site. I designed and built the new one alone, from the Next.js code to the SEO.',
        details: [
          'Rebuilt from WordPress to Next.js, solo: design, build and SEO',
          'Flip cards, draggable industry tags, looping work reel',
          'Small WooCommerce side task on an existing WordPress site: set up the payment gateway and payment settings',
          "Added the store's existing products to WooCommerce with their images, and gave feedback on the store",
        ],
      },
    ],
  },
  {
    period: 'Oct 2025 — Jan 2026',
    name: 'Warpdrive Tech Works',
    role: 'Technical Specialist',
    where: 'Bengaluru, India',
    items: [
      {
        title: 'Scotty',
        kind: 'B2B SaaS for company management',
        claim: 'Found that anyone could open restricted pages just by typing the URL: HR, and a lot more. Closed all of it.',
        demo: 'guard',
        details: [
          'Middleware, route guards and role-based access control across 100+ routes, for 300+ daily users',
          'Django API changes for 3 integrations (Slack, Discord, Google Meet), fixing about 30% of the backend bugs',
          'Built 3 more features (real-time chat, face-recognition login, geofencing) and reviewed teammates’ code',
        ],
      },
    ],
  },
  {
    period: 'Jul 2022 — Sep 2025',
    name: 'Tata Consultancy Services',
    role: 'Assistant System Engineer',
    where: 'Bengaluru, India',
    items: [
      {
        title: 'Internal app',
        kind: 'Used by 600,000+ employees',
        claim: 'Shipped a feature that lets people look back at their past activity, and built a reusable button component that other teams adopted.',
        details: ['Integrated a new API for the feature'],
      },
      {
        title: 'GE HealthCare',
        kind: 'React app',
        claim: 'Added a new filter to the filter panel, and fixed the regressions it caused in the existing filters.',
        details: ['Integrated a new API, added its fields to the GraphQL queries, covered it with Jest tests'],
      },
      {
        title: 'DRDO',
        kind: 'Defense application',
        claim: 'Built the inventory flow end to end.',
        details: ['Also built a paginated table over 5,000+ records'],
      },
      {
        title: 'Internal React Native app',
        kind: 'Mobile',
        claim: 'Built 4+ screens.',
      },
      {
        title: 'Real-time chat',
        kind: 'Node.js, Express',
        claim: 'Built a role-based 1:1 chat as part of the Node.js and Express REST APIs I worked on.',
        details: ['Socket.io and MongoDB'],
      },
      {
        title: 'AR/VR biology lab',
        kind: 'Facebook Oculus',
        claim: 'Led a team of 5 to deliver it.',
        details: ['3D models made in Blender'],
      },
    ],
  },
  {
    period: 'Background',
    name: 'Education, certifications and achievements',
    role: 'Bachelor of Computer Applications',
    where: 'Kochi, Kerala',
    items: [
      {
        title: 'BCA',
        kind: 'Jun 2019 — Jun 2022',
        claim: 'Chinmaya College of Arts, Commerce & Science, Mahatma Gandhi University.',
      },
      {
        title: 'AngelHack Bangalore',
        kind: 'May 2024',
        claim: 'Built a full-stack freelancer job platform alone in 48 hours.',
        details: ['Node.js and Express'],
      },
      {
        title: 'Certifications',
        kind: '2023, 2024',
        claim: 'AWS Cloud Practitioner (Amazon, 2023) and Azure Fundamentals AZ-900 (Microsoft, 2024).',
      },
    ],
  },
]

export const stack = [
  ['Frontend', 'React, Next.js, TypeScript, JavaScript, Tailwind CSS, TanStack Query, Redux Toolkit, Zustand, React Native'],
  ['Backend and cloud', 'Node.js, Express, Python (Django), PostgreSQL, MongoDB, MySQL, GraphQL, AWS, Docker'],
  ['Quality', 'Jest, React Testing Library, Playwright, Core Web Vitals, RBAC, CSP'],
]
