import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";

import { ProductProvider } from "./context/ProductContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Cart from "./Pages/Cart";
import { CartProvider } from "./context/CartContext";

import Navbar from "./Components/Navbar";
import Carthistory from "./Pages/Carthistory";


function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <ProductProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/cart" element={<Cart />} />
               <Route path="/order-history" element={<Carthistory />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ProductProvider>
    </QueryClientProvider>

  )
}

export default App
