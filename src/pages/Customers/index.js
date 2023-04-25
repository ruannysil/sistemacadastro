import "./style.css";
import { FiUser } from "react-icons/fi";
import { ProfileStyle } from "../Profile/styles";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { Form } from "../SignIn/styles";
import { useState } from "react";
import { db } from "../../services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Customer() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    if (nome !== "" && cnpj !== "" && endereco !== "") {
      await addDoc(collection(db, "customers"), {
        nomeFantasia: nome,
        cnpj: cnpj,
        endereco: endereco,
      })
      .then(() => {
        setNome('');
      setCnpj('');
      setEndereco('');
      toast.success("Empresa registrada com sucesso!")
      })
      .catch((error) => {
        console.log(error)
        toast.error('Erro ao fazer cadastro.')
      })
    } else {
      toast.error('Preencha todos os campos!')
    }
  }
  return (
    <ProfileStyle>
      <Header />
      <div className="content">
        <Title name="Cliente">
          <FiUser size={25} />
        </Title>
        <div className="container">
          <Form className="form" onSubmit={handleRegister}>
            <label>Nome fantasia</label>
            <input
              type="text"
              value={nome}
              placeholder="Nome da empresa"
              onChange={(e) => setNome(e.target.value)}
            />
            <label>CNPJ</label>
            <input
              type="text"
              value={cnpj}
              placeholder="Digite o CNPJ"
              onChange={(e) => setCnpj(e.target.value)}
            />
            <label>Endereço</label>
            <input
              type="text"
              value={endereco}
              placeholder="Endereço da empresa"
              onChange={(e) => setEndereco(e.target.value)}
            />
            <button type="submit" className="btn">
              Salvar
            </button>
          </Form>
        </div>
      </div>
    </ProfileStyle>
  );
}
