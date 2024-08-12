/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import './App.css';
import fetchArticles, {
  Articles,
  FetchArticlesResponse,
} from '../../api/articles-api';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import toast from 'react-hot-toast';
import ImageModal from '../ImageModal/ImageModal';
import { ModalImageType } from './type';

function App() {
  const [articles, setArticles] = useState<Articles[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<ModalImageType | null>(null);

  useEffect(() => {
    if (!query) return;

    const getArticles = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { results, total_pages }: FetchArticlesResponse =
          await fetchArticles(query, page);
        if (results.length === 0 && page === 1) {
          toast.error('No results found. Please try a different search query.');
          setLoadMore(false);
          return;
        }
        if (results.length === 0) {
          toast.error('No results found. Please try a different search query.');
          setLoadMore(false);
          return;
        }

        setArticles(prevArticles => [...prevArticles, ...results]);
        setLoadMore(page < total_pages);
        if (page > 1) {
          scroll.scrollToBottom();
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, [query, page]);

  const onHandleSearchSubmit = async (searchQuery: string) => {
    setQuery(searchQuery);
    setArticles([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (imageSrc: ModalImageType) => {
    setModalImage(imageSrc);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={onHandleSearchSubmit} />
      {error && <ErrorMessage />}
      {articles.length > 0 && (
        <ImageGallery images={articles} openModal={openModal} />
      )}
      {isLoading && <Loader loading={isLoading} />}
      {loadMore && !isLoading && articles.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalImage && (
        <ImageModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          {...modalImage}
          /*  imageUrl={modalImage.imageUrl}
          alt_description={modalImage.alt_description}
          description={modalImage.description}
          likes={modalImage.likes} */
        />
      )}
    </div>
  );
}

export default App;
