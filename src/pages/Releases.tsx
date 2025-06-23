import { useEffect, useState } from 'react';
import { getComicsByDate } from '../services/api';
import LoadingDark from '../components/LoadingDark';

type Comic = {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

function formatDateRange(month: number, year: number) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  const startStr = start.toISOString().split('T')[0];
  const endStr = end.toISOString().split('T')[0];

  return { startStr, endStr };
}

function formatToMonthYear(value: string) {
  const onlyNums = value.replace(/\D/g, '');
  if (onlyNums.length === 0) return '';

  if (onlyNums.length <= 2) {
    return onlyNums;
  } else {
    const month = onlyNums.substring(0, 2);
    const year = onlyNums.substring(2, 6);
    return `${month}${year ? '/' + year : ''}`;
  }
}

function Releases() {
  const now = new Date();
  const defaultMonth = now.getMonth() + 1;
  const defaultYear = now.getFullYear();

  const [comics, setComics] = useState<Comic[]>([]);
  const [inputValue, setInputValue] = useState(
    `${String(defaultMonth).padStart(2, '0')}/${defaultYear}`
  );
  const [searchMonth, setSearchMonth] = useState<number>(defaultMonth);
  const [searchYear, setSearchYear] = useState<number>(defaultYear);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { startStr, endStr } = formatDateRange(searchMonth, searchYear);
    getComicsByDate(startStr, endStr)
      .then(setComics)
      .finally(() => setIsLoading(false));
  }, [searchMonth, searchYear]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatToMonthYear(e.target.value);
    setInputValue(formatted);
  };

  const handleSearch = () => {
    const [mmStr, yyyyStr] = inputValue.split('/');
    const mm = Number(mmStr);
    const yyyy = Number(yyyyStr);

    if (
      !mmStr ||
      !yyyyStr ||
      isNaN(mm) ||
      isNaN(yyyy) ||
      mm < 1 ||
      mm > 12 ||
      yyyy < 1900 ||
      yyyy > defaultYear
    ) {
      alert('Digite uma data válida no formato mm/yyyy');
      return;
    }

    setSearchMonth(mm);
    setSearchYear(yyyy);
  };

  const handleReset = () => {
    const defaultInput = `${String(defaultMonth).padStart(2, '0')}/${defaultYear}`;
    setInputValue(defaultInput);
    setSearchMonth(defaultMonth);
    setSearchYear(defaultYear);
  };

  return (
    <section className="bc-releases-page">
      <h1>Calendário de Lançamentos</h1>
      <p>Confira os lançamentos de quadrinhos por data.</p>

      <div className="bc-release-controls">
        <label htmlFor="date-input">
          Mês/Ano (mm/yyyy):
        </label>
        <input
          id="date-input"
          type="text"
          placeholder="mm/yyyy"
          value={inputValue}
          onChange={handleInputChange}
          maxLength={7}
          style={{ width: '100px', marginRight: '0.5rem' }}
        />
        <button onClick={handleSearch} style={{ marginRight: '0.5rem' }}>
          Buscar
        </button>
        <button onClick={handleReset}>Resetar</button>
      </div>

      {isLoading ? (
        <LoadingDark />
      ) : (
        <div className="bc-comic-list">
          {comics.map((comic) => (
            <div key={comic.id} className="bc-comic-card">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <p>{comic.title}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Releases;
