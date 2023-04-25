import styled from "styled-components";

export const ProfileStyle = styled.div`
  .content {
    margin-left: 200px;
    padding: 1px 16px;

    @media (max-width: 700px) {
      margin-left: 0;
    }

    .container {
      display: flex;
      background-color: #f8f8f8;
      border-radius: 5px;
      padding: 0.8em;
      align-items: center;
      margin-bottom: 1em;

      .form-profile {
        margin-bottom: 1rem;
        font-size: 1.5rem;

        .label-avatar {
          width: 280px;
          height: 280px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          cursor: pointer;
          align-items: baseline;

          span {
            z-index: 99;
            position: absolute;
            opacity: 0.7;
            transition: all 0.5s;
            display: flex;
            margin: 0 0 0 4.5em;

            &:hover {
              opacity: 1;
              transform: scale(1.4);
            }
          }
          img {
            margin-bottom: 1em;
            border-radius: 25%;
            object-fit: cover;
          }

          input {
            display: none;
          }
        }
      }

      .form-profile input,
      textarea,
      select {
        margin-bottom: 1em;
        padding: 0.7em;
        border: 0;
        border-radius: 5px;
        max-width: 600px;
      }

      .form-profile input:disabled {
        cursor: not-allowed;
      }

      button {
        max-width: 600px;
      }
      .logout-btn {
        padding: 8px 20px;
        border: 0;
        background-color: rgb(24, 28, 46);
        color: #fff;
        border-radius: 5px;
        font-size: 1.5em;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background: #d41b1b;
          border: 0;
        }
      }
    }
  }
`;
