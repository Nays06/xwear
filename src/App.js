import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import { Main } from './Pages/Main/Main';
import { ProductPage } from './Pages/ProcuctPage/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/product" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;