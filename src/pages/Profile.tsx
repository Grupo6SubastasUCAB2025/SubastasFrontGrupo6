import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  name: string;
  email: string;
  phone: string;
  cedula: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(decoded);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("https://localhost:7020/Auth/Logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
          userEmail: user?.email || "",
        }),
      });

      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      } else {
        const text = await res.text();
        console.error("Respuesta inesperada del logout:", text);
        alert("Error al cerrar sesión.");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("No se pudo cerrar sesión");
    }
  };

  if (!user) {
    return <div className="text-center mt-10">Cargando perfil...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Teléfono:</strong> {user.phone}</p>
        <p><strong>Cédula:</strong> {user.cedula}</p>

        <div className="flex flex-col items-center space-y-4 mt-4">
          <Link
            to="/profile/edit"
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

          {/* Botón de cerrar sesión */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
