import { motion } from 'framer-motion'

import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import { testimonials } from '../constants'

const FeedbackCard = ({ index, testimonial, name,
  designation, company, image }) => {
  return (
    <motion.div
      variants={fadeIn("", "spring", index * 0.5, 0.75)}
      className='bg-black-200 p-10 rounded-3xl 
      xs:w-[320px] w-full'
    >
      <p className='text-white font-black text-[48px]'>"</p>

      <div className='mt-1 '>
        <p
          className='text-white tracking-wider text-[18px]'
        >
          {testimonial}
        </p>

        <div className='mt-7 flex justify-between items-center gap-1'>
          <div className='flex-1 flex flex-col'>
            <p className='text-white font-medium text-[16px]'>
              <span className='blue-text-gradient'>@</span>{name}
            </p>
            <p className='mt-1 text-secondary text-[12px]'>{designation} of {company}</p>
          </div>

          <img
            src={image}
            alt={`{feedback-by-${name}}`}
            className='w-10 h-10 rounded-full object-cover'
          />
        </div>
      </div>

    </motion.div>
  )
}

const Feedbacks = () => {
  return (
    <div className='mt-12 bg-black-100 rounded-[20px]'>
      <div className={`${styles.padding} 
      bg-tertiary w-100 rounded-2xl min-h-[100px] 
      flex items-center justify-between`}>
        <div>
          <h2 className={`${styles.sectionHeadText}`}>Resume.</h2>
        </div>

        <div className='flex justify-center items-center h-full'>
          <a
            variants={styles.fadeIn}
            href='https://drive.google.com/file/d/1FsDlU30b2zB7JOOtIo6V6Urzm6HgK88z/view?usp=sharing'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-tertiary text-white font-bold text-lg rounded-full w-32 h-12 flex items-center justify-center'
            style={{ padding: '0 16px' }}
          >
            View My Resume
          </a>
        </div>

      </div>

    </div>
  )
}

export default SectionWrapper(Feedbacks, "")