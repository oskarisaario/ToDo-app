import express from "express";
import { createToDo, getTodos, deleteToDo } from "../controllers/toDoController";
import { verifyToken } from "../middleware/auth";



const router = express.Router();


router.post('/createToDo', verifyToken, createToDo);
router.get('/:userId', verifyToken, getTodos);
router.delete('/deleteToDo/:toDoId', verifyToken, deleteToDo);


export default router;