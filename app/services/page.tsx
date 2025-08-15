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
    ],
    gradient: 'from-blue-500 to-purple-600'
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
    ],
    gradient: 'from-green-500 to-blue-600'
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
    ],
    gradient: 'from-orange-500 to-pink-600'
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
    ],
    gradient: 'from-purple-500 to-blue-600'
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Evidence-based treatments tailored to your unique health goals. 
            All services include physician consultation and ongoing support.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Link 
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                {/* Gradient Header */}
                <div className={`h-48 bg-gradient-to-br ${service.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">
                      {service.title}
                    </h2>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4">
                    <div className="w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  {/* Benefits */}
                  <ul className="space-y-2 mb-6">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold group-hover:text-blue-700">
                      Learn more
                    </span>
                    <svg className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take our health assessment to get personalized recommendations based on your symptoms and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/intake"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Take Assessment
            </Link>
            <Link 
              href="/how-it-works"
              className="inline-block px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Licensed Physicians</h3>
            <p className="text-gray-600">
              Board-certified doctors review every treatment plan
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">HSA/FSA Eligible</h3>
            <p className="text-gray-600">
              Use pre-tax dollars for your health treatments
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Discreet Delivery</h3>
            <p className="text-gray-600">
              Medications shipped directly to your door
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}