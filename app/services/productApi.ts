import axios from "axios";

const getProduct = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/products");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const productApi = {
    getProduct
}
