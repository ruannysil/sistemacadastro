import { BrowserRouter } from "react-router-dom";
import RouterApp from "./routes";
import AuthProvider from "./contexts/auth";
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000} />
        <RouterApp />
      </AuthProvider>
    </BrowserRouter>
  );
}
