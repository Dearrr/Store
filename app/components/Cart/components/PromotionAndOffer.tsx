"use client"
import { CartContext } from "@/app/context/CartContext";
import {
  Card,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material/index";
import React, { useContext, useState } from "react";
import { couponDiscountList, onTopDiscountList } from "@/app/Store/Discount";
import { CouponDiscountListType, OnTopDiscountListType } from "@/app/Type/DiscountType";

type Props = {};

const PromotionAndOffer = (props: Props) => {
  const [onTopCategory, setOnTopCategory] = useState("");
  const { discount, cart, setDiscount, calculateTotalAfterCouponDiscount } = useContext(CartContext);
  const handleChangeonTopCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiscount((prev) => ({ ...prev, onTop: { category: "", amount: null } }));
    setOnTopCategory(event.target.value);
  };
  const handleChangeCoupon = (event: SelectChangeEvent<string>) => {
    setDiscount((prev) => ({ ...prev, coupon: { amount: event.target.value } }));
  };

  const handleChooseCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiscount((prev) => ({ ...prev, onTop: { ...prev.onTop, category: event.target.value } }));
  };

  const handleChangeDiscountByCategory = (event: SelectChangeEvent<string>) => {
    setDiscount((prev) => ({ ...prev, onTop: { ...prev.onTop, amount: Number(event.target.value) } }));
  };
  const isNumberExceed = (amount: number) => {
    const totalAfterDiscount = calculateTotalAfterCouponDiscount();
    return Number(amount) > Number(totalAfterDiscount) * (20 / 100);
  };
  const handleChangeDiscountByCustomerPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if (Number(event.target.value) > Number(calculateTotalAfterCouponDiscount()) * (20 / 100)) {
      return;
    }
    if (event.target.value === "" || regex.test(event.target.value)) {
      setDiscount((prev) => ({ ...prev, onTop: { category: "", amount: Number(event.target.value) } }));
    }
  };
  const handleChangeSpecialCampaign = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const regex = /^[0-9\b]+$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      setDiscount((prev) => ({ ...prev, specialCampaign: { ...prev.specialCampaign, [name]: Number(value) } }));
    }
  };

  return (
    <Stack gap={2}>
      <Card sx={{ padding: "20px 20px" }}>
        <Typography fontSize={"28px"} fontWeight={600}>
          Promotion & Offer
        </Typography>
        <Stack gap={3}>
          <Typography fontSize={"22px"}>Coupon</Typography>
          <FormControl fullWidth>
            <Select defaultValue="" onChange={handleChangeCoupon}>
              {couponDiscountList.map((item: CouponDiscountListType) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography fontSize={"22px"}>On Top</Typography>

          <RadioGroup row value={onTopCategory} onChange={handleChangeonTopCategory}>
            <FormControlLabel value="discountByCategory" control={<Radio />} label="Discount by item category" />
            <FormControlLabel value="discountByPoint" control={<Radio />} label="Discount by point" />
          </RadioGroup>
          {onTopCategory === "discountByCategory" && (
            <>
              <Typography fontWeight={500}>Choose Discount Category</Typography>
              <RadioGroup row value={discount.onTop.category} onChange={handleChooseCategory}>
                <FormControlLabel value="Clothing" control={<Radio />} label="Clothing" />
                <FormControlLabel value="Electronics" control={<Radio />} label="Electronics" />
                <FormControlLabel value="Accessories" control={<Radio />} label="Accessories" />
              </RadioGroup>
              <FormControl fullWidth>
                <Select defaultValue="" onChange={handleChangeDiscountByCategory}>
                  {onTopDiscountList.map((item: OnTopDiscountListType) => (
                    <MenuItem key={item.id} value={item.value}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          {onTopCategory === "discountByPoint" && (
            <TextField
              helperText={
                !isNumberExceed(discount.onTop.amount!)
                  ? `cannot input exceed ${
                      Number(calculateTotalAfterCouponDiscount()) * (20 / 100)
                    } (20% of total price)`
                  : ""
              }
              type="number"
              fullWidth
              variant="standard"
              value={discount.onTop.amount}
              onChange={handleChangeDiscountByCustomerPoint}
            />
          )}

          <Stack flexDirection={{ xs: "column", md: "row" }} alignItems={"center"} gap={3}>
            <Typography>Discount</Typography>
            <TextField name="discount" onChange={handleChangeSpecialCampaign}></TextField>
            <Typography>THB AT Every</Typography>
            <TextField name="amount" onChange={handleChangeSpecialCampaign}></TextField>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default PromotionAndOffer;
