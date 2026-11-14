// Vercel injects VERCEL_PROJECT_PRODUCTION_URL at build time; override with NEXT_PUBLIC_SITE_URL for a custom domain.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

export const site = {
  name: 'Utham N S Prabhu',
  title: 'Utham N S Prabhu | Full Stack Developer Portfolio',
  description:
    'Full Stack Developer with 3.5+ years of experience in React.js, Next.js, Node.js and cloud. Based in Kochi, open to remote and hybrid roles in Kochi and Bengaluru.',
  linkedin: 'https://www.linkedin.com/in/uthamprabhu',
  github: 'https://github.com/uthamprabhu',
}
