import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormRow from '../components/FormRow';

const Register = () => {
  return (
    <>
      <Wrapper className='page'>
        <form className='form'>
          {/* single form row */}

          <FormRow type='name' name='name' />

          {/* single form row */}
          <FormRow type='email' name='email' />
          {/* end of single form row */}
          {/* single form row */}
          <FormRow type='password' name='password' />
          {/* end of single form row */}
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
