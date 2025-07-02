import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBidSocket } from "../hooks/useBidSocket";

interface Product {
  name: string;
  description: string;
  imageUrl: string;
}

interface Auction {
  auctionId: number;
  title: string;
  initialPrice: number;
  minIncrement: number;
  reservePrice?: number;
  startDate: string;
  endDate: string;
  status: string;
  conditions?: string;
  type: string;
  product: Product;
}

export default function AuctionDetail() {
  const { id } = useParams();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [bids, setBids] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [bidAmount, setBidAmount] = useState<number>(0);

  // Escuchar WebSocket
  useBidSocket(Number(id), (bidData) => {
    setBids((prev) => [...prev, bidData]);
    setCurrentPrice(bidData.amount);
  });

  useEffect(() => {
    fetch(`http://localhost:5201/api/auctions/${id}`)
      .then(res => res.json())
      .then(data => {
        setAuction(data);
        setCurrentPrice(data.initialPrice); // Inicializar con precio inicial
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar subasta:", err);
        setLoading(false);
      });
  }, [id]);

  const sendBid = async () => {
    await fetch("http://localhost:5201/api/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        userId: "1", // temporalmente
      },
      body: JSON.stringify({
        auctionId: Number(id),
        amount: bidAmount,
      }),
    });
    setBidAmount(0);
  };

  if (loading) return <p>Cargando subasta...</p>;
  if (!auction) return <p>No se encontró la subasta.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-2">{auction.title}</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {auction.product?.imageUrl && (
          <img
            src={auction.product.imageUrl}
            alt={auction.product.name}
            className="w-full md:w-1/2 rounded object-cover"
          />
        )}
        <div className="flex-1">
          <h2 className="text-xl font-semibold">🎁 {auction.product.name}</h2>
          <p className="text-gray-700">{auction.product.description}</p>
        </div>
      </div>

      <div className="space-y-2 text-gray-800">
        <p><strong>💰 Precio inicial:</strong> ${auction.initialPrice}</p>
        <p><strong>➕ Incremento mínimo:</strong> ${auction.minIncrement}</p>
        {auction.reservePrice && (
          <p><strong>🔐 Precio de reserva:</strong> ${auction.reservePrice}</p>
        )}
        <p><strong>📅 Fecha de inicio:</strong> {new Date(auction.startDate).toLocaleString()}</p>
        <p><strong>⏳ Fecha de cierre:</strong> {new Date(auction.endDate).toLocaleString()}</p>
        <p><strong>⚙️ Tipo:</strong> {auction.type}</p>
        <p><strong>📌 Estado:</strong> {auction.status}</p>
        {auction.conditions && (
          <p><strong>📜 Condiciones:</strong> {auction.conditions}</p>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <p className="text-xl font-bold text-green-600">💵 Precio actual: ${currentPrice || auction.initialPrice}</p>

        <div>
          <h3 className="font-semibold">📈 Historial de pujas:</h3>
          {bids.length === 0 ? (
            <p className="text-gray-500">No hay pujas aún.</p>
          ) : (
            <ul className="list-disc pl-5">
              {bids.map((bid, index) => (
                <li key={index}>
                  <span className="font-bold">${bid.amount}</span> — Usuario #{bid.userId}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">📤 Hacer una nueva puja</h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              placeholder="Monto a pujar"
              className="border px-2 py-1 rounded w-40"
            />
            <button
              onClick={sendBid}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
            >
              Pujar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}