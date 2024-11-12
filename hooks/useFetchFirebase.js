import { useEffect, useState } from "react";
import { db } from "../services/firebase/config"; // Adjust import path based on your project structure
import { onValue, ref } from "firebase/database";

function useFetchFirebase(reloadKey) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true); // Set loading state to true when key changes

    const dataRef = ref(db, "Scans");

    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        const fetchedData = snapshot.val();
        setData(fetchedData);
        setLoading(false);
      },
      (errorObject) => {
        setError(errorObject.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [reloadKey]);

  return { data, loading, error };
}

export { useFetchFirebase };
