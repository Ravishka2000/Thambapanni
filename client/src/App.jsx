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
import ForgetPassword from "./pages/ForgetPassowrd";
import ResetPassword from "./pages/ResetPassword";
import CreateHeritage from './components/Heritages/AddHeritages';
import DisplayAHeritage from './components/Heritages/DisplayAHeritage';
import ManageHeritages from './components/AdminComponents/ManageHeritages';
import EditHeritage from './components/AdminComponents/EditHeritage';
import ViewHeritages from './components/Heritages/ViewHeritages';

function App() {
  const { user } = useAuthContext()

    return (
        <React.Fragment>
            <Header>
                <Header />
            </Header>

            <main style={{ marginBottom: "50px" }}>
                <Routes>
                    <Route path="/" element={<LandingPage />} exact></Route>
                    <Route path="/guides" element={<ViewGuides />} exact></Route>
                    <Route path="/heritages" element={<ViewHeritages />} exact></Route>
                    <Route path="/guides/:id" element={<GuideBooking />} exact></Route>
                    <Route path="/signup" element={!user ? <Signup /> :<Navigate to="/login"></Navigate>}/>
                    <Route path="/login" element={!user ? <Login /> :<Navigate to="/"></Navigate>}/>
                    <Route path="/reset-password" element={!user ? <ForgetPassword /> :<Navigate to="/"></Navigate>}/>
                    <Route path="/api/user/reset-password/:token" element={<ResetPassword />} exact></Route>
                    <Route path="/api/createHeritages" element={<CreateHeritage />} exact></Route> 
                    <Route path="/api/heritage/:id" element={<DisplayAHeritage />} exact></Route>
                    <Route path="/api/manageHeritages" element={<ManageHeritages />} exact></Route>
                    <Route path="/api/editHeritages/:id" element={<EditHeritage />} exact></Route>

                </Routes>
            </main>

            <Footer>
                <Footer />
            </Footer>

        </React.Fragment>
    );
}

export default App;