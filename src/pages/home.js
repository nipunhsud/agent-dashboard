import React, {useContext} from "react";
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

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <HeroSectionFast/>

      {/* <p className="mt-6 text-gray-200 font-light text-center max-w-3xl text-lg sm:text-xl lg:text-2xl leading-relaxed">
        Investing shouldn't be complicated. At 
        <span className="text-white font-semibold px-1">Purnam</span>, we use AI to turn complex market data into clear, actionable insights. No jargon, no noise—just the information you need to make smarter decisions. Simplify your research. Make confident moves.
      </p> */}

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
