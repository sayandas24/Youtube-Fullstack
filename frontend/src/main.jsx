import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CollapseProvider } from "./contexts/collapseMenu/CollapseContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
import { ProfileProvider } from "./contexts/profileContext/profileContext.jsx";

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CollapseProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </CollapseProvider>
    </QueryClientProvider>
  </StrictMode>
);
