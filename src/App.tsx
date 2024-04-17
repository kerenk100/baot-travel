import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VendorManager from './VendorManager';


function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/vendors"> Vendors</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
          <Route path="/vendors" element={<VendorManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;