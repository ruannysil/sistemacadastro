import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate} from "react-router-dom";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiPlusCircle } from "react-icons/fi";
import { ProfileStyle } from "../Profile/styles";
import { Form } from "../SignIn/styles";
import { AuthContext } from "../../contexts/auth";
import { db } from "../../services/firebaseConnection";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import "./styles.css";
import { toast } from "react-toastify";

const listRef = collection(db, "customers");

export default function New() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loadCustomer, setLoadCustomer] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0);

  const [complemento, setComplemento] = useState("");
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [idCustomer, setIdCustomer] = useState(false);

  useEffect(() => {
    async function loadCustomer() {
      await getDocs(listRef)
        .then((snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            });
          });

          if (snapshot.docs.size === 0) {
            console.log("Nenhuma empresa encontrada");
            setCustomers([{ id: "1", nomeFantasia: "FREELA" }]);
            setLoadCustomer(false);
            return;
          }

          setCustomers(lista);
          setLoadCustomer(false);

          if (id) {
            loadId(lista);
          }

          async function loadId(lista) {
            const docRef = doc(db, "called", id);
            await getDoc(docRef)
              .then((snapshot) => {
                setAssunto(snapshot.data().assunto);
                setStatus(snapshot.data().status);
                setComplemento(snapshot.data().complemento);

                let index = lista.findIndex(
                  (item) => item.id === snapshot.data().clienteId
                );
                setCustomerSelected(index);
                setIdCustomer(true);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log("Error ao buscar os clientes", error);
          setLoadCustomer(false);
          setCustomers([{ id: "1", nomeFantasia: "FREELA" }]);
        });
    }
    loadCustomer();
  }, [id]);

  function handleOptionChange(e) {
    setStatus(e.target.value);
    console.log(e.target.value);
  }

  function handleSelectChange(e) {
    setAssunto(e.target.value);
    console.log(e.target.value);
  }

  function handleCustomerChange(e) {
    setCustomerSelected(e.target.value);
    console.log(customers[e.target.value].nomeFantasia);
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (idCustomer) {
      //Atualizando o chamado
      const docRef = doc(db, "called", id);
      await updateDoc(docRef, {
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        complemento: complemento,
        status: status,
        userId: user.uid,
      })
      .then(() => {
        toast.info('Chamado atualizado com sucesso!')
        setCustomerSelected(0)
        setComplemento('')
        navigate('/dashboard')
      })
      .catch(() => {
        toast.error('Erro ao atualizar esse chamado')
      })
      return;
    }

    //REGISTRA CHAMADA
    await addDoc(collection(db, "called"), {
      created: new Date(),
      cliente: customers[customerSelected].nomeFantasia,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      complemento: complemento,
      status: status,
      userId: user.uid,
    })
      .then(() => {
        toast.success("Chamado registrado");
        setComplemento("");
        setCustomerSelected(0);
      })
      .catch((error) => {
        console.log("erro ao registara", error);
        toast.error("Ops erro ao registrar, tente mais tarde!");
      });
  }

  return (
    <ProfileStyle>
      <Header />

      <div className="content">
        <Title name={id ? "Editando Chamado" : "Novo chamado" }>
          <FiPlusCircle size={25} />
        </Title>
        <div className="container">
          <Form className="form" onSubmit={handleRegister}>
            <label>Clientes</label>
            {loadCustomer ? (
              <input
                type="text"
                disabled={true}
                value="Carregando..."
                style={{ maxWidth: 600 }}
              />
            ) : (
              <select value={customerSelected} onChange={handleCustomerChange}>
                {customers.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.nomeFantasia}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assunto</label>
            <select value={assunto} onChange={handleSelectChange}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Tecnica</option>
              <option value="Financeiro">Financeiro</option>:
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                nome="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />
              <span>Em aberto</span>
              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />
              <span>Progresso</span>
              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opcional)."
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />

            <button className="" type="submit">
              Registrar
            </button>
          </Form>
        </div>
      </div>
    </ProfileStyle>
  );
}
