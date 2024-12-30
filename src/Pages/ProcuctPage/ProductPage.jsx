import { useSearchParams } from "react-router-dom";
import { Header } from "../../Components/Header/Header";
import { Footer } from "../../Components/Footer/Footer";
import "./style.css";
import { useEffect, useState, useRef } from "react";
import { Products } from "../../Components/Products/Products";
import { SizesBut } from "./SizesBut/SizesBut";

export const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const [product, setProduct] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const sliderRef = useRef(null);
  const slidesRef = useRef([]);
  const thumbnailsRef = useRef([]);
  const singleSlideWidthRef = useRef(0);
  const [images, setImages] = useState([]);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedSize, setSelectedSize] = useState(36);
  const [dopInfoSelection, setDopInfoSelection] = useState(1);
  const [dopInfoSelectionCont, setDopInfoSelectionCont] = useState(null);
  const [interestingSales, setInterestingSales] = useState(null);
  const [favImg, setFavImg] = useState("img/Card/favorite.svg");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(
      `https://6765722d52b2a7619f5f93a3.mockapi.io/xwear/products/${productId}`
    )
      .then((res) => res.json())
      .then((res) => setProduct(res));
  }, [productId]);

  useEffect(() => {
    setImages(product?.imgs);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSlideChange = (index) => {
    setCurrentSlideIndex(index);
  };

  const handleNextSlide = (e) => {
    e.preventDefault();
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousSlide = (e) => {
    e.preventDefault();
    setCurrentSlideIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    if (sliderRef.current && slidesRef.current.length > 0) {
      singleSlideWidthRef.current = slidesRef.current[0].offsetWidth;
      sliderRef.current.style.transform = `translateX(-${
        currentSlideIndex * singleSlideWidthRef.current
      }px)`;
      thumbnailsRef.current.forEach((thumbnail, index) => {
        thumbnail.classList.toggle("active", index === currentSlideIndex);
      });
    }
  }, [currentSlideIndex, images]);

  useEffect(() => {
    fetch(
      `https://6765722d52b2a7619f5f93a3.mockapi.io/xwear/products?category=${product?.category}`
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data?.filter(
          (product) => product.id !== productId
        );

        const shuffleArray = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        const shuffledProducts = shuffleArray(filteredProducts);
        setInterestingSales(shuffledProducts.slice(0, 4));
      })
      .catch((error) => console.error("Error fetching data:", error));

    setCurrentSlideIndex(0);
    setSelectedSizeIndex(0);
    setSelectedPrice(null);
    setSelectedSize(36);
    window.scrollTo(0, 0);
  }, [product?.category, productId]);

  const divs = [];
  let minSize = 36;

  useEffect(() => {
    setSelectedPrice(
      (product?.price + selectedSizeIndex * 100)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"
    );
  }, [product?.price, selectedSizeIndex]);

  for (let i = 0; i < 17; i++) {
    const newSize = minSize % 1 === 0 ? minSize.toString() : minSize.toFixed(1);
    const newPrice = product?.price + i * 100;
    divs.push(
      <div
        className={`size_price df fdc aic pt10 pb10 usn cp ${
          selectedSizeIndex === i ? "selected" : ""
        }`}
        key={i}
        onClick={() => {
          setSelectedSizeIndex(i);
          setSelectedPrice(
            newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"
          );
          setSelectedSize(newSize);
        }}
      >
        <div id="size">{newSize}</div>
        <div id="price">
          {newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽
        </div>
      </div>
    );
    minSize += 0.5;
  }

  useEffect(() => {
    const obj = {
      1: (
        <>
          <div className="productPage-dop_info-grid">
            <div>Артикул</div>
            <div>{product?.article}</div>
            <div>Категория</div>
            <div>{product?.category}</div>
            <div>Бренд</div>
            <div>{product?.brand}</div>
            <div>Модель</div>
            <div>{product?.model}</div>
            <div>Цвет</div>
            <div>{product?.color}</div>
          </div>
        </>
      ),
      2: <div>Доставка</div>,
      3: <div>Оплата</div>,
      4: <div>FAQ</div>,
    };

    setDopInfoSelectionCont(obj[dopInfoSelection]);
  }, [dopInfoSelection, product]);

  const userId = localStorage.getItem("xwear_currentUserID")

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
    <>
      <Header />

      <main className="df jcc pt50">
        <div className="main-content">
          <div className="df jcsb w100p">
            <div className="productPage-imgs">
              <div className="productPage-main_img df jcc aic w100p posr p15">
                <div className="productPage-favorite posa usn cp" onClick={handleClick}><img src={favImg} alt="" /></div>
                <div
                  id="frame"
                  onContextMenu={handlePreviousSlide}
                  onClick={handleNextSlide}
                >
                  {product ? (
                    <div
                      className="df ovh"
                      id="slider"
                      ref={sliderRef}
                      style={{
                        width: `${images?.length * 100}%`,
                        transition: "transform 0.3s ease-in-out",
                      }}
                    >
                      {images?.map((image, index) => (
                        <div
                          key={index}
                          className="imggg df jcc aic ovh"
                          ref={(el) => (slidesRef.current[index] = el)}
                        >
                          <img src={image} alt={`Slide ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="df aic w100p mt20">
                {images?.map((image, index) => (
                  <div
                    key={index}
                    className={`productPage-other_img df jcc aic ovh p10 cp ${
                      currentSlideIndex === index ? "active" : ""
                    }`}
                    ref={(el) => (thumbnailsRef.current[index] = el)}
                    onClick={() => handleSlideChange(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="productPage-info w45p">
              <div className="productPage-name">{product?.name}</div>
              <div className="productPage-sizes">
                <div className="productPage-sizes-title mt10">EU размеры:</div>

                <div className="productPage-sizes-cont mt10">{divs}</div>

                <div>
                  {selectedPrice && (
                    <div className="productPage-sizes-buy df mt30 aic">
                      <div style={{ width: 130 }}>
                        <div className="productPage-sizes-price">
                          {selectedPrice}
                        </div>
                        <div className="productPage-sizes-size">
                          размер - {selectedSize}
                        </div>
                      </div>

                      <SizesBut prop={{id: productId, size: selectedSize, price: selectedPrice}}/>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <hr className="mt50" />
            <div className="productPage-dop_info-selection df jcsb aic">
              <div
                className={dopInfoSelection === 1 ? "active" : null}
                onClick={() => setDopInfoSelection(1)}
              >
                Детали
              </div>
              <div
                className={dopInfoSelection === 2 ? "active" : null}
                onClick={() => setDopInfoSelection(2)}
              >
                Доставка
              </div>
              <div
                className={dopInfoSelection === 3 ? "active" : null}
                onClick={() => setDopInfoSelection(3)}
              >
                Оплата
              </div>
              <div
                className={dopInfoSelection === 4 ? "active" : null}
                onClick={() => setDopInfoSelection(4)}
              >
                FAQ
              </div>
            </div>
            <hr />

            <div className="productPage-dop_info-cont mt20">
              {dopInfoSelectionCont}
            </div>
          </div>

          <div>
            <Products
              prop={{
                title: "Интересные предложения",
                category: interestingSales,
              }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};
