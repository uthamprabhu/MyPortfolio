import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-primary flex flex-col items-center justify-center gap-4 text-center px-6">
      <h1 className="text-white font-black text-[40px]">Page not found</h1>
      <Link href="/" className="text-[#915eff] font-semibold">Back to portfolio</Link>
    </main>
  )
}
