import * as motion from 'framer-motion/client'
import { Container } from '@/components/layout/container'

export function AboutPhilosophy({ t }: { t: (key: string) => string }) {
  return (
    <section className="py-20 bg-gray-100">
      <Container>
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            {t('about-philosophy')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Exceptional Craftsmanship",
              desc: "Every piece we create undergoes rigorous quality control, ensuring durability and performance for years to come.",
              icon: "✦",
            },
            {
              title: "Sustainable Practices",
              desc: "We're committed to environmentally responsible production methods and energy-efficient lighting solutions.",
              icon: "♲",
            },
            {
              title: "Innovative Design",
              desc: "Our design team constantly explores new technologies and aesthetics to stay ahead of lighting trends.",
              icon: "✧",
            },
            {
              title: "Customer Satisfaction",
              desc: "We work closely with our clients to understand their needs and exceed their expectations.",
              icon: "♡",
            },
            {
              title: "Expert Consultation",
              desc: "Our specialists provide professional guidance to help you find the perfect lighting solution.",
              icon: "✪",
            },
            {
              title: "Timeless Appeal",
              desc: "We create lighting fixtures that maintain their beauty and relevance across changing design trends.",
              icon: "✶",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl text-amber-400 mb-4">{value.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{t(`about-value-${index+1}-title`) || value.title}</h3>
              <p className="text-gray-700">{t(`about-value-${index+1}-desc`) || value.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}