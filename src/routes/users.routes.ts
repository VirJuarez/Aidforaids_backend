
import { Router } from 'express';
import {login, createUser, updateUser, addCart, buyCart} from '../controllers/users.controller';

const Userrouter : Router = Router();


Userrouter.post("/", createUser);
Userrouter.post("/login", login)
Userrouter.put('/update', updateUser);
Userrouter.put("/cart", addCart);
Userrouter.put("/buy", buyCart)

export default Userrouter;