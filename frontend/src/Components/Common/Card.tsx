import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  dark?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  dark = false,
}) => {
  const baseStyles = 'rounded-2xl p-6 shadow-lg transition-all duration-300';
  const hoverStyles = hover ? 'hover:shadow-2xl hover:scale-105' : '';
  const darkStyles = dark ? 'bg-gray-900 text-white' : 'bg-white';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${darkStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
