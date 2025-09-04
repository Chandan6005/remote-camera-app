import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Remote from './components/Remote';
import Camera from './components/Camera';

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <h1> Remote-Camera Webapp</h1>
        <Link to="/remote" style={styles.button}>Remote Mode</Link>
        <Link to="/camera" style={styles.button}>Camera Mode</Link>

        <Routes>
          <Route path="/remote" element={<Remote />} />
          <Route path="/camera" element={<Camera />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '50px',
    fontFamily: 'Segoe UI',
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    minHeight: '100vh',
    color: 'white',
  },
  button: {
    display: 'inline-block',
    margin: '10px',
    padding: '15px 30px',
    background: '#00c6ff',
    color: 'white',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1.2em',
  }
};

export default App;
