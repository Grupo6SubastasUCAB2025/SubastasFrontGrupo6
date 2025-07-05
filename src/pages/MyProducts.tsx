import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  categoria?: string;
  precioBase: number;
  imagen: string;
  usuarioId: number;
}

export default function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products?usuarioId=1");
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          userId: "1", // Reemplazar con ID de usuario real
        },
      });

      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
        alert("Producto eliminado correctamente");
      } else {
        throw new Error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Hubo un problema al eliminar el producto");
    }
  };

  const handleEdit = (productId: number) => {
    navigate(`/productos/editar/${productId}`);
  };

  const handleCreate = () => {
    navigate("/productos/crear");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mis Productos Registrados</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Crear Nuevo Producto
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600 mb-4">No tienes productos registrados.</p>
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Crear tu primer producto
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.imagen} 
                  alt={product.nombre} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300';
                  }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{product.nombre}</h2>
                {product.categoria && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                    {product.categoria}
                  </span>
                )}
                <p className="text-gray-700 font-bold text-lg mb-3">${product.precioBase.toFixed(2)}</p>
                {product.descripcion && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.descripcion}</p>
                )}
                <div className="flex justify-between border-t pt-3">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}