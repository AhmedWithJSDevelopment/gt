// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { clearCart } from '../features/cart/cartSlice';
// import { logoutUser } from '../features/user/userSlice';
// import { useQueryClient } from '@tanstack/react-query';

// const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();
//   const user = useSelector((state) => state.userState.user);
//     console.log(user);
//   const handleLogout = () => {
//     navigate('/');
//     dispatch(clearCart());
//     dispatch(logoutUser());
//     queryClient.removeQueries();
//       console.log("LOGOUT CLICKED");

//   };

//   return (
//     <header className='bg-neutral py-2 text-neutral-content'>
//       <div className='align-element flex justify-center sm:justify-end'>
//         {user? (
//           <div className='flex gap-x-2 sm:gap-x-8 items-center'>
//             <p className='text-xs sm:text-sm'>Hello, {user.name}</p>
//             <button
//               className='btn btn-xs btn-outline btn-primary'
//               onClick={handleLogout}
//             >
//               logout
//             </button>
//           </div>
//         ) : (
//           <div className='flex gap-x-6 justify-center items-center'>
//             <Link to='/login' className='link link-hover text-xs sm:text-sm'>
//               Sign in / Guest
//             </Link>
//             <Link to='/register' className='link link-hover text-xs sm:text-sm'>
//               Create Account
//             </Link>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };
// export default Header;
// ------------------------------



import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
import { logoutUser } from '../features/user/userSlice';
import { useQueryClient } from '@tanstack/react-query';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const user = useSelector((state) => state.userState.user);

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());

    queryClient.clear(); // 🔥 أفضل من removeQueries

    navigate('/');
  };

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user?.name ? (
          <div className="flex gap-x-2 sm:gap-x-6 items-center">

            {/* 👤 اسم المستخدم */}
            <p className="text-xs sm:text-sm">
              Hello, {user.name}
            </p>

            {/* 🔥 رابط الأدمن */}
            {user.role === 'admin' && (
              <Link
                to="/admin/orders"
                className="btn btn-xs btn-accent"
              >
                Admin
              </Link>
            )}

            {/* 📦 Orders للمستخدم */}
            <Link
              to="/orders"
              className="btn btn-xs btn-outline btn-secondary"
            >
              Orders
            </Link>

            {/* 🚪 Logout */}
            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link
              to="/login"
              className="link link-hover text-xs sm:text-sm"
            >
              Sign in / Guest
            </Link>

            <Link
              to="/register"
              className="link link-hover text-xs sm:text-sm"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
