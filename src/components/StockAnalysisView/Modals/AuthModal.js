const AuthModal = ({setShowAuthModal}) => {

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-custom-purple p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative">
            {/* Close button */}
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-xl font-bold mb-4 text-center">Unlock Quanta AI</h2>
            <p className="text-center mb-6">
            Get instant access to powerful AI-driven stock analysis - create your free account now! 🚀
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => window.location.href = '/signup'}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
              >
                Start Free Analysis
              </button>
            </div>
          </div>
        </div>
    )
}

export default AuthModal;