import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Asegúrate de importar Link

interface LoginData {
  userEmail: string;
  password: string;
}

export default function Login() {
  const [form, setForm] = useState<LoginData>({ userEmail: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://localhost:7020/Auth/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch (jsonError) {
        console.error("Error al parsear JSON:", jsonError);
      }

      if (res.ok && data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        alert("Inicio de sesión exitoso");
        navigate("/profile");
      } else {
        alert(data?.message || `Error al iniciar sesión: ${res.status}`);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Iniciar Sesión</h2>
        <input
          type="email"
          name="userEmail"
          placeholder="Correo"
          value={form.userEmail}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Iniciar Sesión
        </button>

        {/* Enlace de recuperación de contraseña */}
        <div className="text-right mt-2">
          <Link
            to="/recuperar-contrasena"
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
}
