import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const Header = () => {
  const [userBasket, setUserBasket] = useState(() => {
    const storedData = localStorage.getItem("xwear_userBasket");
    return storedData ? JSON.parse(storedData) : null;
  });
  const [userBasketCount, setUserBasketCount] = useState(0);
  const [userBasketPrice, setUserBasketPrice] = useState(0);

  useEffect(() => {
    const handleStorageUpdate = (event) => {
      setUserBasket(event.detail);
    };
    window.addEventListener("storageUpdate", handleStorageUpdate);
    return () => {
      window.removeEventListener("storageUpdate", handleStorageUpdate);
    };
  }, []);

  useEffect(() => {
    let newCount = 0;
    let newPrice = 0;
    userBasket?.forEach((element) => {
      if (element.userId === localStorage.getItem("xwear_currentUserID")) {
        newCount += element.count;
        newPrice += element.price * element.count;
      }
    });
     setUserBasketCount(newCount);
     setUserBasketPrice(newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
  }, [userBasket]);

  return (
    <header className="pt25 pb25 bg-black w100p df jcc aic">
      <div className="header-cont df aic jcsb">
        <div className="header-logo cp usn">
          <Link to="/">
            <img src="img/Header/logo.svg" alt="logo" />
          </Link>
        </div>

        <nav className="df">
          <div className="header-nav c-white pl20 pr20 cp p10 mr10 usn">
            Одежда
          </div>
          <div className="header-nav c-white pl20 pr20 cp p10 mr10 usn">
            Обувь
          </div>
          <div className="header-nav c-white pl20 pr20 cp p10 mr10 usn">
            Аксессуары
          </div>
          <div className="header-nav c-white pl20 pr20 cp p10 mr10 usn">
            Бренды
          </div>
          <div className="header-nav c-white pl20 pr20 cp p10 mr10 usn">
            Расчет стоимости
          </div>
          <div className="header-nav c-white pl20 pr20 cp p10 mr10 usn">
            Информация
          </div>
        </nav>

        <div className="df aic">
          {localStorage.getItem("xwear_currentUserID") ? (
            <>
              <div className="df aic">
                <img
                  className="p5 cp ml15"
                  src="img/Header/search.svg"
                  alt="search"
                />
                <Link to="/favorite"><img
                  className="p5 cp ml15"
                  src="img/Header/favorite.svg"
                  alt="favorite"
                /></Link>
                <img
                  className="p5 cp ml15"
                  src="img/Header/user.svg"
                  alt="user"
                />
              </div>

              <div className="df ml25 aic cp usn">
                <img className="p5" src="img/Header/basket.svg" alt="basket" />
                <div className="header-price ml5">{userBasketPrice} ₽</div>
                <div className="header-basket_items ml10 bg-blue df aic jcc c-white br-50p">
                  {userBasketCount}
                </div>
              </div>
            </>
          ) : (
            <Link to="/accaunt" className="link">
              <div className="reg-but c-white bg-blue pl20 pr20 pt10 pb10 usn cp">
                Зарегистрироваться
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
