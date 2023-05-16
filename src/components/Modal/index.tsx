import styles from './Modal.module.css';
import { AiOutlineFullscreenExit } from 'react-icons/ai';
import { IPhoto } from '../../interfaces';

interface IModalProps {
  modalOpen: boolean;
  handleSetModalOpen: (open: boolean, item?: IPhoto) => void;
  children: JSX.Element;
}

const Modal = ({ modalOpen, handleSetModalOpen, children }: IModalProps) => {
  return (
    <>
      {modalOpen && (
        <div data-testid="container" className={styles.container}>
          <div
            role="button"
            onClick={() => handleSetModalOpen(false)}
            className={styles.close}
          >
            <AiOutlineFullscreenExit data-testid="fullscreen-close" role="img" />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
