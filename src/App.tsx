import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeRoute from './routes/HomeRoute';
import AddPhotoRoute from './routes/AddPhotoRoute';
import PhotosRoute from './routes/PhotosRoute';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route index element={<HomeRoute />} />
            <Route path="/add" element={<AddPhotoRoute />} />
            <Route path="/photos" element={<PhotosRoute />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
