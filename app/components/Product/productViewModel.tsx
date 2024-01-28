import { productApi } from "@/app/services/productApi";
import React, { useEffect, useState } from "react";

const ProductViewModel = () => {
  const [products, setProducts] = useState();
  const getProduct = async () => {
    try {
      const response = await productApi.getProduct();
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return { products, setProducts };
};

export default ProductViewModel;
