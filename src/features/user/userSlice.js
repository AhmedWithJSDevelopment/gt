import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const themes = {
  winter: 'winter',
  dracula: 'dracula',
};

// const getUserFromLocalStorage = () => {
//   return JSON.parse(localStorage.getItem('user')) || null;
// };
const getUserFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    return null;
  }
};
const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.winter;
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

const initialState = {
  // user: getUserFromLocalStorage(),
  user: JSON.parse(localStorage.getItem('user')) || null,
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // loginUser: (state, action) => {
      // const user = { ...action.payload.user, token: action.payload.jwt };
      // state.user = user;
      // localStorage.setItem('user', JSON.stringify(user));
  // },

  //   loginUser: (state, action) => {
  // state.user = action.payload;
  // localStorage.setItem('user', JSON.stringify(action.payload));
// },
// loginUser: (state, action) => {
//   state.user = action.payload;
//   localStorage.setItem('user', JSON.stringify(action.payload));
// },

    
//     loginUser: (state, action) => {
//   state.user = action.payload.user;
//   localStorage.setItem('user', JSON.stringify(action.payload.user));
// },




  //   loginUser: (state, action) => {
  // const user = action.payload.user;
  // state.user = user;
  // localStorage.setItem('user', JSON.stringify(user));
// },
    // logoutUser: (state) => {
    //   state.user = null;
    //   localStorage.removeItem('user');
    //   toast.success('Logged out successfully');
    // },


//     loginUser: (state, action) => {
//   state.user = action.payload;
//   localStorage.setItem('user', JSON.stringify(action.payload));
// },



    loginUser: (state, action) => {
  state.user = action.payload;
  localStorage.setItem('user', JSON.stringify(action.payload));
},
    toggleTheme: (state) => {
      const { dracula, winter } = themes;
      state.theme = state.theme === dracula ? winter : dracula;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
