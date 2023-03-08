
import { Router } from 'express';
import {login, createUser, updateUser} from '../controllers/users.controller';

const Userrouter : Router = Router();


Userrouter.post("/", createUser);
Userrouter.post("/login", login)
Userrouter.put('/update', updateUser);


export default Userrouter;