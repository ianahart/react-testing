import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IPhoto } from '../../interfaces';
import { getPhotos } from '../../utils/api';
import styles from './PhotoList.module.css';
import Photos from './Photos';

interface IPhotoListProps {
  searchResults: IPhoto[];
  removeSearchResult: (id: string) => void;
  saveSearchResults: (results: IPhoto[]) => void;
  term: string;
}

const PhotoList = ({
  searchResults,
  removeSearchResult,
  saveSearchResults,
  term,
}: IPhotoListProps) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const paginate = async () => {
      try {
        const { data, error } = await getPhotos(term, page);
        if (data) {
          saveSearchResults(data.data.results);
        }
      } catch (err: unknown | AxiosError) {
        if (err instanceof AxiosError && err.response) {
          console.log(err);
        }
      }
    };
    paginate();
  }, [term, page, saveSearchResults]);

  const previousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <header>
          <h1>Search Results</h1>
        </header>
      </div>
      <Photos data={searchResults} action="add" removeSearchResult={removeSearchResult} />
      <div className={styles.pagination}>
        {page > 1 && <button onClick={previousPage}>Prev</button>}
        <p aria-label="page number">{page}</p>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};

export default PhotoList;
