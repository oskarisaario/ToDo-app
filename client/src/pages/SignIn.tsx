import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signinSuccess } from '../redux/userSlice';
import { RootState } from '../redux/store';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { error } = useSelector((state: RootState) => state.user);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      });
  };


  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      //dispatch(signinSuccess(data));
      dispatch(signinSuccess(data))
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        dispatch(signInFailure(error.message));
      }
      console.log('error', error);
    }
  };

  return (
    <div>
      <h1>SignIn</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.5rem'}}>
          <input className='inputField' type="text" id='username' placeholder='Username' onChange={handleChange} required />
        </div>
        <div>
          <input className='inputField' type="password" id='password' placeholder='Password' onChange={handleChange} required />
        </div>
        <button className='formButton'>SIGNIN</button>
      </form>
      {error && <p className='error'>{error}</p>}
      <div style={{display: 'flex', gap: 10, textAlign: 'center', justifyContent: 'center'}}>
        <p>No account yet?</p>
        <Link to='/register'>
          <p style={{color: 'steelblue'}}>Register here</p>
        </Link>
      </div>
    </div>
  )
}
