import React, {useContext} from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Applications from "../components/Applications/Applications";
import Benefits from "../components/Benefits/Benefits";
import Footer from "../components/Footer";
import {AuthContext} from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom';
import ContactForm from "../components/ContactForm/ContactForm";
import Section from "../components/Shared/Section/Section";
import Testimonials from "../components/Testimonials/Testimonials";
import UseCases from "../components/UseCases/UseCases";

const Home = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!user) {
    navigate('/signin');
  }


  return (
    <div>
      <Header />
      <HeroSection />

      <Section
        name="Applications"
        title="Agents that integrate with everyday tools to automate daily processes."
        subtitle="Discover the agents that enhance your daily tasks."
      >
        <Applications /> 
      </Section>

      <Section 
        name="Use cases" 
        title="Many problems we can solve"
        subtitle="Our agents are diversa and range from to y"
      >
        <UseCases/>
      </Section>

      <Section 
        name="Technology" 
        title="Our Innovative Solutions"
        subtitle="Discover how our technology is shaping the future."
      >
        <Benefits /> 
      </Section>

      <Section 
        name="Testimonials" 
        title="People love us!"
        subtitle="You are more than welcome to our family, come share some love."
      >
        <Testimonials /> 
      </Section>

      <Section
        name="Contact Us"
        title="Get in Touch"
        subtitle="We’d love to hear from you. Drop us a message!"
      >
        <ContactForm /> 
      </Section>

      <Footer />
    </div>
  );
};

export default Home;
