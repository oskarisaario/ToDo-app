import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const newUser = {username, password};
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (data.success === false) {
        if (data.message.includes('E11000 duplicate key error')) {
          setError('Username already in use, try something else!');
          return;
        }
        setError(data.message);
        return;
      }
      setError(null);
      navigate('/signin')
    }catch (error) {
      console.log('error',error)
    }
  };


  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input  className='inputField' type="text" id='username' placeholder='Username' onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}} required minLength={3} />
        </div>
        <div>
          <input className='inputField' type="password" id='password' placeholder='Password' onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}} required minLength={5} />
        </div>
        <button className='formButton'>SUBMIT</button>
      </form>
      {error && <p className='error'>{error}</p>}
    </div>
  )
}
