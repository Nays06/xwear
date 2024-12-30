import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './styles/macro-css/macro-css.scss'
import './styles/Skeleton/Skeleton.css'
import { Main } from './Pages/Main/Main';
import { ProductPage } from './Pages/ProcuctPage/ProductPage';
import { LogReg } from './Pages/LogReg/LogReg';
import { Favorites } from './Pages/Favorites/Favorites';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/accaunt" element={<LogReg />} />
        <Route path="/favorite" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

