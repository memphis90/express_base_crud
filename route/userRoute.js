import express from 'express';
import { fetch, create, update, deleteUser } from '../controller/userController.js';

const userRoute = express.Router();    

userRoute.get("/users", fetch);
userRoute.post("/create", create);
userRoute.put("/update", update);
userRoute.delete('/delete', deleteUser)

export default userRoute;  