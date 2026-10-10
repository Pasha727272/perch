import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WalletProvider } from './wallet/WalletProvider'
import { Chrome } from './components/Chrome'
import { ScrollToTop } from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import FeedPage from './pages/FeedPage'
import MarksPage from './pages/MarksPage'
import PerchPage from './pages/PerchPage'
import NestPage from './pages/NestPage'
import FlockPage from './pages/FlockPage'
import StructurePage from './pages/StructurePage'
import ListingsPage from './pages/ListingsPage'
import RoadmapPage from './pages/RoadmapPage'

export default function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-night text-white">
          <Chrome />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/marks" element={<MarksPage />} />
              <Route path="/perch" element={<PerchPage />} />
              <Route path="/nest" element={<NestPage />} />
              <Route path="/flock" element={<FlockPage />} />
              <Route path="/structure" element={<StructurePage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </WalletProvider>
  )
}
