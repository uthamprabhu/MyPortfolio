import { motion } from 'framer-motion'
import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'

const stats = [
  { value: '3.5+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '2', label: 'Live Products' },
  { value: '600K+', label: 'Users Served' },
]

const highlights = [
  { icon: '⚡', text: 'React.js & Next.js — production-grade UI at scale' },
  { icon: '🛡️', text: 'RBAC, JWT Auth, secure full-stack systems' },
  { icon: '🌐', text: 'Real-time features — Socket.io, live chat, geofencing' },
  { icon: '☁️', text: 'AWS S3, GCP, Vercel — cloud-deployed apps' },
  { icon: '🤖', text: 'AI-integrated workflows — FaceAPI.js, AI-powered apps' },
  { icon: '📱', text: 'PWA & responsive-first across all devices' },
]

const Resume = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My credentials</p>
        <h2 className={styles.sectionHeadText}>Resume.</h2>
      </motion.div>

      {/* Stats row */}
      <motion.div
        variants={fadeIn('up', 'spring', 0.1, 0.75)}
        className='mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4'
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className='relative overflow-hidden rounded-2xl bg-[#1d1836] p-5 text-center
              border border-[#915eff]/20 hover:border-[#915eff]/60 transition-all duration-300
              group hover:-translate-y-1'
          >
            {/* glow blob */}
            <div className='absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#915eff]/20
              blur-xl group-hover:bg-[#915eff]/40 transition-all duration-500' />
            <p className='text-[#915eff] font-black text-[36px] leading-none'>{stat.value}</p>
            <p className='text-secondary text-[13px] mt-1 font-medium'>{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Main card */}
      <motion.div
        variants={fadeIn('up', 'spring', 0.2, 0.75)}
        className='mt-8 rounded-2xl bg-[#1d1836] border border-[#915eff]/20 p-8 relative overflow-hidden'
      >
        {/* background grid */}
        <div className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage: 'linear-gradient(#915eff 1px, transparent 1px), linear-gradient(90deg, #915eff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className='relative z-10 flex flex-col lg:flex-row gap-10'>
          {/* Left — highlights */}
          <div className='flex-1'>
            <p className='text-white font-bold text-[18px] mb-6 flex items-center gap-2'>
              <span className='w-2 h-6 bg-[#915eff] rounded-full inline-block' />
              What I bring to the table
            </p>
            <div className='grid sm:grid-cols-2 gap-3'>
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn('left', 'spring', 0.1 * i, 0.5)}
                  className='flex items-start gap-3 bg-[#13102a] rounded-xl p-4
                    border border-[#915eff]/10 hover:border-[#915eff]/40
                    transition-all duration-300 hover:-translate-y-0.5'
                >
                  <span className='text-xl mt-0.5'>{h.icon}</span>
                  <p className='text-secondary text-[13px] leading-relaxed'>{h.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — CTA */}
          <div className='flex flex-col items-center justify-center gap-5 lg:w-[240px]'>
            {/* Glowing download button */}
            <a
              href='/resume.pdf'
              download='Utham_NS_Prabhu_Resume.pdf'
              className='relative group w-full'
            >
              <div className='absolute -inset-0.5 bg-gradient-to-r from-[#915eff] to-[#00cea8]
                rounded-2xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-300' />
              <div className='relative flex items-center justify-center gap-3
                bg-[#1d1836] text-white font-bold text-[15px]
                py-4 px-6 rounded-2xl w-full
                group-hover:bg-[#13102a] transition-colors duration-300'
              >
                <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 group-hover:animate-bounce' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
                </svg>
                Download CV
              </div>
            </a>

            {/* View online */}
            <a
              href='/resume.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className='w-full flex items-center justify-center gap-2
                border border-[#915eff]/40 hover:border-[#915eff]
                text-secondary hover:text-white text-[14px] font-medium
                py-3 px-6 rounded-2xl transition-all duration-300'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                <path strokeLinecap='round' strokeLinejoin='round' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
              </svg>
              View Online
            </a>

            <div className='w-full h-px bg-[#915eff]/20' />

            {/* Social links */}
            <div className='flex gap-3 w-full'>
              <a
                href='https://www.linkedin.com/in/uthamprabhu'
                target='_blank'
                rel='noopener noreferrer'
                className='flex-1 flex items-center justify-center gap-2
                  bg-[#0077b5]/10 hover:bg-[#0077b5]/25 border border-[#0077b5]/30
                  hover:border-[#0077b5]/60 text-[#0077b5] text-[13px] font-semibold
                  py-3 rounded-xl transition-all duration-300'
              >
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                </svg>
                LinkedIn
              </a>
              <a
                href='https://github.com/uthamprabhu'
                target='_blank'
                rel='noopener noreferrer'
                className='flex-1 flex items-center justify-center gap-2
                  bg-white/5 hover:bg-white/10 border border-white/10
                  hover:border-white/30 text-white text-[13px] font-semibold
                  py-3 rounded-xl transition-all duration-300'
              >
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
                </svg>
                GitHub
              </a>
            </div>

            <p className='text-secondary text-[11px] text-center leading-relaxed'>
              Immediate joiner · Open to Remote &amp; Bengaluru
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default SectionWrapper(Resume, 'resume')
