import { useContext, useState } from "react";
import logo from "../../assets/logoImg.gif";
import { Link } from "react-router-dom";
import { Container, Form } from "./styles";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../contexts/auth";
import {BiLoaderCircle} from 'react-icons/bi'

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const { signIn, loadingAuth } = useContext(AuthContext);


  async function handleSignIn(e) {
    e.preventDefault();
    if (email !== "" && password !== "") {
      await signIn(email, password);
    }
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <Container>
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo do sistema  de chamados" />
        </div>

        <Form onSubmit={handleSignIn}>
          <h1>Entrar</h1>
          <input
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEye onClick={togglePassword} />
            ) : (
              <FaRegEyeSlash onClick={togglePassword} />
            )}
          </div>

          <button type="submit">
            {loadingAuth ? (
              <>
                Carregando... <BiLoaderCircle className="circle" color="#fff" />
              </>
            ) : (
              "Acessar"
            )}
          </button>
        </Form>

        <Link to="/register">Criar uma conta</Link>
      </div>
    </Container>
  );
}
