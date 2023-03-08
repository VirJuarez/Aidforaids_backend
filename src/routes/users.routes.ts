
import { Router } from 'express';
import {login, createUser, updateUser, addCart} from '../controllers/users.controller';

const Userrouter : Router = Router();


Userrouter.post("/", createUser);
Userrouter.post("/login", login)
Userrouter.put('/update', updateUser);
Userrouter.put("/:userid/cart", addCart)

export default Userrouter;