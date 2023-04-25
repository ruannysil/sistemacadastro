import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Container, Form } from "../SignIn/styles";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { singUp, loadingAuth } = useContext(AuthContext);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (name !== "" && email !== "" && password !== "") {
      await singUp(email, password, name);
    }
  }

  return (
    <Container>
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
        </Form>
        <Link to="/">Já possui uma conta? Faça login</Link>
      </div>
    </Container>
  );
}
