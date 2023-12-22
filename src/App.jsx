import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from "./context/AuthContext"
import ProfilePage from "./pages/ProfilePage"
import ProtectedRoute from './ProtectedRoute'
export default function App() {
  return (
<AuthProvider>

   <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Pagina de Inicio</h1>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>


      <Route element={<ProtectedRoute/>}>
      <Route path="/messages" element={<h1>Mensajes</h1>}/>
      <Route path="/sendMessages" element={<h1>Enviar Mensaje</h1>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      </Route>
    </Routes>
   </BrowserRouter> 
</AuthProvider>
  )
}
