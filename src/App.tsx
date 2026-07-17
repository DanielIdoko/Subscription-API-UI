import RootNavigation from "./navigation/RootNavigation";
import { Analytics } from "@vercel/analytics/react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackUI from "./components/ui/error";

const App = () => {
  return (
    <>
      <Analytics />
      <ErrorBoundary
        FallbackComponent={ErrorFallbackUI}
        onReset={() => {
          // Reset application state here so the error doesn't re-trigger
        }}
      >
        <RootNavigation />
      </ErrorBoundary>
    </>
  );
};

export default App;
