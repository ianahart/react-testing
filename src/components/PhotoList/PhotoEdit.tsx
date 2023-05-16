import { useEffect, useRef, useState, useCallback, useContext } from 'react';
import { Context } from '../../context/context';
import { IContext } from '../../interfaces';
import styles from './PhotoEdit.module.css';

interface IPhotoEditProps {
  id: string;
  altDescription: string;
  setShowEdit: (open: boolean) => void;
}

const PhotoEdit = ({ id, altDescription, setShowEdit }: IPhotoEditProps) => {
  const [inputValue, setInputValue] = useState('');
  const { updatePhoto } = useContext(Context) as IContext;
  const formRef = useRef<HTMLDivElement>(null);

  const clickAway = useCallback(
    (e: Event) => {
      const target = e.target as Element;
      if (formRef.current === null) return;
      if (!formRef.current.contains(target)) {
        setShowEdit(false);
      }
    },
    [setShowEdit]
  );

  useEffect(() => {
    window.addEventListener('click', clickAway);
    return () => window.removeEventListener('click', clickAway);
  }, [clickAway]);

  useEffect(() => {
    setInputValue(altDescription);
  }, [altDescription]);

  const saveEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!inputValue.trim().length) return;
    updatePhoto(inputValue, id);
    setShowEdit(false);
  };

  const cancelEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowEdit(false);
  };

  return (
    <div ref={formRef} className={styles.container}>
      <input
        className={styles.input}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={saveEdit}>
          Save
        </button>
        <button className={styles.button} onClick={cancelEdit}>
          Cancel
        </button>
      </div>
    </div>
  );
};
export default PhotoEdit;
