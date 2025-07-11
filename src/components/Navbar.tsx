import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex space-x-4">
        {!isLoggedIn && <li><Link to="/">Inicio</Link></li>}
        <li><Link to="/subastas">Subastas</Link></li>
        {isLoggedIn && <li><Link to="/profile">Mi Perfil</Link></li>}
      </ul>
    </nav>
  );
}
