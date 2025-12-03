import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Sidebar from './components/Sidebar';

const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full w-full min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;