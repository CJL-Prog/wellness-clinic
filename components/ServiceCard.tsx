import React from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  slug: string;
  description: string;
  image?: string;
  benefits: string[];
}

export function ServiceCard({ 
  title, 
  slug, 
  description, 
  image, 
  benefits 
}: ServiceCardProps) {
  return (
    <Link href={`/services/${slug}`} className="group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
        <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <ul className="space-y-1">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
          <div className="mt-4 text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
            Learn more →
          </div>
        </div>
      </div>
    </Link>
  );
}