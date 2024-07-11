// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../../graphql/mutations';
// import Auth from '../../utils/Auth';

// const Login = () => {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const [login, { error }] = useMutation(LOGIN_USER);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const { data } = await login({
//         variables: { ...formState },
//       });
//       Auth.saveToken(data.login.token);
//       window.location.assign('/');
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <input
//         name="email"
//         type="email"
//         value={formState.email}
//         onChange={handleChange}
//         placeholder="Email"
//       />
//       <input
//         name="password"
//         type="password"
//         value={formState.password}
//         onChange={handleChange}
//         placeholder="Password"
//       />
//       <button type="submit">Login</button>
//       {error && <p>Login failed</p>}
//     </form>
//  );
// };

// export default Login;
