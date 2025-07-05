import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface ProductForm {
  nombre: string;
  descripcion?: string;
  categoria?: string;
  precioBase: number;
  imagen: string;
  usuarioId: number;
}

export default function EditProduct() {
  const { id } = useParams(); // id del producto
  const navigate = useNavigate();
  const [form, setForm] = useState<ProductForm | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Error al cargar producto");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (!form) return;
    setForm(prev => ({
      ...prev!,
      [name]: name === "precioBase" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    try {
      const res = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: form // Envuelve el form en un objeto "product"
        }),
      });

      if (res.ok) {
        alert("Producto actualizado correctamente");
        navigate("/productos"); // redirige a la lista
      } else {
        const errorData = await res.json();
        alert(errorData.message || "No se pudo actualizar el producto");
      }
    } catch {
      alert("Error de red al actualizar producto");
    }
  };

  if (loading || !form) return <p className="text-center">Cargando producto...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Editar Producto</h2>

        <input name="nombre" value={form.nombre} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" placeholder="Nombre" />
        
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Descripción" />

        <input name="categoria" value={form.categoria} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Categoría" />

        <input name="precioBase" type="number" value={form.precioBase} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Precio base" />

        <input name="imagen" value={form.imagen} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="URL de imagen" />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Guardar Cambios</button>
      </form>
    </div>
  );
}