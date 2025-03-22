import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

const useSubscriptionCheck = () => {
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const checkSubscription = async () => {
    try {
      const userEmail = auth.currentUser?.email;
      if (!userEmail) {
        console.error("No user email found");
        return false;
      }

      const stripeCustomersRef = collection(db, 'stripe_customers');
      const q = query(stripeCustomersRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);

      const hasSubscription = !querySnapshot.empty;
      
      if (!hasSubscription) {
        setShowSubscribeModal(true);
      }
      
      return hasSubscription;

    } catch (err) {
      console.error("Error checking subscription:", err);
      setShowSubscribeModal(true);
      return false;
    }
  };

  return { checkSubscription, showSubscribeModal, setShowSubscribeModal };
};

export default useSubscriptionCheck;