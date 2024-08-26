import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './style/App.css';
const Schedule = lazy(() => import('./pages/Schedule/Schedule'));

const App: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
    </Suspense>
  </Router>
);


export default App;
