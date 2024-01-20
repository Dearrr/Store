"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { Products } from "../Type/ProductsType";
import { DiscountType } from "../Type/DiscountType";

type Cart = { cartList: Products[]; total: number; totalPayment: number };

interface CartContextInterface {
  cart: Cart;
  discount: DiscountType;
  setCart: Dispatch<SetStateAction<Cart>>;
  setDiscount: Dispatch<SetStateAction<DiscountType>>;
  addToCart: (product: Products) => void;
  increaseAmount: (id: number) => void;
  decreaseAmount: (id: number) => void;
  calculateTotal: (product: Products[]) => void;
  cal: () => void;
}

const defaultState = {
  cart: { cartList: [], total: 0, totalPayment: 0 },
  discount: {
    coupon: {
      amount: "",
    },
    onTop: {
      category: "",
      amount: 0,
    },
    specialCampaign: {
      discount: 0,
      amount: 0,
    },
  },
  setCart: (cart: Cart) => {},
  setDiscount: (discount: DiscountType) => {},
  addToCart: (product: Products) => {},
  increaseAmount: (id: number) => {},
  decreaseAmount: (id: number) => {},
  calculateTotal: (product: Products[]) => {},
  cal: () => {},
} as CartContextInterface;

export const CartContext = createContext<CartContextInterface>(defaultState);

type CartProviderProps = {
  children: ReactNode;
};

export default function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>({ cartList: [], total: 0, totalPayment: 0 });
  const [discount, setDiscount] = useState<DiscountType>({
    coupon: {
      amount: "",
    },
    onTop: {
      category: "",
      amount: 0,
    },
    specialCampaign: {
      discount: 0,
      amount: 0,
    },
  });
  const increaseAmount = (id: number) => {
    const isExistItem = cart.cartList.findIndex((item: Products) => item.id === id);
    if (isExistItem !== -1) {
      const newState = [...cart.cartList];
      newState[isExistItem].amount += 1;
      setCart((prev) => ({ ...prev, cartList: newState, total: prev.total }));
    }
  };

  const decreaseAmount = (id: number) => {
    const isExistItem = cart.cartList.findIndex((item: Products) => item.id === id);
    if (isExistItem !== -1 && cart.cartList[isExistItem].amount !== 0) {
      const newState = [...cart.cartList];
      newState[isExistItem].amount -= 1;
      setCart((prev) => ({ ...prev, cartList: newState, total: prev.total }));
    }
  };

  const addToCart = (product: Products) => {
    const { id } = product;
    const isExistItem = cart.cartList.findIndex((item: Products) => item.id === id);
    if (isExistItem !== -1) {
      const newState = [...cart.cartList];
      newState[isExistItem].amount += 1;
      setCart((prev) => ({ ...prev, cartList: newState, total: 0 }));
    } else {
      setCart((prev) => ({ ...prev, cartList: [...prev.cartList, product], total: prev.total }));
    }
  };

  const calculateCoupon = (amount: string) => {
    const isPercentageExist = amount.includes("%");
    if (isPercentageExist) {
      const dicount = Number(amount.slice(0, -1));
      return (dicount / 100) * calculateTotal(cart.cartList);
    } else {
      return Number(amount);
    }
  };

  const calculateOntopByCategory = (category: string, amount: number) => {
    const listProductCategory = cart.cartList.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    return (amount / 100) * calculateTotal(listProductCategory);
  };

  const calculateOnTopByCustomerPoint = (amount: number) => {
    return amount;
  };
  const calculateSpecialCampign = (discount: number, every: number) => {
    return discount * every;
  };

  const calculateTotal = (product: Products[]) => {
    return product.reduce((n, { price, amount }) => {
      return n + price * amount;
    }, 0);
  };

  const cal = () => {
    let total = calculateTotal(cart.cartList);
    const couponDiscount = calculateCoupon(discount.coupon.amount);
    let onTopDisCount = 0;
    total = total - couponDiscount;
    if (discount.onTop.amount) {
      if (discount.onTop.category !== "") {
        onTopDisCount = calculateOntopByCategory(discount.onTop.category, discount.onTop.amount);
        total = total - onTopDisCount;
        setCart((prev) => ({ ...prev, totalPayment: total }));
      } else {
        onTopDisCount = calculateOnTopByCustomerPoint(discount.onTop.amount);
        total = total - onTopDisCount;
        setCart((prev) => ({ ...prev, totalPayment: total }));
      }
    }

    let specialCampaignDiscount = 0;
    if (discount.specialCampaign.discount) {
      specialCampaignDiscount = calculateSpecialCampign(
        discount.specialCampaign.discount,
        Math.floor(total / discount.specialCampaign.amount)
      );
    }

    total = total - specialCampaignDiscount;
    setCart((prev) => ({ ...prev, totalPayment: total }));
  };

  useEffect(() => {
    let total = calculateTotal(cart.cartList);
    setCart((prev) => ({ cartList: prev.cartList, total: total, totalPayment: total }));
  }, [cart.cartList]);

  return (
    <CartContext.Provider
      value={{ cart, discount, setDiscount, setCart, addToCart, increaseAmount, decreaseAmount, calculateTotal, cal }}
    >
      {children}
    </CartContext.Provider>
  );
}
