import { useNavigate } from 'react-router-dom';
import "./style.css";
import { useState, useEffect } from 'react';

export const Card = ({ obj: product }) => {
  const navigate = useNavigate();
  const [favImg, setFavImg] = useState("img/Card/favorite.svg");
  const [isFavorite, setIsFavorite] = useState(false);

  const userId = localStorage.getItem("xwear_currentUserID")
  const productId = product.id
  

  useEffect(() => {
    if (!userId) return;
    const favoritesKey = `xwear_favoritesId_${userId}`;
    const favorites = localStorage.getItem(favoritesKey);
    if (favorites) {
      const favoriteIds = JSON.parse(favorites);
      if (favoriteIds.includes(productId)) {
        setFavImg("img/Card/favoriteActive.svg");
        setIsFavorite(true);
      } else {
        setFavImg("img/Card/favorite.svg");
        setIsFavorite(false);
      }
    } else {
        setFavImg("img/Card/favorite.svg");
        setIsFavorite(false);
    }
  }, [productId, userId]);

  const handleClick = (event) => {
    if (!userId) return;
    event.stopPropagation();

    const favoritesKey = `xwear_favoritesId_${userId}`;
    let favorites = localStorage.getItem(favoritesKey);
    let favoriteIds = favorites ? JSON.parse(favorites) : [];

    if (isFavorite) {
      favoriteIds = favoriteIds.filter(id => id !== productId);
      setFavImg("img/Card/favorite.svg");
    } else {
      favoriteIds.push(productId);
      setFavImg("img/Card/favoriteActive.svg");
    }
    
    localStorage.setItem(favoritesKey, JSON.stringify(favoriteIds));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card usn cp" onClick={() => { navigate(`/product?id=${product.id}`) }}>
      <div className="card-img posr w100p df aic jcc ovh">
        <img src={product.imgs[0]} alt={product.name} />

        <div className="card-favorite posa" onClick={handleClick}>
          <img src={favImg} alt="" />
        </div>
      </div>

      <div className="card-title">{product.name}</div>

      <div className="card-price df">
        <div className="card-price-txt">от</div>
        <div className="card-price-value">{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</div>
      </div>
    </div>
  );
};
