import { useState } from "react";

interface AuctionForm {
  title: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  duration: number; // en horas
  participationRules: string;
  minBidIncrement: number;
  reservePrice: number;
  auctionType: string;
}

export default function CreateAuction() {
  const [form, setForm] = useState<AuctionForm>({
    title: "",
    description: "",
    imageUrl: "",
    basePrice: 0,
    duration: 24,
    participationRules: "",
    minBidIncrement: 1,
    reservePrice: 0,
    auctionType: "subasta_inglesa",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === "basePrice" || name === "duration" || name === "minBidIncrement" || name === "reservePrice"
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

        <input type="text" name="title" placeholder="Título" value={form.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        <input type="url" name="imageUrl" placeholder="URL de la Imagen" value={form.imageUrl} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="basePrice" placeholder="Precio Base" value={form.basePrice} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        <input type="number" name="duration" placeholder="Duración (horas)" value={form.duration} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        <textarea name="participationRules" placeholder="Condiciones de participación" value={form.participationRules} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />

        <input type="number" name="minBidIncrement" placeholder="Incremento mínimo de puja" value={form.minBidIncrement} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="reservePrice" placeholder="Precio de reserva" value={form.reservePrice} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />

        <select name="auctionType" value={form.auctionType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
          <option value="subasta_inglesa">Subasta Inglesa</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Crear Subasta</button>
      </form>
    </div>
  );
}
