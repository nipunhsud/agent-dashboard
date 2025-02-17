import React, {useContext, useState} from "react";
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
import AgentsList from '../components/AgentsList/AgenstList'

const Home = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const filters = ["All Agents", "The Newest", "Top Rated", "Most Popular"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [activeTab, setActiveTab] = useState("Learning Hours");

  const openModal = (id) => {
    const agent = agents.find((agent) => agent.id === id);
    setSelectedAgent(agent);
    setIsModalOpen(true);
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

  const agents = [
    {
      id: 1,
      name: "Stock  Researcher",
      svg: "/images/Researcher.svg",
      by: "Purnam",
      time: "6h 30min",
      rating: "4.9",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
    {
      id: 2,
      name: "Web Scraper",
      svg: "/images/web.svg",
      by: "Purnam",
      time: "3h 15min",
      rating: "4.7",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
    {
      id: 3,
      name: "Instagram Agent",
      svg: "/images/insta.svg",

      by: "Purnam",
      time: "7h 40min",
      rating: "4.6",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
    {
      id: 4,
      name: "Image Generator",
      svg: "/images/pencil.svg",
      icon: "🖼️",
      by: "Purnam",
      time: "11h 30min",
      rating: "4.8",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
  ];

  if (!user) {
    navigate('/signin');
  }


  return (
    <div>
      <div className="flex flex-col">
        <div className="w-full bg-custom-purple">
          <HeroSectionFast />
        </div>
        <div className="w-full bg-white flex justify-center">
          <div className="w-[800px] px-8">
            <AgentsList 
              dashOffset={dashOffset}  
              validProgress={validProgress}
              agents={agents}
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

      {/* <HeroSection />

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
      </Section> */}

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
