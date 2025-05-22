import { useEffect, useState } from "react";

interface Auction {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl?: string;
  endsAt: string;
}

export default function AuctionsList() {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch("http://localhost:5085/api/auction/active");
        const data = await res.json();
        setAuctions(data);
      } catch (err) {
        console.error("Error al obtener subastas activas", err);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Subastas Activas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <div key={auction.id} className="bg-white rounded shadow p-4">
            {auction.imageUrl && (
              <img src={auction.imageUrl} alt={auction.name} className="w-full h-40 object-cover rounded mb-4" />
            )}
            <h2 className="text-xl font-semibold">{auction.name}</h2>
            <p className="text-sm text-gray-600">{auction.description}</p>
            <p className="mt-2 font-medium">Precio base: ${auction.basePrice}</p>
            <p className="text-sm text-gray-500">Finaliza: {new Date(auction.endsAt).toLocaleString()}</p>
            <button className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Ver Detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
