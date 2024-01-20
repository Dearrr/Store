"use client";
import { CartContext } from "@/app/context/CartContext";
import { Button, Card, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import CartItem from "./components/CartItem";
import PromotionAndOffer from "./components/PromotionAndOffer";

type Props = {};

const Cart = (props: Props) => {
  const { cart, cal } = useContext(CartContext);
  return (
    <Stack gap={2} marginBottom={"20px"}>
      <Card sx={{ padding: "20px 20px" }}>
        <Stack>
          <Typography fontSize={"42px"} fontWeight={600}>
            Cart
          </Typography>
          <Typography fontSize={"22px"}>Total : {cart.total}</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={3} flexWrap={"wrap"} justifyContent={"center"}>
          {cart.cartList.map(
            (item: any) =>
              item.amount !== 0 && (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  category={item.category}
                  amount={item.amount}
                />
              )
          )}
        </Stack>
      </Card>
      <PromotionAndOffer />
      <Button fullWidth variant="contained" onClick={cal}>
        Apply
      </Button>
      <Card sx={{ padding: "20px 20px" }}>
        <Stack>
          <Typography fontSize={"28px"} fontWeight={600}>
            Order Summary
          </Typography>
          <Typography fontSize={"22px"}>Total Payment: {cart.totalPayment}</Typography>
        </Stack>
      </Card>
    </Stack>
  );
};

export default Cart;
