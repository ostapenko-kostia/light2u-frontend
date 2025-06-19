import * as motion from 'framer-motion/client'

export const AnimatedSection = ({ children }: { children: React.ReactNode }) => (
	<motion.section
		initial={{ translateY: '15px', opacity: 0 }}
		animate={{ translateY: '0px', opacity: 1 }}
		transition={{ duration: 0.7, ease: 'anticipate' }}
		className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[400px]:!grid-cols-1 gap-6 w-full mt-12'
	>
		{children}
	</motion.section>
)
