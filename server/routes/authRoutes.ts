import express from "express";
import { login, register, signout, deleteUser } from "../controllers/authController";


const router = express.Router();

router.post('/register', register);
router.post('/signin', login);
router.get('/signout', signout);
router.delete('/deleteUser/:userId', deleteUser);


export default router;