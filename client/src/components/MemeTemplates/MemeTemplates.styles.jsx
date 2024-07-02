import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto 3rem;
  padding: 2rem 10rem 3rem 10rem;
  background-color: black;

  @media screen and (max-width: 768px) {
    padding: 2rem;
  }
  h1 {
    text-align: center;
    color: var(--white);
    font-weight: 800;
    margin-bottom: 2rem;
    font-size: 30px;
  }

  @media screen and (max-width: 700px) {
    h1 {
      font-size: 25px;
    }
  }

  @media screen and (max-width: 600px) {
    h1 {
      font-size: 18px;
    }
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 4rem;
`;

export const Template = styled.div`
  a {
    text-decoration: none;
  }

  .imgWrapper {
    overflow: hidden;
    object-fit: cover;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    img {
      width: 250px;
      height: 250px;
      object-fit: cover;
      transition: all 0.15s ease-in-out;
    }
  }
 img:hover {
        cursor: pointer;
    transform: scale(1.05)
    }
  }
  .memeName {
    width: 100%;
    height: 100%;
    max-height: 25px;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    h4 {
      font-size: 15px;
      color: var(--white);
      font-weight: 700;
      text-align: center;
    }
  }
`;
