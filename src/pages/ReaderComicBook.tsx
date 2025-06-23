import { useEffect, useState } from 'react';
import { getPopularComics } from '../services/api';
import Loading from '../components/Loading';

type Comic = {
  id: number;
  title: string;
  description: string | null;
  thumbnail: { path: string; extension: string };
};

function ReaderComicBook() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getPopularComics().then(setComics);
  }, []);

  if (comics.length === 0) {
    return <Loading />;
  }

  const currentComic = comics[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((i) => (i === 0 ? comics.length - 1 : i - 1));
  };

  const handleNext = () => {
    setCurrentIndex((i) => (i === comics.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="bc-reader-page">
      <h1>NEXUS Reader</h1>
      <p>Explore capas e detalhes das HQs mais icônicas da Marvel.</p>

      <div className="bc-reader-slider">

        <div className="bc-comic-detail">
          <img
            src={`${currentComic.thumbnail.path}.${currentComic.thumbnail.extension}`}
            alt={currentComic.title}
          />
          <h2>{currentComic.title}</h2>
          <p>{currentComic.description || 'Sem descrição disponível.'}</p>
        </div>
        <div className="bc-slider-controls">
            <button onClick={handlePrev} aria-label="Quadrinho anterior">
              <i className="fa-regular fa-circle-left"></i>
            </button>

            <button onClick={handleNext} aria-label="Próximo quadrinho">
              <i className="fa-regular fa-circle-right"></i>
            </button>
        </div>

      </div>
    </section>
  );
}

export default ReaderComicBook;