import { useSelector, useDispatch } from 'react-redux';
import { setToDos } from '../redux/userSlice';
import { RootState } from '../redux/store';
import { TToDos } from '../pages/Home';



interface CardProps {
  todos: TToDos
}

export default function Cards({ todos }: CardProps) {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);


  const handelDelete = async(toDoId : string) => {
    try {
      const res = await fetch(`/api/todos/deleteToDo/${toDoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      dispatch(setToDos(data));
    } catch (error) {
      console.log('error',error);
    }
  };

  return (
    <div>
      <ul className="cards">
      {todos.map((todo) => (
        <li key={todo._id}>
          <div className='title'>{todo.title}</div>
          <div className='todoBody'>
            {todo.body}
            <button className="delete" value={todo._id} onClick={()=>handelDelete(todo._id)}>X</button>
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}
