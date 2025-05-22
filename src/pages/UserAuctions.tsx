import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Auction {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function UserAuctions() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch("http://localhost:5085/api/auction/user"); // Asegúrate que esta ruta existe
        const data = await res.json();
        setAuctions(data);
      } catch (error) {
        console.error("Error al obtener subastas del usuario", error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-700">Mis Subastas</h2>
          <button
            onClick={() => navigate("/crear-subasta")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Crear Subasta
          </button>
        </div>

        {auctions.length === 0 ? (
          <p className="text-gray-600">Aún no has creado ninguna subasta.</p>
        ) : (
          <ul className="space-y-3">
            {auctions.map((auction) => (
              <li
                key={auction.id}
                className="p-4 bg-white rounded shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{auction.title}</h3>
                  <p className="text-sm text-gray-500">{auction.status}</p>
                </div>
                <button className="text-blue-600 hover:underline">
                  Ver Detalles
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
