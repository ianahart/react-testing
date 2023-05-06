import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import HomeRoute from './routes/HomeRoute';

function App() {
  return (
    <div className="App">
      <Router>
        {/*navbar*/}
        <div className="content">
          <Routes>
            <Route index element={<HomeRoute />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
