import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-xl overflow-hidden ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  onDetailsClick?: () => void;
  children?: React.ReactNode;
}
export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  onDetailsClick,
  children,
}) => {
  return (
    <div className="bg-gray-800 text-white px-8 py-6 border-b flex items-center justify-between">
      <div className="flex-grow min-w-0">
        <h2 className="text-xl font-semibold truncate">{title}</h2>
      </div>
      {onDetailsClick ? (
        <button
          onClick={onDetailsClick}
          className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Decide on winner
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
}) => {
  return <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>;
};

interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="p-8 text-gray-600">{children}</div>;
};
