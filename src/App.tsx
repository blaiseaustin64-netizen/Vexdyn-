import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import System from './pages/System'
import Websites from './pages/Websites'
import Build from './pages/Build'
import Plus from './pages/Plus'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/system" element={<System />} />
        <Route path="/websites" element={<Websites />} />
        <Route path="/build" element={<Build />} />
        <Route path="/plus" element={<Plus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  )
}
