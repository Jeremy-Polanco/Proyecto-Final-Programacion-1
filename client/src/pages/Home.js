import { Link } from 'react-router-dom';
import styled from 'styled-components';
import main from '../assets/main.svg';

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
            I'm baby next level fingerstache leggings, iceland slow-carb master
            cleanse flannel jianbing sartorial narwhal affogato kitsch.
            Flexitarian jean shorts shoreditch irony truffaut umami fam franzen
            kombucha drinking vinegar. Tumeric selvage salvia, banh mi lyft
            readymade enamel pin pour-over bitters poutine raw denim
            cold-pressed shoreditch.
          </p>
          <p>
            Green juice tilde prism, la croix paleo banh mi banjo cray. Tousled
            yuccie kitsch live-edge vice banjo. Cornhole tacos ugh art party
            vinyl.
          </p>

          <Link to='/login' className='btn'>
            Login
          </Link>
          <Link to='/register' className='btn'>
            Register
          </Link>
        </div>
        <img src={main} alt='main draw' className='img main-img' />
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
