import Link from 'next/link'

import Arcade from '../../components/landing/Arcade'

export const metadata = {
  title: 'Arcade',
  alternates: { canonical: '/arcade' },
}

export const viewport = {
  themeColor: '#F4F2EE',
  colorScheme: 'light',
}

export default function ArcadePage() {
  return (
    <div className="landing min-h-[100svh] bg-[#F4F2EE] text-[#111110] flex flex-col justify-center">
      <main className="w-full max-w-[640px] mx-auto px-6 py-10">
        <Link
          href="/"
          className="landing-link font-mono text-[11px] uppercase tracking-[0.14em] text-[#5E5B55] rounded-sm
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111110]"
        >
          ← Back
        </Link>
        <div className="mt-8">
          <Arcade labelClassName="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A877F]" />
        </div>
      </main>
    </div>
  )
}
