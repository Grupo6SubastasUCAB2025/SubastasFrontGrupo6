import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecoverPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    try {
      const res = await fetch("https://localhost:7020/Auth/RecoverPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: email }),
      });

      if (res.ok) {
        alert("Se ha enviado un correo para recuperar la contraseña.");
        navigate("/login");
      } else {
        const errorText = await res.text();
        alert("Error al recuperar la contraseña: " + errorText);
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Recuperar Contraseña
        </h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Enviar enlace de recuperación
        </button>
      </form>
    </div>
  );
}
