"use client";

type FallbackProps = {
  error: {
    message: string | null;
  };
};

const FallbackErrorComponent = ({ error }: FallbackProps) => (
  <div>
    <h1>Oops! Something went wrong.</h1>
    <p>{error.message}</p>
  </div>
);

export default FallbackErrorComponent;
