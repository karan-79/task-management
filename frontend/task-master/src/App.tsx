import Router from "@/Router";
import { ThemeProvider } from "@/Providers/ThemeProvider.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Router />
    </ThemeProvider>
  );
}

export default App;
