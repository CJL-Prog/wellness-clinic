import Link from 'next/link';

const services = [
  {
    title: 'Peptide Therapy',
    slug: 'peptides',
    description: 'Advanced peptide protocols for healing, recovery, and optimization',
    image: '/images/peptides.jpg',
    benefits: [
      'Enhanced recovery',
      'Improved sleep',
      'Anti-aging',
      'Increased energy'
    ]
  },
  {
    title: 'Hormone Replacement',
    slug: 'hrt',
    description: 'Bioidentical hormone optimization for men and women',
    image: '/images/hrt.jpg',
    benefits: [
      'Balanced mood',
      'Better sleep',
      'Increased libido',
      'More energy'
    ]
  },
  {
    title: 'Weight Loss',
    slug: 'weight-loss',
    description: 'Medical weight loss with GLP-1 medications',
    image: '/images/weight-loss.jpg',
    benefits: [
      'Sustainable results',
      'Medical supervision',
      'Appetite control',
      'Metabolic reset'
    ]
  },
  {
    title: 'Lab Testing',
    slug: 'labs',
    description: 'Comprehensive biomarker analysis and optimization',
    image: '/images/labs.jpg',
    benefits: [
      'Full panels',
      'Home collection',
      'Actionable insights',
      'Regular monitoring'
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text-hero">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Evidence-based treatments tailored to your unique health goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map(service => (
            <Link 
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group"
            >
              <div className="brutal-card overflow-hidden hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-emerald-400 to-emerald-600" />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-emerald-600 font-bold group-hover:translate-x-2 transition-transform">
                    Learn more →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/intake"
            className="inline-block brutal-button"
          >
            Start Your Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}