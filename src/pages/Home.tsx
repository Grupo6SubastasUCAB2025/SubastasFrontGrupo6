import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Sistema de Subastas</h1>
        <div className="space-y-3">
          <Link
            to="/register"
            className="block w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Registro de Usuario
          </Link>
          <Link
            to="/login"
            className="block w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
          >
            Iniciar Sesión
          </Link>

          
          {/* Más botones a medida que creamos funcionalidades */}
        </div>
      </div>
    </div>
  );
}
