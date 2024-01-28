/* 'use client' */
import { Card, Stack, Typography } from "@mui/material/index";
import ProductItem from "./components/ProductItem";
import { productApi } from "@/app/services/productApi";

type Props = {};

const Product = async (props: Props) => {
  const products = await productApi.getProduct();

  return (
    <Card sx={{ padding: "20px", marginTop: "20px" }}>
      <Typography fontSize={"42px"} fontWeight={600}>
        Store
      </Typography>

      <Stack flexDirection={"row"} gap={3} flexWrap={"wrap"} justifyContent={"center"}>
        {products.map((list: any) => (
          <ProductItem key={list._id} id={list.id} name={list.name} price={list.price} category={list.category} />
        ))}
      </Stack>
    </Card>
  );
};

export default Product;
