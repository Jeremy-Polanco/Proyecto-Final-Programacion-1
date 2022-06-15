import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormRow } from '../components';
const Login = () => {
  return (
    <>
      <Wrapper className='page'>
        <form className='form'>
          {/* single form row */}
          <FormRow type='email' name='email' />
          {/* end of single form row */}
          {/* single form row */}
          <FormRow type='password' name='password' />
          {/* end of single form row */}
          <button type='submit' className='btn btn-block'>
            login
          </button>
          <p>
            Don't have an account?
            <Link to='/login' className='register-link'>
              Register
            </Link>
          </p>
          <p>
            Forgot your password?
            <Link to='/login' className='reset-link'>
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
