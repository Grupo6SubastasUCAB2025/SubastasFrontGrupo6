import { useState } from "react";

interface FormData {
  name: string;
  userEmail: string;  
  password: string;
  phone: string;
  cedula: string;
  nameRole: string;   
}

export default function Register() {
  const [form, setForm] = useState<FormData>({
    name: "",
    userEmail: "", 
    password: "",
    phone: "",
    cedula: "",
    nameRole: "Bidder", 
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJab3loMDRBRWswZm81X041UnlxeDgtT1gzdzJLdzh0RGNrSVB5TWh1ZzFRIn0.eyJleHAiOjE3NTIyMDEzMDcsImlhdCI6MTc1MjIwMTAwNywianRpIjoiMTE5MTQwMzAtM2YwOC00Mzg3LTkyNDQtMjFjMzZlYTU1YjY0IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9TdWJhc3Rhc1VDQUIiLCJhdWQiOlsiQ2xpZW50U3ViYXN0YXNVQ0FCIiwicmVhbG0tbWFuYWdlbWVudCJdLCJzdWIiOiI0NmUyZDQ0Ny02ZDU1LTQ5ZDMtOGJjZS05NzI4ZmNiYjA5NTQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJDbGllbnRTdWJhc3Rhc1VDQUIiLCJzaWQiOiJjNjRhMzZlZC1lOTVlLTRkMTMtODc3ZC02NDM0NWUyYzAyZGQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NTE3MyJdLCJyZXNvdXJjZV9hY2Nlc3MiOnsiQ2xpZW50U3ViYXN0YXNVQ0FCIjp7InJvbGVzIjpbIkFkbWluaXN0cmF0b3IiXX0sInJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJ2aWV3LXJlYWxtIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyb2xlIjoiQWRtaW5pc3RyYXRvciIsInBob25lIjoiMDQxNDEyMzQ1NjciLCJjZWR1bGEiOiIxMjM0NTY3OCIsIm5hbWUiOiJBZG1pbiBVc2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcklkIjoiM2ZhODVmNjQtNTcxNy00NTYyLWIzZmMtMmM5NjNmNjZhZmE2IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.zQ30tvwgO5alZGMAjatzE1QJ7C7CYOX_FwW26b1T7IWyQ7KxI2HYGPaEXLKzDUKHkYKXEDsjeeH6ZdAUDoCDJUXOIiGn3RNMnDnheF3jtxaJDWeC1ImHH3jz622jNiY9ENgzbJjQRtIIrTd2hgqU6RsFm3eHiLRI1Pfx6hAI2qLX-NpEVl57Dg6E-Dj3toE1YgxuJRjz46MC46ueakM0umE1eCq018w92e9rqEqdTfMwAfIogyS0V7A1L1HeHKN2TSP4epjaN2nU2R5ZFxYpRVNxVcNhcEQCzOlLAUkDntp5SW1d0BANXTiju-cpjmcKCAKNDtjLisT7m__b3hEWtw";


    try {
    const res = await fetch("https://localhost:7020/Auth/CreateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(form),
    });

    const text = await res.text(); 

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Respuesta no es JSON:", text);
      alert("Error del servidor: " + text);
      return;
    }

    if (res.ok && data.success) {
      alert("Usuario creado exitosamente");
      window.location.href = "/login";
    } else {
      alert(data?.message || "Error al registrar usuario");
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    alert("Error al conectar con el servidor");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Registro
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="email"
          name="userEmail"
          placeholder="Correo electrónico"
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

        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={form.cedula}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <select
          name="nameRole"   // Cambiado
          value={form.nameRole}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="Bidder">Postor</option>
          <option value="Auctioneer">Subastador</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
