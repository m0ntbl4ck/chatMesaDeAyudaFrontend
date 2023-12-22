import { useForm } from 'react-hook-form'; // Importa el hook useForm para manejar los formularios
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación

function ProfilePage() {
  const { user, logout } = useAuth(); // Obtiene el usuario y la función de cierre de sesión del contexto
  const { handleSubmit } = useForm(); // Utiliza el hook useForm para manejar el envío del formulario

  // Datos de ejemplo para contactos y mensajes
  const contacts = ["Contacto 1", "Contacto 2", "Contacto 3"];
  const messages = ["Mensaje 1", "Mensaje 2", "Mensaje 3"];

  // Función que maneja el envío del formulario al hacer logout
  const onSubmit = handleSubmit(() => {
    logout(); // Llama a la función de cierre de sesión del contexto
  });

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Barra de navegación */}
      <div className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">Mensajería</h1>
          <button onClick={onSubmit} className="text-blue-500 hover:underline cursor-pointer">
            Cerrar Sesión
          </button>
        </div>
        {user && (
          <div className="text-sm text-gray-600 mt-4 border-t pt-4">
            <p>
              <span className="font-bold">Usuario:</span> {user.username}
            </p>
            <p>
              <span className="font-bold">Email:</span> {user.email}
            </p>
          </div>
        )}
      </div>

      {/* Sección de contactos y mensajes */}
      <div className="flex flex-grow">
        {/* Sección de contactos */}
        <div className="w-1/4 bg-white shadow-md rounded-md m-4 p-4">
          <h2 className="text-lg font-bold mb-4">Contactos</h2>
          <ul>
            {contacts.map((contact, index) => (
              <li key={index} className="border-b py-2 hover:bg-gray-200 cursor-pointer">
                {contact}
              </li>
            ))}
          </ul>
        </div>

        {/* Sección de mensajes */}
        <div className="w-3/4 bg-white shadow-md rounded-md m-4 p-4">
          <h2 className="text-lg font-bold mb-4">Mensajes</h2>
          <div>
            {messages.map((message, index) => (
              <div key={index} className="border-b py-2">
                {message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
