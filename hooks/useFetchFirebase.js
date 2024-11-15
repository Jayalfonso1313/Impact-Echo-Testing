import { useQuery, useQueryClient } from 'react-query';
import { db } from "../services/firebase/config"; // Adjust import path based on your project structure
import { ref, onValue, off } from "firebase/database";

function useFetchFirebase(reloadKey) {
  const queryClient = useQueryClient(); // Used to manually trigger refetch

  // Use react-query to handle state management
  return useQuery(
    ['firebaseData', reloadKey], // Unique key for caching and querying
    () =>
      new Promise((resolve, reject) => {
        const dataRef = ref(db); // Reference to the Firebase data location

        // Set up Firebase's onValue listener to subscribe to real-time updates
        const unsubscribe = onValue(
          dataRef,
          (snapshot) => {
            const fetchedData = snapshot.val();
            resolve(fetchedData); // Resolve with the updated data
            queryClient.setQueryData(['firebaseData', reloadKey], fetchedData); // Update cache manually
          },
          (error) => {
            reject(error); // Reject the promise in case of an error
          }
        );

        // Cleanup the listener when the component unmounts or query is invalidated
        return () => {
          off(dataRef); // Unsubscribe from Firebase listener
        };
      }),
    {
      refetchOnWindowFocus: false, // Disable refetching on window focus
      refetchInterval: false, // Disable periodic refetching since Firebase is real-time
      onSuccess: (data) => {
        console.log("Real-time data updated:", data);
      },
      onError: (error) => {
        console.error("Error fetching real-time data:", error);
      }
    }
  );
}

export { useFetchFirebase };
