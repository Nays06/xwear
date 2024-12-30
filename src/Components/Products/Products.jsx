import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../Store/products";
import { Card } from "../Card/Card";
import "./style.css";

export const Products = (prop) => {  
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const title = prop.prop.title;
  const category = prop.prop.category;

  return (
    <div className="mt80">
      <div className="products-header df aic jcsb">
        <div className="products-title">{title}</div>
        <div className="products-link cp usn">больше товаров {">"}</div>
      </div>

      <div className="products-cards df aic jcsb mt20">
        {typeof(category) === "string" ? products
          .filter((el) => el.category === category)
          .slice(0, 4)
          .map((el, index) => (
            <Card obj={el} key={index} />
          )) : category?.map((el, index) => (
            <Card obj={el} key={index} />
          ))}
      </div>
    </div>
  );
};
