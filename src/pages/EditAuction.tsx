import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface AuctionData {
  name: string;
  description: string;
  image: string;
  basePrice: number;
  duration: number;
  participationRules: string;
  minBidIncrement: number;
  reservePrice: number;
  auctionType: string;
}

export default function EditAuction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState<AuctionData | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5085/api/auctions/${id}`)
      .then(res => res.json())
      .then(data => setAuction(data))
      .catch(() => alert("No se pudo cargar la subasta"));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!auction) return;
    setAuction({ ...auction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5085/api/auctions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auction),
      });

      if (res.ok) {
        alert("Subasta actualizada con éxito");
        navigate("/mis-subastas");
      } else {
        alert("Error al actualizar la subasta");
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  if (!auction) return <div className="p-4">Cargando subasta...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Editar Subasta</h2>
        <input type="text" name="name" value={auction.name} onChange={handleChange} placeholder="Nombre" className="w-full p-2 border border-gray-300 rounded" />
        <textarea name="description" value={auction.description} onChange={handleChange} placeholder="Descripción" className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" name="image" value={auction.image} onChange={handleChange} placeholder="URL de Imagen" className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="basePrice" value={auction.basePrice} onChange={handleChange} placeholder="Precio base" className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="duration" value={auction.duration} onChange={handleChange} placeholder="Duración (en horas)" className="w-full p-2 border border-gray-300 rounded" />
        <textarea name="participationRules" value={auction.participationRules} onChange={handleChange} placeholder="Condiciones de participación" className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="minBidIncrement" value={auction.minBidIncrement} onChange={handleChange} placeholder="Incremento mínimo" className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="reservePrice" value={auction.reservePrice} onChange={handleChange} placeholder="Precio de reserva" className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" name="auctionType" value={auction.auctionType} onChange={handleChange} placeholder="Tipo de subasta" className="w-full p-2 border border-gray-300 rounded" />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition">Guardar Cambios</button>
      </form>
    </div>
  );
}
