import axios from "axios";

const getProduct = async () => {
  try {
    const response = await axios.get("https://store-and-cart-fxgdh2dva-dearrrs-projects.vercel.app/api/products");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const productApi = {
    getProduct
}
