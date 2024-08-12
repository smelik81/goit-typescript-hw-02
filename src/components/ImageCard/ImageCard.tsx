import { ReactElement } from 'react';
import css from './ImageCard.module.css';
/* import { Articles } from '../../api/articles-api'; */

export interface ImageCardProps {
  /*  image: Articles; */
  src: string;
  alt: string;
  onClick: () => void;
}

export default function ImageCard({
  src,
  alt,
  onClick,
}: ImageCardProps): ReactElement {
  return (
    <div>
      <img src={src} alt={alt} className={css.cardImg} onClick={onClick} />
    </div>
  );
}
