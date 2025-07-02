import { useState } from "react";

interface AuctionForm {
  productId: string;
  title: string;
  description: string;
  basePrice: number;
  minBidIncrement: number;
  reservePrice: number;
  startDate: string;
  endDate: string;
  participationRules: string;
}

export default function CreateAuction() {
  const [form, setForm] = useState<AuctionForm>({
    productId: "",
    title: "",
    description: "",
    basePrice: 0,
    minBidIncrement: 1,
    reservePrice: 0,
    startDate: "",
    endDate: "",
    participationRules: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === "basePrice" || name === "minBidIncrement" || name === "reservePrice"
        ? parseFloat(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5085/api/auction/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message || "Subasta creada exitosamente");
    } catch (error) {
      alert("Error al crear la subasta");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Crear Subasta</h2>

        {/* Selección de producto */}
        <select name="productId" value={form.productId} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded">
          <option value="">Selecciona un producto</option>
          {/* Opciones reales vendrán de tu backend */}
          <option value="1">Producto 1</option>
          <option value="2">Producto 2</option>
        </select>

        <button type="button" className="text-blue-600 hover:underline text-sm">Registrar nuevo producto</button>

        <input type="text" name="title" placeholder="Título" value={form.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        
        <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />

        <input type="number" name="basePrice" placeholder="Precio Base" value={form.basePrice} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />

        <input type="number" name="minBidIncrement" placeholder="Incremento mínimo de puja" value={form.minBidIncrement} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />

        <input type="number" name="reservePrice" placeholder="Precio de reserva" value={form.reservePrice} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />

        {/* Fecha y hora */}
        <label className="block text-sm font-medium text-gray-600">Fecha y hora de inicio</label>
        <input type="datetime-local" name="startDate" value={form.startDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />

        <label className="block text-sm font-medium text-gray-600">Fecha y hora de fin</label>
        <input type="datetime-local" name="endDate" value={form.endDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />

        <textarea name="participationRules" placeholder="Condiciones de participación" value={form.participationRules} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Crear Subasta</button>
      </form>
    </div>
  );
}