// archivo products.controller.ts
import prisma from '../index';
import { Router, Request, Response } from "express";

export const getProducts = async (req: Request, res:Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const addProduct = async (req: Request, res:Response) => {
  const { isbn, title, price, author, editorial, code, stock } = req.body;

  const product = await prisma.product.create({
    data: {
      isbn,
      title,
      price,
      author,
      editorial,
      code,
      stock,
    },
  });

  res.json(product);
};

export const updateProduct = async (req: Request, res:Response) => {
  const { productId } = req.params;
  const { stock } = req.body;

  const product = await prisma.product.update({
    where: { id: Number(productId) },
    data: { stock },
  });

  res.json(product);
};

// export const addProductPurchase = async (req: Request, res:Response) => {
//   const { productId } = req.params;
//   const { distributor, quantity } = req.body;

//   const purchase = await prisma.purchase.create({
//     data: {
//       productId: Number(productId),
//       distributor,
//       quantity,
//     },
//   });

//   const product = await prisma.product.update({
//     where: { id: Number(productId) },
//     data: { stock: { increment: quantity } },
//   });

//   res.json(purchase);
// };
