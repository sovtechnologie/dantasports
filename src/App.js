import "./App.css";
import "./stylesheets/pages.css";
import AppRoutes from "./routes/AppRoutes";
import Cookies from "js-cookie";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import "./stylesheets/layouts/Comman.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { scheduleAutoLogout } from "./utils/authUtils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      scheduleAutoLogout(token, dispatch, navigate);
    }
  }, [token, dispatch, navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Navbar />
        <AppRoutes />
        <Footer />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
