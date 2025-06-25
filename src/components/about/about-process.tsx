import * as motion from 'framer-motion/client'
import Image from 'next/image'
import { Container } from '@/components/layout/container'

export function AboutProcess({ t }: { t: (key: string) => string }) {
  return (
    <section className="py-20">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-4">{t('about-process')}</h2>
        </motion.div>

        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 p-4">
            <motion.div
              className="relative h-[500px]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image 
                src="/placeholder.svg" 
                alt="Our design process" 
                fill
                className="object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {[
                {
                  step: "01",
                  title: "Concept Development",
                  desc: "Our designers explore ideas, inspired by architecture, nature, and contemporary trends."
                },
                {
                  step: "02",
                  title: "Material Selection",
                  desc: "We source premium materials that meet our quality and sustainability standards."
                },
                {
                  step: "03",
                  title: "Prototype Creation",
                  desc: "Each design is meticulously prototyped and tested for both aesthetics and functionality."
                },
                {
                  step: "04",
                  title: "Quality Assurance",
                  desc: "Rigorous testing ensures our products exceed industry safety and performance standards."
                }
              ].map((item, index) => (
                <div key={index} className="flex">
                  <div className="mr-6">
                    <span className="block text-3xl font-bold text-amber-400">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t(`about-process-${index+1}-title`) || item.title}</h3>
                    <p className="text-gray-700">{t(`about-process-${index+1}-desc`) || item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}