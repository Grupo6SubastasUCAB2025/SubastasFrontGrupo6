import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Auction {
  auctionId: number;
  title: string;
  description?: string;
  initialPrice: number;
  endDate: string;
  imageUrl?: string;
}

export default function AuctionList() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5201/api/auctions") // Ajusta la URL según tu API Gateway
      .then(res => res.json())
      .then(data => {
        setAuctions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar subastas:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando subastas...</p>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {auctions.map((auction) => (
        <div key={auction.auctionId} className="border p-4 rounded shadow-md bg-white">
          {auction.imageUrl && (
            <img src={auction.imageUrl} alt={auction.title} className="w-full h-40 object-cover mb-2 rounded" />
          )}
          <h2 className="text-xl font-semibold">{auction.title}</h2>
          <p className="text-sm text-gray-600 mb-2">{auction.description?.slice(0, 100)}...</p>
          <p className="text-green-600 font-bold">💰 {auction.initialPrice.toFixed(2)} USD</p>
          <p className="text-sm text-gray-500">⏳ Finaliza: {new Date(auction.endDate).toLocaleString()}</p>
          <Link to={`/auctions/${auction.auctionId}`} className="block mt-2 text-blue-600 hover:underline">
            Ver detalles →
          </Link>
        </div>
      ))}
    </div>
  );
}
