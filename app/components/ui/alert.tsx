import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-white rounded-md shadow-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
};

interface AlertTitleProps {
  children: React.ReactNode;
}

export const AlertTitle: React.FC<AlertTitleProps> = ({ children }) => {
  return (
    <h2 className="text-2xl text-black font-bold mb-4">
      {children}
    </h2>
  );
};

interface AlertDescriptionProps {
  children: React.ReactNode;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ children }) => {
  return (
    <div className="text-gray-600">
      {children}
    </div>
  );
};