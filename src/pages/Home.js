import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  return (
    <>
      <Wrapper className='page'>
        <div className='info'>
          <h2>
            <span>Auth</span>
            Work
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, qui
            et repellat animi odio cumque asperiores aliquam veritatis,
            cupiditate velit, in cum necessitatibus ipsum soluta.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            culpa quidem nihil placeat laboriosam quia quos et, ratione
            repudiandae ex, vel voluptatem quaerat reprehenderit!
          </p>

          <Link to='/login' className='btn'>
            Login
          </Link>
          <Link to='/register' className='btn'>
            Register
          </Link>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  h2 {
    font-weight: 700;
  }
  h2 span {
    color: var(--primary-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 6rem;
    .main-img {
      display: block;
    }
  }
  .btn {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
`;

export default Home;
