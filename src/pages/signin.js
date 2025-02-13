import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { 
  auth,
  signInWithEmailAndPassword, 
  signInWithRedirect, 
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged
} from "../config/firebase"; 


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();


  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccessMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Sign in successful!");
      setTimeout(() => {
        navigate('/stocks');
      }, 1500);
    } catch (error) {
      setError(error.message);
    }
  };
  
  useEffect(() => {
    console.log('Checking redirect result on mount...');
    getRedirectResult(auth)
      .then((result) => {
        console.log('Got redirect result:', result);
        if (result) {
          // Get the credential
          const credential = GoogleAuthProvider.credentialFromResult(result);
          console.log('Got credential:', credential);
          
          // Get the user
          const user = result.user;
          console.log('Got user:', user);
          
          // Wait for auth state to update
          const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
              console.log('Auth state updated with user:', currentUser);
              setSuccessMessage("Sign in successful!");
              setTimeout(() => {
                navigate('/stocks');
              }, 1500);
            }
          });
          
          // Cleanup subscription
          return () => unsubscribe();
        } else {
          console.log('No redirect result - normal page load');
        }
      })
      .catch((error) => {
        console.error('Redirect error:', error);
        setError(error.message);
      });
  }, [navigate]);

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      if (isRedirecting) return;
      setIsRedirecting(true);

      const provider = new GoogleAuthProvider();
      console.log('Starting Google sign in...');
      
      // Force account selection
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      // Start redirect
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Google Sign In Error:', error);
      setError(error.message);
      setIsRedirecting(false);
    }
  };

  return (
    <>
      <div class="bg-black flex justify-center items-center min-h-screen">
        <div class="mx-auto bg-white rounded-2xl max-w-md p-8 shadow-lg">
          <Link class="flex items-center" to={"/"}>
            <img src="/images/back.svg" alt="" />
            <span class="text-sm text-[#6366f1] underline decoration-[#6366f1]">
              Back
            </span>
          </Link>
          <div class="mt-4 mb-6">
            <h1 class="font-bold text-3xl text-center text-[#6366f1] mb-2">
              Sign In
            </h1>
            <h4 class="text-gray-600 text-center">Book your AI Agent Today!</h4>
          </div>

          <form class="contents" onSubmit={handleSubmit}>
            {successMessage && (
                <div className="bg-[#6366f1]/10 border border-[#6366f1] text-[#6366f1] px-4 py-4 rounded-lg flex items-center justify-center">
                  <p className="text-sm font-medium mb-0">Your sign in was succesful!.</p>
                </div>
            )}
            <input type="hidden" name="" value="" autocomplete="off" />
            <div class="my-5 relative">
              <input
                required="required"
                autoFocus={true}
                placeholder="Email Address"
                class="pl-10 block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                type="email"
                name="email_address"
                id="email_address"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                autoComplete="email"
              />
            </div>

            <div className="my-5">
              <div className="relative">
                <input
                  required
                  autoComplete="current-password"
                  placeholder="Password"
                  maxLength="72"
                  className="pl-10 pr-12 block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                  size="72"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  autoComplete="current-password"
                />
                <button
                  className="absolute right-2.5 top-1/2 -translate-y-1/2"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <img
                      src="/images/hidepass.svg"
                      alt="Hide Password"
                      className="w-6 h-6"
                    />
                  ) : (
                    <img
                      src="/images/showpass.svg"
                      alt="Show Password"
                      className="w-6 h-6"
                    />
                  )}
                </button>
              </div>
              <Link
                className="mt-1 text-gray-700 block underline text-right"
                to={"/forgetpassword"}
              >
                Forgot Password?
              </Link>
            </div>

            {error && (
              <p className="text-red-500 text-center mt-2">{error}</p> 
            )}
            {successMessage && (
              <p className="text-green-500 text-center mt-2">{successMessage}</p>
            )}

            <input
              type="submit"
              name="commit"
              value="Sign In"
              className="bg-[#6366f1] text-white rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full mt-8"
            />
            <Link
              className="border-2 border-[#6366f1] text-[#6366f1] block text-center mt-2.5 rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full"
              to={"/signup"}
            >
              Sign Up
            </Link>
            {/*Google*/}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isRedirecting}
              className={`flex items-center justify-center gap-2 border border-gray-300 text-gray-700 rounded-lg py-2 px-3.5 font-medium w-full mt-2.5 hover:bg-gray-50 ${
                isRedirecting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <img 
                src="/images/google.svg"
                alt="Google" 
                className="w-5 h-5" 
              />
              {isRedirecting ? 'Redirecting...' : 'Sign in with Google'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
