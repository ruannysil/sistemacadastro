import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  margin: 0;
  padding: 0;
  background-color: #181c2e;
  position: fixed;
  height: 100%;
  overflow: auto;

  a {
    display: block;
    padding: 16px;
    display: flex;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);
    flex-direction: row;
    align-items: center;
    transition: ease-in-out 0.4s;

    &:hover {
      background-color: #121212;
      color: #fff;
    }

    svg {
      margin-right: 0.5rem;
    }
  }

  .content {
    margin-left: 200px;
    padding: 1px 16px;
  }

  @media (max-width: 700px) {
    width: 100%;
    height: auto;
    position: relative;

    .sidebar, svg {
      margin-left: 0;
      display: none;
    }

    a {
      float: left;
    }
  }

  @media (max-width: 400px) {
    a {
      text-align: center;
      float: none;
    }

    
  }
`;
