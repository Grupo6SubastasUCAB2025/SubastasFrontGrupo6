import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("http://localhost:8080/api/products?usuarioId=1") // Cambia al ID real del usuario autenticado
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
  const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
  if (!confirmed) return;

  try {
    const response = await fetch(`http://localhost:5201/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        userId: "1", // o el usuario actual
      },
    });

    if (response.ok) {
      alert("Producto eliminado correctamente");
      setProducts((prev) => prev.filter((p) => p.id !== id)); // Actualiza la lista
    } else {
      alert("Error al eliminar el producto");
    }
  } catch (error) {
    console.error("Error al eliminar:", error);
    alert("Hubo un problema al eliminar el producto");
  }
};


  if (loading) return <p className="text-center">Cargando productos...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Mis Productos Registrados</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No tienes productos registrados.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow rounded p-4">
              <img src={product.imagen} alt={product.nombre} className="w-full h-40 object-cover rounded mb-2" />
              <h2 className="text-xl font-semibold">{product.nombre}</h2>
              <p className="text-gray-500">{product.categoria}</p>
              <p className="text-gray-700 font-bold mt-1">💰 ${product.precioBase}</p>
              <div className="flex justify-between mt-3">
                <button className="text-blue-600 hover:underline text-sm">Editar</button>
                <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline ml-2"
                >
                    Eliminar
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
