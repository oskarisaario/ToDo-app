import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cards from '../components/Cards';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setToDos } from '../redux/userSlice';

export interface TTodo {
  author: string,
  body: string,
  title: string,
  _id: string
}

type INewToDo = {
  author: string,
  body: string,
  title: string
};

export type TToDos = TTodo[];


export default function Home() {
  const dispatch = useDispatch();
  const [newToDo, setNewToDo] = useState<INewToDo>({title: '', body: '', author: ''});
  const [todos, setTodos] = useState<TToDos>([]);
  const { token } = useSelector((state: RootState) => state.user);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const userTodos  = useSelector((state: RootState) => state.user.todos);


  useEffect(() => {
    const getToDos = async() => {
      const res = await fetch(`/api/todos/${currentUser?._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setTodos(data);
      dispatch(setToDos(data))
    }
    getToDos();
  }, [todos.length, userTodos?.length]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const author:string = currentUser!._id;
    setNewToDo(
      {
        ...newToDo,
        author: author,
        [e.target.id]: e.target.value,
      }
    );
  }; 


  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/todos/createToDo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newToDo),
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setTodos([...todos, data]);
      setNewToDo({title: '', body: '', author: ''});
    } catch (error) {
      console.log('error', error);
    }
  };


  return (
    <div>
      <h2 >Add new ToDo</h2>
      <form className='newTodo' onSubmit={handleSubmit}>
        <div>
          <input type="text" id='title' placeholder='Title' value={newToDo.title} onChange={handleChange} required />
        </div>
        <div>
          <input type="text" id='body' placeholder='Description' value={newToDo.body} onChange={handleChange} required />
        </div>
        <button>SUBMIT</button>
      </form>
      <h2>ToDos</h2>
      <Cards todos={todos}/>
    </div>
  )
}
