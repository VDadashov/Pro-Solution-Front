import "./App.css";
import ROUTES from "./routes/routes";
import WishlistProvider from "./Context/wishlistContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function AppContent() {
  const router = createBrowserRouter(ROUTES);
  return (
    <QueryClientProvider client={queryClient}>
      <WishlistProvider>
        <RouterProvider router={router} />
      </WishlistProvider>
    </QueryClientProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;
