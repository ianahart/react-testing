import { FormEvent, useState } from 'react';
import styles from './AddPhotoForm.module.css';
import { getPhotos } from '../../utils/api';

import { ISearchResult } from '../../interfaces';

interface IAddPhotoFormProps {
  setSearchResults: (results: ISearchResult[]) => void;
}

const AddPhotoForm = ({ setSearchResults }: IAddPhotoFormProps) => {
  const [term, setTerm] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!term.trim().length) {
      setError('Please provide a term to search for.');
      return;
    }
    const { data, error } = await getPhotos(term);
    if (data) {
      setSearchResults(data.data.results);
      setTerm('');
    }

    if (error) {
      setError('Please try a different search term.');
    }
  };

  return (
    <form aria-label="form" onSubmit={onSubmit} className={styles.form}>
      <h1>Search Photos</h1>
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      <div className={styles.formGroup}>
        <input
          className={`input`}
          placeholder="Search Photos..."
          onChange={(e) => setTerm(e.target.value)}
          value={term}
        />
        <button className={`button`} type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default AddPhotoForm;
