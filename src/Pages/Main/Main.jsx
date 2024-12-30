import { Header } from "../../Components/Header/Header";
import {Footer} from "../../Components/Footer/Footer";
import { Products } from "../../Components/Products/Products";
import "./style.css";

export const Main = () => {

  return (
    <>
      <Header />

      <main className="df jcc">
      <div className="main-content">
        <div className="main-go_to_catalog mt50">
          <img
            className="go_to_catalog-slide w100p"
            src="img/Main/go_to_catalog-bg.jpg"
            alt="go_to_catalog"
          />

          <div className="df fdc ml100" style={{paddingBottom: 160}}>
            <div className="go_to_catalog-title">
              Широкий ассортимент Одежды
            </div>
            <div className="go_to_catalog-description mt20">
              Одежда от известные брендов у нас в каталоге. Только качественные
              вещи.
            </div>
            <div className="go_to_catalog-button bg-black usn cp c-white mt30">
              Перейти в каталог
            </div>
          </div>

          <Products prop={{title: "Обувь", category: "Обувь"}}/>
          <Products prop={{title: "Одежда", category: "Одежда"}}/>
          <Products prop={{title: "Аксессуары", category: "Аксессуары"}}/>
        </div>
      </div>
    </main>

    <Footer />
    </>
  );
};
