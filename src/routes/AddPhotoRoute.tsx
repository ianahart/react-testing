import { useState } from 'react';
import AddPhotoForm from '../components/AddPhoto/AddPhotoForm';
import styles from './AddPhotoRoute.module.css';
import { ISearchResult } from '../interfaces';
import PhotoList from '../components/PhotoList';

const AddPhotoRoute = () => {
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [term, setTerm] = useState('');

  const saveSearchResults = (searchResults: ISearchResult[]) => {
    setSearchResults(searchResults);
  };

  const handleSetTerm = (term: string) => {
    setTerm(term);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <AddPhotoForm
          saveSearchResults={saveSearchResults}
          term={term}
          handleSetTerm={handleSetTerm}
        />
        {searchResults.length > 0 && (
          <PhotoList
            term={term}
            saveSearchResults={setSearchResults}
            searchResults={searchResults}
          />
        )}
      </div>
    </div>
  );
};

export default AddPhotoRoute;
