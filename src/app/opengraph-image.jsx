import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

import { site } from '../site'

// Share card for links on LinkedIn, WhatsApp, X, Slack and Google. Rendered once at build time.
export const alt = `${site.name}, ${site.role} in ${site.city}, smiling with arms crossed`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Google Fonts serves TTF (which the renderer needs) when no browser user agent is sent.
async function font(family, text) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)).text()
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
    return url ? await (await fetch(url)).arrayBuffer() : null
  } catch {
    return null // offline build: fall back to the default font rather than failing
  }
}

const NAME = site.name
const ROLE = `${site.role}.`
const TAG = 'and it loads fast. promise.'
const STACK = 'React · Next.js · TypeScript · Node.js · AWS'
const FOOT = `${site.city}, India · Open to remote, hybrid, on-site`

export default async function Image() {
  const [photo, sans, serif] = await Promise.all([
    readFile(join(process.cwd(), 'src/app/og-photo.jpg')),
    font('Bricolage+Grotesque:wght@600', NAME + ROLE + STACK + FOOT + 'OPEN TO WORK'),
    font('Instrument+Serif:ital@1', TAG),
  ])
  const fonts = [
    sans && { name: 'Sans', data: sans, weight: 600, style: 'normal' },
    serif && { name: 'Serif', data: serif, weight: 400, style: 'italic' },
  ].filter(Boolean)

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#F4F2EE', color: '#111110', fontFamily: 'Sans' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 56px 56px 72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 18, letterSpacing: 3, color: '#5E5B55' }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: '#3A6EA5' }} />
            OPEN TO WORK
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 76, lineHeight: 1, letterSpacing: -3 }}>{NAME}</div>
            <div style={{ display: 'flex', marginTop: 18, fontSize: 44, letterSpacing: -1.5, color: '#3A6EA5' }}>{ROLE}</div>
            <div style={{ marginTop: 10, fontSize: 38, fontFamily: 'Serif', fontStyle: 'italic', color: '#8A877F' }}>{TAG}</div>
            <div style={{ marginTop: 34, fontSize: 24, color: '#4A4843' }}>{STACK}</div>
          </div>
          <div style={{ display: 'flex', borderTop: '2px solid #D9D5CC', paddingTop: 22, fontSize: 20, color: '#5E5B55' }}>{FOOT}</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={`data:image/jpeg;base64,${photo.toString('base64')}`} width={480} height={630} style={{ objectFit: 'cover' }} />
      </div>
    ),
    { ...size, fonts },
  )
}
