import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess } from '../redux/userSlice';
import { RootState } from '../redux/store';


export default function Navbar() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async() => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate('/signin');
    } catch (error) {
      console.log(error)
    }
  };


  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/auth/deleteUser/${currentUser?._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Link to='/'>
        <h2 className='nav-item'>ToDo App</h2>
      </Link>
      {currentUser ? (
      <div className='dropdown'>
        <div className='dropbtn'>Menu</div>
        <div className='dropdown-content'>
          <a onClick={handleLogout}>Logout</a>
          <a onClick={handleDeleteUser}>Delete account</a>
        </div>
      </div>
       ) : (
        <Link to='/signin'>
          <p className='nav-item'>SignIn</p>
        </Link>
      )}
    </header>
  )
}
