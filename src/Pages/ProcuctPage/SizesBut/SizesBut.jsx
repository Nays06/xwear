import "./style.css";

export const SizesBut = (prop) => {
  const obj = prop.prop;

  function handleClick() {
    const userId = localStorage.getItem("xwear_currentUserID");
    const productId = obj.id;
    const size = Number(obj.size);
    const price = Number(obj.price.replace(" ₽", "").replace(" ", ""));
    let userBasket = JSON.parse(localStorage.getItem("xwear_userBasket")) || [];
    let itemFound = false;
    for (let item of userBasket) {
      if (
        item.userId === userId &&
        item.productId === productId &&
        item.size === size &&
        item.price === price
      ) {
        item.count++;
        itemFound = true;
        break;
      }
    }
    if (!itemFound) {
      userBasket.push({
        userId: userId,
        productId: productId,
        count: 1,
        size: size,
        price: price,
      });
    }
    localStorage.setItem("xwear_userBasket", JSON.stringify(userBasket));
    const event = new CustomEvent("storageUpdate", { detail: userBasket });
    window.dispatchEvent(event);
  }

  return (
    <>
      <div
        className="productPage-sizes-but ml30 bg-black c-white pt25 pb25 pl50 pr50 usn cp df aic"
        onClick={() => handleClick()}
      >
        Добавить в корзину
        <svg
          className="ml15"
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.36529 5.56549C5.67771 5.25307 5.67771 4.74654 5.36529 4.43412L1.36529 0.434119C1.05288 0.1217 0.546343 0.1217 0.233924 0.434119C-0.0784959 0.746538 -0.0784959 1.25307 0.233924 1.56549L3.66824 4.9998L0.233924 8.43412C-0.0784955 8.74654 -0.0784955 9.25307 0.233924 9.56549C0.546343 9.87791 1.05288 9.87791 1.36529 9.56549L5.36529 5.56549Z"
            fill="white"
          />
        </svg>
      </div>
    </>
  );
};
