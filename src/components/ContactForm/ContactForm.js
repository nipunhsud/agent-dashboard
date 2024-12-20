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
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8 mb-8 bg-blue-opacity p-12 rounded-lg">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          className="pl-10 min-w-[400px] block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 min-w-[400px] block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
        />
        <button type="submit" className="bg-[#6366f1] text-white rounded-lg py-2 px-3.5 inline-block font-medium cursor-pointer mt-6">Submit</button>
      </form>

      {status && statusVisible && (
        <p className="bg-white border border-[#6366f1] text-[#6366f1] rounded-lg py-2 px-3.5 inline-block font-medium cursor-pointer transition-opacity duration-1000 opacity-100">
          {status}
        </p>
      )}
       <img 
        src={footerBot}
        alt="Christmas Gifting Agent" 
        className="mt-8 max-w-[400px] mx-auto" 
      />
    </>  
  );
};

export default ContactForm;

