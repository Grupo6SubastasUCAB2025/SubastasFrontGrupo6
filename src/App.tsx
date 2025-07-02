import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar"; // Asegúrate de que el archivo está en esa ruta
import EditProfile from "./pages/EditProfile";
import ActivityHistory from "./pages/ActivityHistory";
import UserAuctions from "./pages/UserAuctions";
import CreateAuction from "./pages/CreateAuction";
import EditAuction from "./pages/EditAuction";
import AuctionsList from "./pages/AuctionsList";
import MyProducts from "./pages/MyProducts";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/activity" element={<ActivityHistory />} />
        <Route path="/mis-subastas" element={<UserAuctions />} />
        <Route path="/crear-subasta" element={<CreateAuction />} />
        <Route path="/subasta/editar/:id" element={<EditAuction />} />
        <Route path="/subastas" element={<AuctionsList />} />
        <Route path="/productos" element={<MyProducts />} />
        <Route path="/productos/crear" element={<CreateProduct />} />
        <Route path="/productos/editar/:id" element={<EditProduct />} />
        {/* Agregaremos más rutas aquí */}
      </Routes>
    </Router>
  );
}
