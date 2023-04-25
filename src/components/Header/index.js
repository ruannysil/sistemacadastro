import { Link } from "react-router-dom";
import avatarImg from "../../assets/avatar.png";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import {FiHome, FiUser, FiSettings} from 'react-icons/fi'
import {Container, } from './styles'
import './style.css'

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <Container>
      <div className="sidebar">
        <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="Foto do usuario" />
      </div>
      <Link to="/dashboard">
        <FiHome color="#fff" size={24}/>
        Chamados
      </Link>
      <Link to="/customers">
        <FiUser color="#fff" size={24}/>
        Clientes
      </Link>
      <Link to="/profile">
        <FiSettings color="#fff" size={24}/>
        Perfil
      </Link>
    </Container>
  );
}
