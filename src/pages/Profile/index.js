import { FiSettings, FiUpload } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { ProfileStyle } from "./styles";
import { Form } from "../SignIn/styles";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../services/firebaseConnection";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const { user, setUser, storageUser, logout } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);
  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        toast.warning("Envie uma imagem do tipo PNG ou JPG");
        setImageAvatar(null);
        return;
      }
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;

    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);

    try {
      const snapshot = await uploadBytes(uploadRef, imageAvatar);
      const dowloadUrl = await getDownloadURL(snapshot.ref);
      const urlFoto = dowloadUrl;

      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        avatarUrl: urlFoto,
        nome: nome,
      });

      let data = {
        ...user,
        nome: nome,
        avatarUrl: urlFoto,
      };

      setUser(data);
      storageUser(data);
      toast.success("Atualizado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar a foto de perfil");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // atualiza apenas o nome do usser
    if (imageAvatar === null && nome === "") {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        nome: nome,
      }).then(() => {
        let data = {
          ...user,
          nome: nome,
        };

        setUser(data);
        storageUser(data);
        toast.success("Atualizado com sucesso");
      });
    } else if (nome !== "" && imageAvatar !== null) {
      //Atualizou tanto a foto como nome
      handleUpload();
    }
  }

  return (
    <ProfileStyle>
      <Header />
      <div className="content">
        <Title name="Minha conta">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <Form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/" onChange={handleFile} /> <br />
              {avatarUrl === null ? (
                <img
                  src={avatar}
                  alt="Foto de perfil"
                  width={250}
                  height={250}
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Foto de perfil"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <label>Nome</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              disabled={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Salvar</button>
          </Form>
        </div>
        <div className="container">
          <button className="logout-btn" onClick={() => logout()}>
            Sair
          </button>
        </div>
      </div>
    </ProfileStyle>
  );
}
