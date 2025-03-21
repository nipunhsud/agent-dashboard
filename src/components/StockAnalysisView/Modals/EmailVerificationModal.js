import React from "react";
import { sendEmailVerification } from "firebase/auth";
import { auth } from '../../../config/firebase';

const EmailVerificationModal = ({ setEmailVerified, setSuccessMessage, setError }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-custom-purple p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        <button
          onClick={() => setEmailVerified(true)}
          className="absolute top-2 right-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-xl font-bold mb-4 text-center">Email Verification Required</h2>
        <p className="text-center mb-6">
          Please verify your email address to continue using Quanta AI. Check your inbox for the verification link.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={async () => {
              try {
                await sendEmailVerification(auth.currentUser);
                setSuccessMessage("Verification email sent! Please check your inbox.");
                setEmailVerified(true);
              } catch (error) {
                setError("Error sending verification email. Please try again later.");
              }
            }}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
          >
            Resend Verification Email
          </button>
          <button
            onClick={() => setEmailVerified(true)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  export default EmailVerificationModal;