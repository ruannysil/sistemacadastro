// import { AuthContext } from "../../contexts/auth";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { ProfileStyle } from "../Profile/styles";
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import {AiFillDelete} from 'react-icons/ai'
import { BiLoaderCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./styles.css";
import {
  collection,
  deleteDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  doc
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { format } from "date-fns";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const listRef = collection(db, "called");

export default function Dashboard() {
  // const { logout } = useContext(AuthContext);

  const [calleds, setCalleds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastDocs, setLastDocs] = useState();
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    async function loadChamados() {
      const q = query(listRef, orderBy("created", "desc"), limit(5));

      const querySnapshot = await getDocs(q);
      setCalleds([]);
      await updateState(querySnapshot);

      setLoading(false);
    }
    loadChamados();

    return () => {};
  }, []);

  async function updateState(querySnapshot) {
    const isCollectionEmpty = querySnapshot.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), "dd/MM/yyyy"),
          status: doc.data().status,
          complemento: doc.data().complemento,
        });
      });

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setCalleds((calleds) => [...calleds, ...lista]);
      setLastDocs(lastDoc);
    } else {
      setIsEmpty(true);
    }
    setLoadingMore(false);
  }

  async function handleMore() {
    setLoadingMore(true);

    const q = query(
      listRef,
      orderBy("created", "desc"),
      startAfter(lastDocs),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    await updateState(querySnapshot);
  }

  function toggleModal(item) {
    setShowPostModal(!showPostModal)
    setDetail(item)
  }

  async function deleteItem(item) {
   try {
    setCalleds(calleds.filter(called => called.id !== item.id));
    await deleteDoc(doc(db, "called", item.id));
    toast.success('chamado excluido com sucesso!')
   } catch(error) {
    console.error('Erro ao deletar item:', error)
    toast.error('Error ao excluir o chamado. Tente novamente mais tarde')
   }
  } 

  if (loading) {
    return (
      <ProfileStyle>
        <Header />

        <div className="content">
          <Title name="tickets">
            <FiMessageSquare size={25} />
          </Title>

          <div className="container dashboard">
            <span>
              Buscando chamados... <BiLoaderCircle className="circle" />
            </span>
          </div>
        </div>
      </ProfileStyle>
    );
  }

  return (
    <ProfileStyle>
      <Header />

      <div className="content">
        <Title name="tickets">
          <FiMessageSquare size={25} />
        </Title>

        {calleds.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado encontrado...</span>
            <Link to="/new" className="new">
              <FiPlus color="#fff" size={25} />
              Novo chamado
            </Link>
          </div>
        ) : (
          <>
            <Link to="/new" className="new">
              <FiPlus color="#fff" size={25} />
              Novo chamado
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrando em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {calleds.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Client">{item.cliente}</td>
                      <td data-label="Assunto">{item.assunto}</td>
                      <td data-label="Status">
                        <span
                          className="badge"
                          style={{
                            backgroundColor:
                              item.status === "Aberto"
                                ? "#5cb85c"
                                : item.status === "Progresso"
                                ? "#3583f5"
                                : "#999",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td data-label="Cadastrado">{item.createdFormat}</td>
                      <td data-label="#" className="icons">
                        <button
                        onClick={() => toggleModal(item)}
                          className="action"
                          style={{ background: "#3583f6" }}
                        >
                          <FiSearch color="#fff" size={17} />
                        </button>
                        <Link
                          to={`/new/${item.id}`}
                          className="action"
                          style={{ background: "#f6a935" }}
                        >
                          <FiEdit2 color="#fff" size={17} />
                        </Link>
                        <button
                        onClick={() => deleteItem(item)}
                          className="action"
                          style={{ background: "#f64235" }}
                        >
                          <AiFillDelete color="#fff" size={17} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {loadingMore && <h3>Buscando mais chamados...</h3>}
            {!loadingMore && !isEmpty && (
              <button className="btn-more" type="submit" onClick={handleMore}>
                Buscar mais
              </button>
            )}
          </>
        )}
      </div>
     {showPostModal && (
       <Modal 
       conteudo={detail}
       close={() => setShowPostModal(!showPostModal)} />
     )}
    </ProfileStyle>
  );
}
