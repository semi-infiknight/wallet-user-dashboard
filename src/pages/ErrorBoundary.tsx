import React, { ReactNode, useState, useEffect } from 'react';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const errorHandler = (error: Error) => {
      setHasError(true);
      // You can use your own error logging service here
      // console.log({ error });
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col gap-3 max-w-md p-6 neomorphic-expired bg-[#262626] rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-white">Oops, there is an error!</h2>
          <p className="text-gray-300">Something went wrong. Please try again later.</p>
          <div className="flex justify-evenly gap-5 px-3 items-center mt-5">
            <button
              type="button"
              onClick={() => setHasError(false)}
              className="px-4 py-2 neomorphic-completed bg-[#262626] text-purple-300 rounded-md transition-colors duration-300 "
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children || null;
};

export default ErrorBoundary;
