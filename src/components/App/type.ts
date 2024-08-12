export type ModalImageType = {
  imageUrl: string;
  alt_description: string;
  description: string;
  likes: number;
};

export type ImageModalProps = {
  isOpen: boolean;
  imageUrl: string;
  alt_description: string;
  description: string;
  likes: number;
  closeModal: () => void;
};
