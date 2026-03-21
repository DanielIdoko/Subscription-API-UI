import RootNavigation from "./navigation/RootNavigation";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <>
      <Analytics />
      <RootNavigation />
    </>
  );
};

export default App;
