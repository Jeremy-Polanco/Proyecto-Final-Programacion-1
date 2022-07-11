import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormRow from '../components/FormRow';
import { useGlobalContext } from '../context/useAppContext';
const initialState = {
  name: '',
  email: '',
  password: '',
};
const Register = () => {
  const [values, setValues] = useState(initialState);

  const { setupUser, isLoading, user } = useGlobalContext();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    if (!email || !password || !name) {
      return;
    }
    const currentUser = { name, email, password };
    setupUser({
      currentUser,
      endPoint: 'register',
      alertText: 'User Created! Redirecting...',
    });
  };

  return (
    <>
      <Wrapper className='page'>
        <form className='form' onSubmit={onSubmit}>
          <FormRow type='name' name='name' handleChange={handleChange} />
          <FormRow type='email' name='email' handleChange={handleChange} />
          <FormRow
            type='password'
            name='password'
            handleChange={handleChange}
          />
          <button type='submit' className='btn btn-block'>
            Register
          </button>
          <p>
            Already a have an account?
            <Link to='/login' className='login-link'>
              Log In
            </Link>
          </p>
        </form>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .alert {
    margin-top: 3rem;
    margin-bottom: -1.5rem;
  }
  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .login-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-600);
    cursor: pointer;
  }
  .btn:disabled {
    cursor: not-allowed;
  }
`;

export default Register;
