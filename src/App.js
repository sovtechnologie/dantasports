import './App.css';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

function App() {
  return (
    <ErrorBoundary>
      <Navbar />
      <AppRoutes />
      <Footer/>
    </ErrorBoundary>

  );
}

export default App;
