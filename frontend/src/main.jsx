import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CollapseProvider } from "./contexts/collapseMenu/CollapseContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CollapseProvider>
        <App />
      </CollapseProvider>
    </QueryClientProvider>
  </StrictMode>
);
