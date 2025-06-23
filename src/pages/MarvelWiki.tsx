import { useEffect, useState } from 'react';
import { getComics, getCreators, getEvents } from '../services/api';
import LoadingDark from '../components/LoadingDark';

import { FiBookOpen, FiUser, FiCalendar } from 'react-icons/fi';
import { MdOutlineErrorOutline } from 'react-icons/md';

type Comic = {
  id: number;
  title: string;
  thumbnail: { path: string; extension: string };
};

type Creator = {
  id: number;
  fullName: string;
};

type Event = {
  id: number;
  title: string;
  description: string;
};

function checkEmpty<T>(items: T[], entityName: string) {
  if (items.length === 0) {
    return <p>Nenhum {entityName} encontrado.</p>;
  }
  return null;
}

function ComicCard({ comic }: { comic: Comic }) {
  const imageUrl = comic.thumbnail.path.includes('image_not_available')
    ? '/fallback-comic.jpg'
    : `${comic.thumbnail.path}.${comic.thumbnail.extension}`;

  return (
    <div className="bc-comic-card">
      <img src={imageUrl} alt={comic.title} />
      <p>{comic.title}</p>
    </div>
  );
}

function CreatorItem({ creator }: { creator: Creator }) {
  return <li>{creator.fullName}</li>;
}

function EventItem({ event }: { event: Event }) {
  return (
    <li>
      <strong>{event.title}</strong>: {event.description || 'Sem descrição'}
    </li>
  );
}

function MarvelWiki() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const [loadingComics, setLoadingComics] = useState(true);
  const [loadingCreators, setLoadingCreators] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getComics()
      .then(setComics)
      .catch(() => setError('Erro ao carregar quadrinhos.'))
      .finally(() => setLoadingComics(false));

    getCreators()
      .then(setCreators)
      .catch(() => setError('Erro ao carregar criadores.'))
      .finally(() => setLoadingCreators(false));

    getEvents()
      .then(setEvents)
      .catch(() => setError('Erro ao carregar eventos.'))
      .finally(() => setLoadingEvents(false));
  }, []);

  return (
    <section className="bc-wiki-page">
      <h1>NEXUS Wiki</h1>
      <p>Aqui você encontrará informações detalhadas sobre quadrinhos, criadores e eventos do universo Marvel.</p>

      {error && (
        <p className="bc-error">
          <MdOutlineErrorOutline style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          {error}
        </p>
      )}

      <div className="bc-wiki-section">
        <h2>
          <FiBookOpen style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Quadrinhos
        </h2>
        {loadingComics ? (
          <LoadingDark />
        ) : (
          <>
            {checkEmpty(comics, 'quadrinho')}
            <div className="bc-comic-list">
              {comics.map((comic) => (
                <ComicCard key={comic.id} comic={comic} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="bc-wiki-section">
        <h2>
          <FiUser style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Criadores
        </h2>
        {loadingCreators ? (
          <LoadingDark />
        ) : (
          <>
            {checkEmpty(creators, 'criador')}
            <ul className="bc-creator-list">
              {creators.map((creator) => (
                <CreatorItem key={creator.id} creator={creator} />
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="bc-wiki-section">
        <h2>
          <FiCalendar style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Eventos
        </h2>
        {loadingEvents ? (
          <LoadingDark />
        ) : (
          <>
            {checkEmpty(events, 'evento')}
            <ul className="bc-event-list">
              {events.map((event) => (
                <EventItem key={event.id} event={event} />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

export default MarvelWiki;