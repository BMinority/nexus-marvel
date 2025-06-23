import axios from 'axios';
import md5 from 'crypto-js/md5';

const PUBLIC_KEY = '5f91f27bcbbde24648d9abf27cd00629';
const PRIVATE_KEY = 'e0e6024ee1a4ab8c04d9cedb88b53ab4c0625d48';

const ts = new Date().getTime().toString();
const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

export const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  params: {
    apikey: PUBLIC_KEY,
    ts,
    hash,
  },
});

export const getCharacters = async (name?: string, offset = 0, limit = 20) => {
  const params: any = {
    limit,
    offset,
  };

  if (name) params.nameStartsWith = name;

  const response = await api.get('characters', { params });
  return response.data.data.results;
};

export const getComics = async () => {
  const response = await api.get('comics', {
    params: {
      limit: 10,
    },
  });
  return response.data.data.results;
};

export const getCreators = async () => {
  const response = await api.get('creators', {
    params: {
      limit: 10,
    },
  });
  return response.data.data.results;
};

export const getEvents = async () => {
  const response = await api.get('events', {
    params: {
      limit: 10,
    },
  });
  return response.data.data.results;
};

export const getComicsByDate = async (startDate: string, endDate: string) => {
  const response = await api.get('comics', {
    params: {
      dateRange: `${startDate},${endDate}`,
      orderBy: 'onsaleDate',
      limit: 12,
    },
  });
  return response.data.data.results;
};

export const getPopularComics = async () => {
  const response = await api.get('comics', {
    params: {
      orderBy: '-focDate',
      limit: 15,
    },
  });
  return response.data.data.results;
};
