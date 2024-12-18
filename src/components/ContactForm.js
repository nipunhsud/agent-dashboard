import React, { useState } from "react";
import { db } from "../config/firebase";  
import { collection, addDoc } from "firebase/firestore";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); 
  const [statusVisible, setStatusVisible] = useState(true); // Track visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email) {
      try {
        const docRef = await addDoc(collection(db, "contactMessages"), {
          name,
          email,
          timestamp: new Date(),
        });
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");

        // Hide the status message after 2 seconds
        setTimeout(() => {
          setStatusVisible(false);
        }, 2000);

      } catch (e) {
        setStatus("Error sending message, please try again.");
        setTimeout(() => {
          setStatusVisible(false);
        }, 2000);
      }
    } else {
      setStatus("Please fill in all fields.");
      setTimeout(() => {
        setStatusVisible(false);
      }, 2000);
    }
  };

  return (
    <section className="flex items-center flex-col mt-40 container mx-auto text-center mb-40">
      <p className="uppercase text-gray-400 tracking-wider">Community</p>
      <h4 className="font-black mt-6 xl:mt-10 mb-2.5 xl:mb-4 text-2xl xl:text-4xl text-gray-700 mx-2.5 text-center text-balance"> 
        Join our newsletter!
      </h4>
      <p className="text-gray-500 text-xl xl:text-2xl">
        Give us your email, we will improve your life!
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8 mb-8">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          className="shadow-lg min-w-[400px] mb-4 py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:text-lg focus:font-semibold"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow-lg min-w-[400px] mb-4 py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:text-lg focus:font-semibold"
        />
        <button type="submit" className="bg-[#6366f1] text-white rounded-lg py-2 px-3.5 inline-block font-medium cursor-pointer">Submit</button>
      </form>

      {status && statusVisible && (
        <p className="bg-white border border-[#6366f1] text-[#6366f1] rounded-lg py-2 px-3.5 inline-block font-medium cursor-pointer transition-opacity duration-1000 opacity-100">
          {status}
        </p>
      )}
    </section>
  );
};

export default ContactForm;


