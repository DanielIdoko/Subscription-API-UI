// import React from "react";

const ErrorFallbackUI = ({
  error,
  resetErrorBoundary,
}: {
  error: any;
  resetErrorBoundary: (...args: unknown[]) => void;
}) => {
  return (
    <div role="alert">
      <p>Something went wrong</p>
      <pre style={{ color: "red" }}>{error?.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallbackUI;
