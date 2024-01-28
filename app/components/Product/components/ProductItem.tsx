"use client";
import { CartContext } from "@/app/context/CartContext";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import React, { Suspense, useContext } from "react";

type Props = {
  id: number;
  name: string;
  price: number;
  category: string;
};

const ProductItem = ({ id, name, price, category }: Props) => {
  const { addToCart } = useContext(CartContext);
  return (
      <Card sx={{ width: "250px" }}>
        <Box padding={"20px 20px"}>
          <Stack alignItems={"center"} gap={1}>
            <Box>
              <Typography fontWeight={600} fontSize={"18px"}>
                {name}
              </Typography>
            </Box>

            <Box>
              <Typography color="grey">{category}</Typography>
            </Box>
            <Box>
              <Typography fontWeight={500} fontSize={"16px"}>
                {price} THB
              </Typography>
            </Box>
            <Button variant="outlined" onClick={() => addToCart({ id, name, price, category, amount: 1 })}>
              Add to cart
            </Button>
          </Stack>
        </Box>
      </Card>
  );
};

export default ProductItem;
