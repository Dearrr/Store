export type DiscountType = {
  coupon: {
    amount: string;
  };
  onTop: {
    category: string;
    amount: number | null;
  };
  specialCampaign: {
    discount: number;
    amount: number;
  };
};

export type CouponDiscountListType = {
  id: number;
  title: string;
  value: string;
};

export type OnTopDiscountListType = {
  id: number;
  title: string;
  value: number;
};
