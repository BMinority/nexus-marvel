import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';

const Heroes = lazy(() => import('./pages/Heroes'));
const MarvelWiki = lazy(() => import('./pages/MarvelWiki'));
const Releases = lazy(() => import('./pages/Releases'));
const ReaderComicBook = lazy(() => import('./pages/ReaderComicBook'));

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Heroes />} />
          <Route path="/wiki" element={<MarvelWiki />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/reader" element={<ReaderComicBook />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default App;