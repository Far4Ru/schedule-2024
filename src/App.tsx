import React, { lazy } from 'react';
import './style/App.css';
const Schedule = lazy(() => import('./pages/Schedule/Schedule'));

const App: React.FC = () => (
  <Schedule />
);


export default App;
