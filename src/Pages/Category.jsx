import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../Firebase.config";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";

function Category() {
  const [listing, setlisting] = useState(null);
  const [loading, setloading] = useState(true);

  const params = useParams();

  // Process to get data from firebase database using collection's (important)
  useEffect(() => {
    const fetchListing = async () => {
      try {
        // Get reference
        const listingRef = collection(db, "listings");

        // Create query
        const q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // Execute Query
        const querySnap = await getDocs(q);

        let listing = [];

        querySnap.forEach((doc) => {
          console.log(doc);
          console.log("why man");
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchListing();
  });

  return (
    <div>
      <h2>Categroy he ya par bhai</h2>
      <h3>Not able to get any data yet</h3>
    </div>
  );
}

export default Category;
