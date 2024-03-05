import { Request, Response } from 'express';
import ToDo from '../models/ToDo';
import Todo from '../models/ToDo';


//Create ToDo
export const createToDo = async (req: Request, res: Response) => {
  try {
    const newToDo = new ToDo({
      author: req.body.author,
      title: req.body.title,
      body: req.body.body
    });
    const createdToDo = await newToDo.save();
    res.status(201).json(createdToDo);
  } catch (err:any) {
    res.status(409).json({ message: err.message });
  }
};

//Get users ToDos
export const getTodos = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const toDos = await ToDo.find({author: userId});
    res.status(200).json(toDos);
  } catch (err:any) {
    res.status(404).json({ message: err.message });
  }
};

//Delete Todo
export const deleteToDo = async (req: Request, res: Response) => {
  try {
    const { toDoId } = req.params;
    const post = await Todo.findById(toDoId)
    const userId = post?.author
    await ToDo.findByIdAndDelete(toDoId);
    const toDos = await ToDo.find({userId});
    res.status(200).json(toDos);
  } catch (err:any) {
    res.status(404).json({ message: err.message });
  }
};