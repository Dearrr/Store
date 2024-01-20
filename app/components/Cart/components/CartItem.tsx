import { CartContext } from "@/app/context/CartContext";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";

type Props = {
  id: number;
  name: string;
  price: number;
  category: string;
  amount: number;
};

const CartItem = ({ id, name, price, category, amount }: Props) => {
  const { increaseAmount, decreaseAmount } = useContext(CartContext);
  return (
    <Card sx={{ width: "100%" }}>
      <Box padding={"20px 20px"}>
        <Stack gap={1}>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Box>
              <Typography fontWeight={600} fontSize={"18px"}>
                {name}
              </Typography>
              <Typography color="grey">{category}</Typography>
            </Box>
            <Stack alignItems={"flex-end"}>
              <Typography>{price * amount} THB</Typography>
              {
                <Box alignSelf={""}>
                  <Button sx={{ minWidth: "24px" }} onClick={() => decreaseAmount(id)}>
                    -
                  </Button>{" "}
                  {amount}{" "}
                  <Button sx={{ minWidth: "24px" }} onClick={() => increaseAmount(id)}>
                    +
                  </Button>
                </Box>
              }
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export default CartItem;
