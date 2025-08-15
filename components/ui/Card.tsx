import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  badge?: string;
  badgeColor?: 'red' | 'blue' | 'green' | 'purple';
}

export function Card({ 
  children, 
  className = '',
  badge,
  badgeColor = 'red'
}: CardProps) {
  const badgeColors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500'
  };
  
  return (
    <div className={`relative bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow ${className}`}>
      {badge && (
        <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 ${badgeColors[badgeColor]} text-white text-sm font-semibold rounded-full`}>
          {badge}
        </div>
      )}
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-2xl font-bold ${className}`}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-gray-600 ${className}`}>
      {children}
    </p>
  );
}

interface CardPriceProps {
  amount: number;
  period?: string;
  className?: string;
}

export function CardPrice({ amount, period = '/mo', className = '' }: CardPriceProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <span className="text-5xl font-bold text-blue-600">${amount}</span>
      <span className="text-gray-600">{period}</span>
    </div>
  );
}