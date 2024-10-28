import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="bg-gray-200 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    />
  );
};