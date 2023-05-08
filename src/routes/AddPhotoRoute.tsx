import { useState } from 'react';
import AddPhotoForm from '../components/AddPhoto/AddPhotoForm';
import styles from './AddPhotoRoute.module.css';
import { ISearchResult } from '../interfaces';

const AddPhotoRoute = () => {
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <AddPhotoForm setSearchResults={setSearchResults} />
      </div>
    </div>
  );
};

export default AddPhotoRoute;
