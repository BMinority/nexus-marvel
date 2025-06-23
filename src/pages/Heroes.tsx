import React, { useEffect, useState, useCallback } from 'react';
import { getCharacters } from '../services/api';
import { HeroeCard as HeroeCardComponent } from '../components/HeroeCard';
import Loading from '../components/Loading';

type Character = {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

const HeroeCard = React.memo(HeroeCardComponent);
const PAGE_SIZE = 20;

function Heroes() {
  const [heroes, setHeroes] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchHeroes = useCallback(async (pageNum: number, nameFilter = '') => {
    setIsLoading(true);
    setError(null);

    try {
      const offset = (pageNum - 1) * PAGE_SIZE;
      const newHeroes = await getCharacters(nameFilter, offset, PAGE_SIZE);

      setHeroes((prev) =>
        pageNum === 1 ? newHeroes : [...prev, ...newHeroes]
      );

      setHasMore(newHeroes.length === PAGE_SIZE);
    } catch (err) {
      setError('Erro ao carregar personagens.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeroes(page, searchTerm);
  }, [page, searchTerm, fetchHeroes]);

  useEffect(() => {
    setPage(1);
    setHeroes([]);
  }, [searchTerm]);

  const skeletons = Array.from({ length: PAGE_SIZE }, (_, i) => i);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  if (error) return <p className="error-message">{error}</p>;

  return (
    <section className="bc-heroes-page">
      <h1>Heróis da Marvel</h1>

      <input
        type="text"
        placeholder="Buscar personagem..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bc-search-input"
      />

      <div className="bc-hero-cards">
        {isLoading && page === 1
          ? skeletons.map((i) => (
              <div key={i} className="bc-hero-card-skeleton"></div>
            ))
          : heroes.length > 0
          ? heroes.map((hero) => <HeroeCard key={hero.id} hero={hero} />)
          : <p>Nenhum personagem encontrado.</p>
        }
      </div>

      {!isLoading && hasMore && (
        <button onClick={handleLoadMore} className="bc-load-more-btn">
          Carregar mais
        </button>
      )}

      {isLoading && page > 1 && <Loading />}
    </section>
  );
}

export default Heroes;
