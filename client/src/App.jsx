import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Header from './components/TouristHome/Header'
import Footer from './components/TouristHome/Footer'
import LandingPage from './components/TouristHome/LandingPage'
import ViewGuides from './components/TouristHome/ViewGuides'
import GuideBooking from './components/TouristHome/GuideBooking';
import { useAuthContext } from './hooks/useAuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from "./components/Guide/Dashboard";
import ForgetPassword from "./pages/ForgetPassowrd";
import ResetPassword from "./pages/ResetPassword";
import CreateHeritage from './components/Heritages/AddHeritages';
import DisplayAHeritage from './components/Heritages/DisplayAHeritage';
import ManageHeritages from './components/AdminComponents/ManageHeritages';
import EditHeritage from './components/AdminComponents/EditHeritage';
import ViewHeritages from './components/Heritages/ViewHeritages';
import ViewEvents from './components/Events/ViewEvents';
import AdminDashboard from './components/AdminComponents/AdminDashboard';
import Editguide from './components/Guide/EditProfile'
import AboutUs from './components/TouristHome/AboutUs';
import ContactUs from './components/TouristHome/ContactUs';
import BlogDashboard from './components/Blogs/BlogDashboard';
import UserBlogs from './components/Blogs/UserBlogs';
import CreateBlog from './components/Blogs/CreateBlog';
import BlogDetails from './components/Blogs/BlogDetails';
import Profile from './components/Guide/Profile';
import AddEvent from './components/Events/AddEvent';
import EditEvents from './components/Events/EditEvents';
import UserDashboard from './components/UserProfile/UserDashboard';
import GuideSignup from './pages/GuideSignup';
import SignupRole from './pages/SignupRole';
import DisplayABlog from './components/Blogs/DisplayABlog';

function App() {
  const { user } = useAuthContext()
  const isAdmin = user && user.role === 'admin';

    return (
        <React.Fragment>
            <Header >
                <Header />
            </Header>

            <main style={{ marginBottom: "50px", background: "#f6f9fc" }}>
                <Routes>
                    <Route path="/" element={<LandingPage />} exact></Route>
                    <Route path="/guides" element={<ViewGuides />} exact></Route>
                    <Route path="/guide-profile" element={<Profile />} exact></Route>
                    <Route path="/heritages" element={<ViewHeritages />} exact></Route>
                    <Route path="/events" element={<ViewEvents />} exact></Route>
                    <Route path="/create-events" element={<AddEvent />} exact></Route>
                    <Route path="/edit-event/:id" element={<EditEvents />} exact></Route>
                    <Route path="/about" element={<AboutUs />} exact></Route>
                    <Route path="/contact" element={<ContactUs />} exact></Route>
                    <Route path="/guides/:id" element={<GuideBooking />} exact></Route>
                    <Route path="/rolesignup" element={<SignupRole/>} exact></Route>
                    <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/login"></Navigate>} />
                    <Route path="/guide-signup" element={!user ? <GuideSignup /> : <Navigate to="/login"></Navigate>} />
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/"></Navigate>} />
                    <Route path="/reset-password" element={!user ? <ForgetPassword /> : <Navigate to="/"></Navigate>} />
                    <Route path="/api/user/reset-password/:token" element={<ResetPassword />} exact></Route>
                    <Route path="/api/createHeritages" element={<CreateHeritage />} exact></Route>
                    <Route path="/api/heritage/:id" element={<DisplayAHeritage />} exact></Route>
                    <Route path="/api/manageHeritages" element={<ManageHeritages />} exact></Route>
                    <Route path="/api/editHeritages/:id" element={<EditHeritage />} exact></Route>
                    <Route path="/api/admin-dashboard" element={<AdminDashboard />} exact></Route>
                    <Route path="/guide-dashboard" element={<Dashboard/>} exact></Route>
                    <Route path="/editguide" element={<Editguide/>} exact></Route>
                    <Route path="/blogs" element={<BlogDashboard />} exact></Route>
                    <Route path="/my-blog" element={<UserBlogs />} exact></Route>
                    <Route path="/create-blog" element={<CreateBlog />} exact></Route>
                    <Route path="/blog-details/:id" element={<BlogDetails />} exact></Route>
                    <Route path="/a_blog/:id" element={<DisplayABlog />} exact></Route>
                    <Route path="/user-dashboard" element={<UserDashboard/>} exact></Route>
                    
                </Routes>
            </main>

            <Footer>
                <Footer />
            </Footer>

        </React.Fragment>
    );
}

export default App;