import prisma from '../index';
import { Router, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const createUser = async(req: Request, res: Response) => {
  const { email, password, name } = req.body;

  // Verificar si el correo electrónico ya está en uso
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return res.status(409).json({ message: 'El correo electrónico ya está en uso' });
  }

  // Crear un nuevo usuario
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    },
  });

  // Devolver el nuevo usuario al cliente
  res.json(newUser);
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
  
    // Buscar el usuario en la base de datos por correo electrónico
    const user = await prisma.user.findUnique({ where: { email } });
   
    if (!user) {
      // El usuario no existe
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
  
    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      // La contraseña no es válida
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
  // Generar un token de acceso
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  // Devolver el token de acceso al cliente
  res.json({ accessToken });
}  
  
  export function verifyToken(token: string): { userId: number } {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    return payload;
  }
  
  export async function updateUser(req: Request, res: Response) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { address, photoUrl, password } = req.body;
    if (!token) {
      return res.status(401).json({ message: 'Token de acceso no válido' });
    }
  
    try {
      const payload = verifyToken(token);
      const userId = payload.userId;

      const userToUpdate = await prisma.user.findUnique({
        where: {
          id: userId
        }});
      if (userToUpdate){
      const userupdate = await prisma.user.update({
        where: { id: userId },
        data: {
          password: password ? await bcrypt.hash(password, 10) : userToUpdate.password,
          address: address? address : userToUpdate.address,
          photoUrl: photoUrl? photoUrl : userToUpdate.photoUrl
        },
      })
      res.json(userupdate)}
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token de acceso no válido' });
  }
}



export async function addCart(req: Request, res: Response)  {
  const { userId } = req.params;
  const { productId, amount } = req.body;

  try {
    const shoppingCart = await prisma.shoppingCart.create({
      data: {
        user: { connect: { id: parseInt(userId) } },
        productId: productId,
        amount: parseInt(amount)
      }
    });
    res.json(shoppingCart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding product to shopping cart');
  }
}



// export const updateUser = async (
//     { username, clave, direccion, numero_celular, dni, foto }: datosUsuario,
//     userId: number,
//     token: string,
//     justPhoto: boolean = false
//   ) => {
//     if (justPhoto) {
//       await sequelize.query(`UPDATE Usuarios SET foto=:foto  WHERE id=:userId`, {
//         replacements: { foto, userId },
//         type: QueryTypes.UPDATE,
//       });
  
//       return { ...(await getUser(userId)), token };
//     }





// export const updateProduct = async (req: Request, res:Response) => {
//     const { id } = req.params;
//     const { photoURL, address } = req.body;
//     const user = await prisma.user.findUnique({
//       where: {id: String(productISBN)},
//     });
//     const newInventory = productToUpdate?.stock + nuevostock;
  
//     const product = await prisma.user.update({
//       where: { isbn: String(productISBN) },
//       data: { stock: newInventory },
//     });
  
//     res.json(user);
//   };