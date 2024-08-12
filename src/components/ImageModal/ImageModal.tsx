import Modal from 'react-modal';
import { AiFillCloseSquare } from 'react-icons/ai';
import css from './ImageModal.module.css';
import { ImageModalProps } from '../App/type';

Modal.setAppElement('#root');

const customStyles: ReactModal.Styles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90%',
    maxWidth: '90%',
    overflow: 'hidden',
    padding: 0,
    border: 'none',
    background: 'transparent',
  },
};

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageUrl,
  alt_description,
  description,
  likes,
  closeModal,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={true} // Close on click outside
        shouldCloseOnEsc={true} // Close on ESC key press
        overlayClassName={css.modalOverlay}
        className={css.modalWrapper}>
        <div className={css.modalContent}>
          <button className={css.buttonModalClose} onClick={() => closeModal()}>
            <AiFillCloseSquare className={css.closeSvg} />
          </button>
          <img src={imageUrl} alt={alt_description} className={css.image} />
          <div className={css.infoContainer}>
            <p className={css.description}>{description}</p>
            <p className={css.likes}>Likes: {likes}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
