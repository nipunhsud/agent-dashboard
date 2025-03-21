const SubscribeModal = ({setShowSubscribeModal}) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-custom-purple p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative">
          <button
            onClick={() => setShowSubscribeModal(false)}
            className="absolute top-2 right-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h2 className="text-xl font-bold mb-4 text-center">Upgrade to Premium</h2>
          <p className="text-center mb-6">
            You've reached your free analysis limit. Upgrade to Premium for unlimited AI-powered stock analysis! 🚀
          </p>
          
          <div className="flex justify-center">
            <stripe-buy-button
              buy-button-id="buy_btn_1QmFZGP0joiUG98hoXRbIhpp"
              publishable-key="pk_test_51QlJZJP0joiUG98hPgEP93spbGIC35pWJHThVy3wlxkNba2URZr1krOL62jgVEuw9wEgObmcWsagvhndaBTaoBIk00m9aHsLPP"
            >
            </stripe-buy-button>
          </div>
        </div>
      </div>
    )
}

export default SubscribeModal;