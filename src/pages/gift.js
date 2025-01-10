import React from "react";


const Gift = () => {
  return (
    <>
      <div class="min-h-screen md:py-12 md:px-4 sm:px-6 lg:px-8">
        <div class="lg:max-w-4xl mx-auto form-container bg-[#fffffff2] backdrop-blur-md rounded-2xl shadow-2xl py-5 p-3 md:p-8 md:mb-12">
          <div class="text-center mt-12 md:mt-0 mb-12">
            <h1 class="text-2xl md:text-4xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Gift Recommendation Assistant
            </h1>
            <p class="text-lg text-gray-600">
              Let us help you find the perfect gift! ✨
            </p>
          </div>

          <form method="POST">
            <div class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span class="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3">
                  👤
                </span>
                Recipient Information
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Recipient's Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="0"
                    max="120"
                    required
                    class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Relationship to Recipient
                  </label>
                  <select
                    name="relationship"
                    id="relationshipSelect"
                    required
                    class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white"
                  >
                    <option value="">Select relationship</option>
                    <option value="family">Family Member</option>
                    <option value="friend">Friend</option>
                    <option value="colleague">Colleague</option>
                    <option value="significant_other">Significant Other</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div
                  class="md:col-span-2 mt-4 hidden"
                  id="otherRelationshipDiv"
                >
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Please specify relationship
                  </label>
                  <input
                    type="text"
                    name="relationship"
                    id="otherRelationshipInput"
                    class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Please specify your relationship"
                  />
                </div>
              </div>
            </div>

            <div class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] bg-white rounded-xl p-6 shadow-lg border border-gray-100 mt-8">
              <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span class="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
                  💝
                </span>
                Interests & Preferences
              </h2>

              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Hobbies & Interests
                  </label>
                  <textarea
                    name="interests"
                    rows="3"
                    required
                    class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="e.g., reading, cooking, sports, technology..."
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Favorite Brands or Stores (optional)
                  </label>
                  <input
                    type="text"
                    name="brands"
                    class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="e.g., Nike, Apple, Amazon..."
                  />
                </div>
              </div>
            </div>

            <div class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px]  bg-white rounded-xl p-6 shadow-lg border border-gray-100 mt-8">
              <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span class="bg-pink-100 text-pink-600 p-2 rounded-lg mr-3">
                  🎁
                </span>
                Gift Parameters
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    required
                    class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white"
                  >
                    <option value="">Select budget range</option>
                    <option value="under$25">Under $25</option>
                    <option value="$25-$50">$25 - $50</option>
                    <option value="$50-$100">$50 - $100</option>
                    <option value="$100-$200">$100 - $200</option>
                    <option value="$200-$500">$200 - $500</option>
                    <option value="$500-$1000">$500 - $1000</option>
                    <option value="$1000-$5000">$1000 - $5000</option>
                    <option value="$5000plus">$5000+</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Occasion
                  </label>
                  <select
                    name="occasion"
                    id="occasionSelect"
                    required
                    class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white"
                  >
                    <option value="">Select occasion</option>
                    <option value="birthday">Birthday</option>
                    <option value="christmas">Christmas</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="graduation">Graduation</option>
                    <option value="wedding">Wedding</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div class="mt-4 hidden" id="otherOccasionDiv">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Please specify occasion
                  </label>
                  <input
                    type="text"
                    name="occasion"
                    id="otherOccasionInput"
                    class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Please specify the occasion"
                  />
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    User's Query (optional)
                  </label>
                  <textarea
                    name="User_query"
                    rows="3"
                    class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Any other relevant information..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] bg-white rounded-xl p-6 shadow-lg border border-gray-100 mt-8">
              <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span class="bg-green-100 text-green-600 p-2 rounded-lg mr-3">
                  📝
                </span>
                Previous Gifts
              </h2>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Recent Gifts They've Received (optional)
                </label>
                <textarea
                  name="previous_gifts"
                  rows="3"
                  class="transition-all duration-[0.3s] ease-in focus:-translate-y-[2px] w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="List any recent gifts they've received..."
                ></textarea>
              </div>
            </div>

            <div class="pt-6">
              <button
                type="submit"
                class="gradient-button w-full py-4 px-3 md:px-6 rounded-xl text-white font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Get Gift Recommendations ✨
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Gift;
