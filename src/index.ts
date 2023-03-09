
import { PrismaClient } from '@prisma/client'
import express from 'express'
import routes from './routes/index';

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.use("/", routes);

//USAR ESTE CODIGO PARA PROBAR FUNCIONAMIENTO GENERANDO UN NUEVO LIBRO
// async function main() {
//     const newProduct = await prisma.product.create({
//       data: {
//         isbn: "isbnlibro1",      
//         title: "titulo del libro1" ,     
//         price: 200,       
//         author: "autordellibro1" ,     
//         editorial: "editorialdellibro1",
//         code: "codigolibro1",     
//         stock: 10      
//       },
//     })
//     console.log('Created new product: ', newProduct)
//   }
//   main()
//     .catch((e) => console.error(e))
//     .finally(async () => await prisma.$disconnect())


app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)

export default prisma