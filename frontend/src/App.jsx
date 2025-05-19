import './App.css'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Alert from './components/Alert';
import Footer from './components/Footer';
import Myblog from './pages/Myblog';
import ReadBlog from './pages/ReadBlog';
import CreateBlog from './pages/CreateBlog';
import UpdateBlog from './pages/UpdateBlog';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  return (
    <>
      <Navbar />
      <Alert />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/myBlog" element={<Myblog />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/updateDraft/:id" element={<UpdateBlog />} />
        </Route>
          <Route path="/blogs/:id" element={<ReadBlog />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
