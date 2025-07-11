import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  name: string;
  email: string;
  phone: string;
  cedula: string;
}

export default function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setForm({
        name: decoded.name || "",
        email: decoded.email || "",
        phone: decoded.phone || "",
      });
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", form);
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Editar Perfil</h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Guardar Cambios
        </button>

        <button
          type="button"
          onClick={() => navigate("/change-password")}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
}