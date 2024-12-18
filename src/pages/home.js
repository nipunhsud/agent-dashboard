import React, {useContext} from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Applications from "../components/Applications";
import Technology from "../components/Technology";
import Footer from "../components/Footer";
import {AuthContext} from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom';
import ContactForm from "../components/ContactForm";


const Home = () => {
  // eslint-disable-next-line
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!user) {
    navigate('/signin');
  }


  return (
    <div>
      <Header />
      <HeroSection />
      <Applications />
      <Technology />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;
