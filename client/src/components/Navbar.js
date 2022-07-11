import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
const Navbar = () => {
  return (
    <Wrapper>
      <div className='nav-center'>
        <Link to='/' className='home-link'>
          <img src={logo} alt='auth work' />
        </Link>

        {/* <div className='nav-links'>
          <p>hello, "user"</p>
          <button
            className='btn btn-small'
            onClick={() => {
              // logoutUser();
            }}
          >
            logout
          </button>
        </div> */}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  background: var(--primary-100);
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: var(--fluid-width);
    max-width: var(--max-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
  }
  .nav-links p {
    margin: 0;
    text-transform: capitalize;
    margin-bottom: 0.25rem;
  }
  .home-link {
    display: flex;
    align-items: flex-end;
  }
  h2 {
    font-weight: 700;
    color: var(--black);
  }
  h2 span {
    color: var(--primary-600);
  }
  @media (min-width: 776px) {
    .nav-links {
      flex-direction: row;
      align-items: center;
    }
    .nav-links p {
      margin: 0;
      margin-right: 1.5rem;
    }
  } ;
`;

export default Navbar;
