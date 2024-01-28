import { Box, Container, Stack } from "@mui/material/index";
import Product from "./components/Product";
import Cart from "./components/Cart";
import CartProvider from "./context/CartContext";

import Link from "next/link";

export default function Home() {
  return (
    <Box height={"100%"} width={"100vw"} sx={{ background: "#ECEAF9" }}>
      <Container>
        <Stack gap={3}>
          <CartProvider>
            <Product />
            <Cart />
            <Link href={'/test'}>Link</Link>
          </CartProvider>
        </Stack>
      </Container>
    </Box>
  );
}
