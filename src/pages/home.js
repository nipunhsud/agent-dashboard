import React, {useContext, useState, useEffect} from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Applications from "../components/Applications/Applications";
import Benefits from "../components/Benefits/Benefits";
import {AuthContext} from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom';
import ContactForm from "../components/ContactForm/ContactForm";
import Section from "../components/Shared/Section/Section";
import Testimonials from "../components/Testimonials/Testimonials";
import UseCases from "../components/UseCases/UseCases";
import HeroSectionFast from "../components/HeroSectionFast/HeroSectionFast";
import WhyUs from "../components/WhyUs/WhyUs";
import News from "../components/News/News";
import StocksTabs from '../components/StockTabs/StocksTabs'

const Home = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const filters = ["Stocks to buy","Stocks to watch", "News to read"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [activeTab, setActiveTab] = useState("Learning Hours");

  const openModal = (id) => {
    // const agent = agents.find((agent) => agent.id === id);
    // setSelectedAgent(agent);
    // setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAgent(null);
  };
  const openNotificatiClose = () => {
    setIsOpenNotification(true);
  };
  const NotificatiClose = () => {
    setIsOpenNotification(false);
  };

  const validProgress = Math.min(100, Math.max(0, 0));
  const dashOffset = 100 - validProgress;

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);

  useEffect(() => {
    if (window.location.hash === "#buy-list") {
      setSelectedFilter(filters[0]);
      setTimeout(() => {
        const section = document.querySelector('.agentSection');
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#buy-list") {
        setSelectedFilter(filters[0]);
        setTimeout(() => {
          const section = document.querySelector('.agentSection');
          if (section) section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    // Initial check
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <div className="w-full bg-custom-purple">
          <HeroSectionFast />
        </div>
        <div className="w-full bg-white flex justify-center">
          <div className="w-[800px] px-8">
            <StocksTabs
              dashOffset={dashOffset}  
              validProgress={validProgress}
              filters={filters}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              openModal={openModal}
            />
          </div>
        </div>
      </div>

      <Section 
        name="Why choose us?" 
        title="Your reasearch on steroids"
        subtitle="Improve capabilities with our AI-powered research tools."
      >
        <WhyUs /> 
      </Section>

      <Section 
        name="Technology" 
        title="Our Innovative Solutions"
        subtitle="Discover how our technology is shaping the future."
      >
        <Benefits /> 
      </Section>

  
      <Section
        name="Contact Us"
        title="Get in Touch"
        subtitle="We'd love to hear from you. Drop us a message!"
      >
        <ContactForm /> 
      </Section>
    </div>
  );
};

export default Home;
