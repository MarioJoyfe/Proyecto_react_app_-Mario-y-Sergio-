import { BrowserRouter, Routes, Route } from "react-router-dom"

function Home() {
  return <h2 className="text-xl">Home</h2>
}

function Login() {
  return <h2 className="text-xl">Login</h2>
}

function Admin() {
  return <h2 className="text-xl">Admin</h2>
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
