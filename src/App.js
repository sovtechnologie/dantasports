import './App.css';
import AppRoutes from './routes/AppRoutes';
import Cookies from 'js-cookie';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { scheduleAutoLogout } from './utils/authUtils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const queryClient = new QueryClient();

function App() {
 const dispatch = useDispatch(); // ✅ get dispatch from Redux

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      scheduleAutoLogout(token, dispatch); // ✅ pass it in
    }
  }, [dispatch]);


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
