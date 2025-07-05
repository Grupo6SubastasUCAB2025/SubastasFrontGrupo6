import { useState } from "react";

interface ProductForm {
  nombre: string;
  descripcion?: string;
  categoria?: string;
  precioBase: number;
  imagen: string;
  usuarioId: number;
}

export default function CreateProduct() {
  const [form, setForm] = useState<ProductForm>({
    nombre: "",
    descripcion: "",
    categoria: "",
    precioBase: 0,
    imagen: "",
    usuarioId: 1, // Aquí pon el ID real del usuario si lo tienes
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "precioBase" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: form }),
      });

      const data = await res.json();
      alert(data.message || "Producto registrado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al registrar el producto");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Registrar Producto</h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="number"
          name="precioBase"
          placeholder="Precio base"
          value={form.precioBase}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={form.imagen}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Registrar Producto
        </button>
      </form>
    </div>
  );
}
