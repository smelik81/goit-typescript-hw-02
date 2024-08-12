import axios from 'axios';

const API_KEY = 'Vo8LJ0Ib2BjqT0J0kb1h_SReLYGTDa0BIzXxvx3OvsQ';

axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${API_KEY}`;
axios.defaults.params = {
  per_page: 15,
};

export interface Articles {
  id: string;
  alt_description: string;
  description: string;
  likes: number;
  user: {
    name: string;
  };
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
}

export interface FetchArticlesResponse {
  results: Articles[];
  total: number;
  total_pages: number;
}

const fetchArticles = async (
  query: string,
  page: number
): Promise<FetchArticlesResponse> => {
  try {
    const { data } = await axios.get<FetchArticlesResponse>(`/search/photos`, {
      params: { query, page },
    });
    return data;
  } catch {
    throw new Error('request error');
  }
};

export default fetchArticles;
