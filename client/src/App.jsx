import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/TouristHome/Header'
import Footer from './components/TouristHome/Footer'
import LandingPage from './components/TouristHome/LandingPage'

function App() {

    return (
        <React.Fragment>
            <Header>
                <Header />
            </Header>

            <main style={{ marginBottom: "50px" }}>
                <Routes>
                    <Route path="/" element={<LandingPage />} exact></Route>
                </Routes>
            </main>

            <Footer>
                <Footer />
            </Footer>

        </React.Fragment>
    );
}

export default App;