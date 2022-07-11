import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormRow } from '../components';
import { useGlobalContext } from '../context/useAppContext';
const initialState = {
  email: '',
  password: '',
};
const Login = () => {
  const [values, setValues] = useState(initialState);

  const { setupUser, isLoading, user } = useGlobalContext();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      return;
    }
    const currentUser = { email, password };

    setupUser({
      currentUser,
      endPoint: 'login',
    });
  };

  return (
    <>
      <Wrapper className='page' onSubmit={onSubmit}>
        <form className='form'>
          <FormRow type='email' name='email' handleChange={handleChange} />
          <FormRow
            type='password'
            name='password'
            handleChange={handleChange}
          />
          <button type='submit' className='btn btn-block'>
            login
          </button>
          <p>
            Don't have an account?
            <Link to='/register' className='register-link'>
              Register
            </Link>
          </p>
          <p>
            Forgot your password?
            <Link to='#' className='reset-link'>
              Reset Password
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
  }
  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    text-align: center;
  }
  .btn {
    margin-bottom: 1.5rem;
  }
  .register-link,
  .reset-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-600);
    cursor: pointer;
  }
  .reset-link {
    margin-top: 0.25rem;
  }
  .btn:disabled {
    cursor: not-allowed;
  }
`;

export default Login;
