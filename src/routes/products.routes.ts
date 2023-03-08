// archivo products.routes.ts
import { Router } from 'express';
import { getProducts, addProduct, updateProduct} from '../controllers/products.controller';

const Prodrouter : Router = Router();


Prodrouter.get('/', getProducts);
Prodrouter.post('/', addProduct);
Prodrouter.put('/:productISBN', updateProduct);
//router.post('/:productId/purchases', addProductPurchase);

export default Prodrouter;
