import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded: any = JSON.parse(
        atob(token.split(".")[1])
      );
      const userEmail = decoded.email;

      const res = await fetch("https://localhost:7020/Auth/ChangePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userEmail,
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });

      if (res.ok) {
        alert("Contraseña actualizada con éxito");
        navigate("/profile");
      } else {
        const errorText = await res.text();
        setError(errorText || "Error al cambiar la contraseña.");
      }
    } catch (err) {
      console.error("Error en el cambio de contraseña:", err);
      setError("Ocurrió un error al procesar tu solicitud.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Cambiar Contraseña</h2>

        <input
          type="password"
          name="currentPassword"
          placeholder="Contraseña Actual"
          value={form.currentPassword}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="Nueva Contraseña"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Guardar Contraseña
        </button>

        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="w-full bg-gray-300 text-black p-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
