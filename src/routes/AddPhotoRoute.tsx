import { useState } from 'react';
import AddPhotoForm from '../components/AddPhoto/AddPhotoForm';
import styles from './AddPhotoRoute.module.css';
import { IPhoto } from '../interfaces';
import PhotoList from '../components/PhotoList';

const AddPhotoRoute = () => {
  const [searchResults, setSearchResults] = useState<IPhoto[]>([]);
  const [term, setTerm] = useState('');

  const saveSearchResults = (searchResults: IPhoto[]) => {
    setSearchResults(searchResults);
  };

  const handleSetTerm = (term: string) => {
    setTerm(term);
  };

  const removeSearchResult = (id: string) => {
    setSearchResults(searchResults.filter((sr) => sr.id !== id));
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
            removeSearchResult={removeSearchResult}
          />
        )}
      </div>
    </div>
  );
};

export default AddPhotoRoute;
