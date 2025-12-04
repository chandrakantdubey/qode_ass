import { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';

const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full w-full min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 w-screen overflow-x-hidden">
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 flex items-center px-4 justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xs relative overflow-hidden">
                <span className="absolute -right-1">c</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 leading-none">capitalmind</span>
            </div>
          </div>
        </div>

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0 md:ml-64'} pt-16 md:pt-0`}>
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