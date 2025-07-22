// App.js
import { Routes, Route } from 'react-router-dom';
import ExtendPass from './components/ExtendPass';
// import Home from './components/home';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/extend/:id" element={<ExtendPass />} />
    </Routes>
  );
}

export default App;
