import css from './LoadMoreBtn.module.css';

export type LoadMoreBtnType = {
  onClick: () => void;
};

export default function LoadMoreBtn({ onClick }: LoadMoreBtnType) {
  return (
    <>
      <button onClick={onClick} className={css.button}>
        Load More
      </button>
    </>
  );
}
