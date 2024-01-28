import { request } from "http";
import connectDB from "../../../connectDB";
/* import Product from "../../models/product.ts"; */
import Product from "../../models/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    const product = await Product.find();
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching products");
  }
};

export const POST = async (request: NextRequest) => {
  const { name, price, category } = await request.json();

  try {
    await connectDB();

    const createNewProduct = new Product({
      name: name,
      price: price,
      category: category,
    });
    await createNewProduct.save();

    // for insert many product
    /* const product = [
      { id: 1, name: "T-Shirt", price: 300, category: "Clothing" },
      { id: 2, name: "Hoodie", price: 700, category: "Clothing" },
      { id: 3, name: "Watch", price: 800, category: "Electronics" },
      { id: 4, name: "Hat", price: 200, category: "Accessories" },
      { id: 5, name: "Bag", price: 800, category: "Accessories" },
      { id: 6, name: "Belt", price: 800, category: "Accessories" },
      { id: 7, name: "Watch", price: 800, category: "Electronics" },
      { id: 8, name: "Watch", price: 800, category: "Electronics" },
    ];
    await Product.insertMany(product); */

    return new NextResponse("Add products successful", { status: 200 });
  } catch (error) {
    return new NextResponse("Add product failed");
  }
};

export const DELETE = async (request: NextRequest) => {
  const { id } = await request.json();
  let place;
  try {
    await connectDB();
    place = await Product.findById(id);
    console.log(place)
    await place.deleteOne();
   /*  await place.save(); */

    return new NextResponse("Delete products successful", { status: 200 });
  } catch (error) {
    return new NextResponse("Delete product failed");
  }
};
