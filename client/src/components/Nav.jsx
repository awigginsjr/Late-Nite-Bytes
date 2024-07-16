import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '', areaCode: '' });
  const [register, { error }] = useMutation(REGISTER_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await register({
        variables: { ...formState },
      });
      Auth.saveToken(data.register.token);
      window.location.assign('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
    <form onSubmit={handleFormSubmit}>
      <input
        name="username"
        type="text"
        value={formState.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="email"
        type="email"
        value={formState.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={formState.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        name="areaCode"
        type="areaCode"
        value={formState.areaCode}
        onChange={handleChange}
        placeholder="areaCode"
      />
      <button type="submit">Signup</button>
      {error && <p>Signup failed</p>}
    </form>
    </>
  );
};

export default Signup;
