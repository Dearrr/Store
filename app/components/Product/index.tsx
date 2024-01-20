"use client";
import { Card, Stack, Typography } from "@mui/material";
import React from "react";
import ProductItem from "./components/ProductItem";
import { productList } from "@/app/Store/ProductStore";
type Props = {};

const Product = (props: Props) => {
  return (
    <Card sx={{ padding: "20px", marginTop: "20px" }}>
      <Typography fontSize={"42px"} fontWeight={600}>
        Store
      </Typography>
      <Stack flexDirection={"row"} gap={3} flexWrap={"wrap"} justifyContent={"center"}>
        {productList.map((list) => (
          <ProductItem key={list.id} id={list.id} name={list.name} price={list.price} category={list.category} />
        ))}
      </Stack>
    </Card>
  );
};

export default Product;
