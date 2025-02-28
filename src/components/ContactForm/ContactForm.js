import React, { useState } from "react";
import { db } from "../../config/firebase";  
import { collection, addDoc } from "firebase/firestore";
import footerBot from "../../assets/bot-footer.png"; 

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); 
  const [statusVisible, setStatusVisible] = useState(true); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email) {
      try {
        const docRef = await addDoc(collection(db, "contactData"), {
          name,
          email,
          timestamp: new Date(),
        });
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");

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
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8 mb-8 bg-white p-8 md:p-12 rounded-[12px] w-full max-w-[500px] mx-auto transform transition-all duration-300 hover:-translate-y-1 shadow-sm">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          className="pl-10 min-w-[100px] block rounded-[8px] border border-gray-300 bg-[#f5f5f7] text-[#0C0B0B] outline-none px-3 py-2 mt-2 w-full focus:border-[#0C0B0B] robotoFont text-[13px]"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 min-w-[100px] block rounded-[8px] border border-gray-300 bg-[#f5f5f7] text-[#0C0B0B] outline-none px-3 py-2 mt-2 w-full focus:border-[#0C0B0B] robotoFont text-[13px]"
        />
        <button 
          type="submit" 
          className="border-2 text-nowrap robotoFont font-bold text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg mt-6"
        >
          Submit
        </button>
      </form>

      {status && statusVisible && (
        <p className="bg-white border border-[#0C0B0B] text-[#0C0B0B] rounded-[8px] py-2 px-3.5 inline-block font-medium cursor-pointer transition-opacity duration-1000 opacity-100 mt-4 mx-auto robotoFont text-[13px]">
          {status}
        </p>
      )}
      
      <img 
        src={footerBot}
        alt="Christmas Gifting Agent" 
        className="mt-8 max-w-full mx-auto" 
      />
    </div>
  );
};

export default ContactForm;


