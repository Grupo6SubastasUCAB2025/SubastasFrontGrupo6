import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function Profile() {
  const user = {
    name: "Juan Pérez",
    username: "juan123",
    email: "juan@example.com",
    phone: "123456789",
    address: "Calle Falsa 123",
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Teléfono:</strong> {user.phone}</p>
        <p><strong>Dirección:</strong> {user.address}</p>

        <div className="flex flex-col items-center space-y-4 mt-4">
            <Link
                to="/edit-profile"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
                Editar Perfil
            </Link>

            <Link
                to="/activity"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Ver Historial de Actividad
            </Link>
            <button
                onClick={() => navigate("/mis-subastas")}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
                Mis Subastas
            </button>
        </div>
      </div>
    </div>
  );
}
