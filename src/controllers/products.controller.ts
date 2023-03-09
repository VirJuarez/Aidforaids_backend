
import prisma from '../index';
import {Request, Response } from "express";


//////////////GET TODOS LOS PRODUCTOS
export const getProducts = async (req: Request, res:Response) => {
  try{const products = await prisma.product.findMany();
  res.json(products)
} catch (err) {
  console.error(err);
  res.status(500).send('Error al consultar lista de productos');
};
};


/////////////AGREGAR NUEVO PRODUCTO - SI NO ES LIBRO, USAR ISBN(CODIGO), TITLE(NOMBRE PROD), PRICE, STOCK 
export const addProduct = async (req: Request, res:Response) => {
  const {isbn, title, price, author, editorial, stock } = req.body;
  try{
  const product = await prisma.product.create({
    data: {
      isbn,
      title,
      price,
      author,
      editorial,
      stock,
    },
  });

  res.json(product);
} catch (err) {
  console.error(err);
  res.status(500).send("No se pudo agregar el nuevo producto");
}
};

/////////////AGREGAR STOCK DE UN PRODUCTO
export const updateProduct = async (req: Request, res:Response) => {
  const { productISBN } = req.params;
  const { nuevostock } = req.body;
  try{
  const productToUpdate = await prisma.product.findUnique({
    where: {
      isbn: productISBN
    },
  });
  const newInventory = productToUpdate?.stock + nuevostock;

  const product = await prisma.product.update({
    where: { isbn: productISBN },
    data: { stock: newInventory },
  });

  res.json(product);
} catch (err) {
  console.error(err);
  res.status(500).send('Error al agregar más stock');
}
};


