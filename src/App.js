import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Cookies from "js-cookie";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { scheduleAutoLogout } from "./utils/authUtils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,   // 2 minutes
      gcTime: 10 * 60 * 1000,     // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const dispatch = useDispatch(); // ✅ get dispatch from Redux
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      scheduleAutoLogout(token, dispatch, navigate); // ✅ pass it in
    }
  }, [token, dispatch, navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Navbar />
        <AppRoutes />
        <Footer />
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
