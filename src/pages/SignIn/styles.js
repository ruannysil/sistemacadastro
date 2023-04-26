import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #121212;
  padding: 0 12px;

  .login {
    background-color: #eaeaea;
    width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .login-area {
      background-color: #2b013f;
      width: 100%;
      display: flex;
      justify-content: center;

      img {

        width: 252px;
        height: 171px;
        padding: 20px;
      }
    }
  }

  a {
    margin: 1.5rem 0;
    color: #000;
    cursor: pointer;

    &:hover {
      color: #2b2222;
      font-weight: 600;
      transform: scale(0.91);
    }
  }
`;

export const Form = styled.form`
  margin-top: 1.5rem;
  width: 90%;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    margin-bottom: 1rem;
    color: #181c2e;
  }

  input {
    margin-bottom: 1rem;
    height: 35px;
    border-radius: 4px;
    border: 0;
    padding: 10px;
    font-size: 15px;
    background-color: #fff;
  }

  .status {
    display: block;

    input {
      margin-top: 2em;
      margin-bottom: 2em;
      height: 100%;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    position: relative;

    svg {
      color: #000;
      position: absolute;
      top: 23%;
      right: 0.9em;
      cursor: pointer;
    }
  }

  button {
    height: 35px;
    border: 0;
    border-radius: 4px;
    background-color: #181c2e;
    color: #fff;

    &:hover {
      background-color: #202a57;
    }
  }

  @media (max-width: 375px) {
    /* width: 100%; */

    /* div {
      svg {
        left: 90%;
      }
    } */

    .status {
      display: block;
      margin: 2em 0;

      input {
        margin: 0;
      }
      span {
        font-size: 1.2em;
      }
    }
  }
`;
