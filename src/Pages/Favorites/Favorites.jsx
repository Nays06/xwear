import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from "../../Components/Header/Header";
import { Footer } from "../../Components/Footer/Footer";
import { Card } from "../../Components/Card/Card";
import "./style.css";

export const Favorites = () => {
  const [productsData, setProductsData] = useState({});
  const localStorageKey = `xwear_favoritesId_${localStorage.getItem("xwear_currentUserID")}`;

  async function fetchProductsData(productId) {
      try {
          const response = await fetch(`https://6765722d52b2a7619f5f93a3.mockapi.io/xwear/products/${productId}`);
          if (!response.ok) {
              console.error(`Ошибка при получении данных для продукта с ID ${productId}: ${response.statusText}`);
              return null;
          }
          return await response.json();
      } catch (error) {
          console.error('Ошибка при выполнении запроса к API:', error);
          return null;
      }
  }


  useEffect(() => {
      async function loadProducts() {
          try {
              const favoriteIds = JSON.parse(localStorage.getItem(localStorageKey)) || [];
              if (favoriteIds.length === 0) {
                  return;
              }
              const fetchedProducts = {};
              for (const id of favoriteIds) {
                   const product = await fetchProductsData(id);
                  if (product) {
                     fetchedProducts[id] = product;
                  }
              }
              setProductsData(fetchedProducts);
          } catch (error) {
              console.error('Ошибка при загрузке данных из localStorage или API:', error);
          }
      }
      loadProducts();
  }, [localStorageKey]);
    

    return (
      <>
          <Header />

          <main className="df jcc pb50">
              <div className="main-content">
                  <div className="favorites-title mt50">Избранные товары</div>

                  <div className="df fdc aic w100p">
                      {JSON.parse(localStorage.getItem(`xwear_favoritesId_${localStorage.getItem("xwear_currentUserID")}`)).length > 0 ? <div className='favorites-container mt70'>{Object.values(productsData).map((product) => (
                         <Card key={product.id} obj={product} />
                      ))}</div> : <div className="favorites-cont df fdc aic mt50">
                      <div className="favorites-cont-img">
                        <img src="img/Favorites/img.png" alt="" />
                      </div>
        
                      <div className="favorites-cont-title mt15">
                        Этот список желаний пуст.
                      </div>
                      <div className="favorites-cont-txt mt20">
                        У вас пока нет товаров в списке желаний.
                        <br />
                        На странице "Главная" вы найдете много интересных товаров.
                      </div>
                      <Link className="link" to="/"><div className="favorites-cont-but pl15 pr15 pt20 pb20 c-white bg-black usn cp mt40">
                        Перейти на гланую страницу
                      </div></Link>
                    </div>}
                  </div>
              </div>
          </main>

          <Footer />
      </>
    );
};
