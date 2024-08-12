import { ReactElement } from 'react';
import { Articles } from '../../api/articles-api';
import { ModalImageType } from '../App/type';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export interface ImageGalleryProps {
  images: Articles[];
  openModal: (details: ModalImageType) => void;
}

export default function ImageGallery({
  images,
  openModal,
}: ImageGalleryProps): ReactElement {
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {images.map(
          ({
            id,
            urls: { small, regular },
            alt_description,
            description,
            likes,
          }) => {
            return (
              <li key={id} className={css.item}>
                <ImageCard
                  src={small}
                  alt={alt_description}
                  onClick={() =>
                    openModal({
                      imageUrl: regular,
                      alt_description,
                      description,
                      likes,
                    })
                  }
                />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
