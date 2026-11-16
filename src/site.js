// Vercel injects VERCEL_PROJECT_PRODUCTION_URL at build time; override with NEXT_PUBLIC_SITE_URL for a custom domain.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

export const site = {
  name: 'Utham N S Prabhu',
  title: 'Utham N S Prabhu | Frontend Engineer, React & Next.js',
  role: 'Frontend Engineer',
  city: 'Bengaluru',
  email: 'uthamprabhu12@gmail.com',
  phone: '+91 9633693160',
  whatsapp: 'https://wa.me/919633693160',
  description:
    'Frontend Engineer in Bengaluru with 4+ years in React, Next.js and TypeScript, plus Node.js, PostgreSQL and AWS. Open to remote, hybrid and on-site roles.',
  linkedin: 'https://www.linkedin.com/in/uthamprabhu',
  github: 'https://github.com/uthamprabhu',
}
