import { Box, Container, Stack } from "@mui/material";
import Product from "./components/Product";
import Cart from "./components/Cart";
import CartProvider from "./context/CartContext";

export default function Home() {
  return (
    <CartProvider>
      <Box height={'100%'} width={'100vw'} sx={{ background: "#ECEAF9" }}>
        <Container>
          <Stack gap={3}>
            <Product />
            <Cart />
          </Stack>
        </Container>
      </Box>
    </CartProvider>
  );
}
