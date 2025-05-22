import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/profile">Mi Perfil</Link></li>
        <li><Link to="/subastas">Subastas</Link></li>
      </ul>
    </nav>
  );
}
