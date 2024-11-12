import { useQuery } from "react-query";
import { db } from "../services/firebase/config"; // Adjust the import path based on your project structure
import { ref, onValue } from "firebase/database";

function useFetchFirebase(reloadKey) {
  // Define a function to fetch data from Firebase
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      const dataRef = ref(db, "Scans");

      // Subscribe to changes in Firebase data
      const unsubscribe = onValue(
        dataRef,
        (snapshot) => {
          resolve(snapshot.val());
        },
        (errorObject) => {
          reject(new Error(errorObject.message));
        }
      );

      // Clean up the subscription when done
      return () => unsubscribe();
    });
  };

  // Use React Query's useQuery hook to fetch data
  const { data, error, isLoading } = useQuery(
    ["firebaseData", reloadKey], // Unique query key with reloadKey
    fetchData, // Fetch function
    {
      // Add any additional React Query options as needed
      staleTime: 0, // Data will be fresh every time
      cacheTime: 0, // Data won't be cached
    }
  );

  return { data, loading: isLoading, error };
}

export { useFetchFirebase };
