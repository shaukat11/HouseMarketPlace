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
import ListingItems from "./ListingItems";

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
          orderBy("timespan", "desc"),
          limit(10)
        );

        // Execute Query
        const querySnap = await getDocs(q);

        let listing = [];

        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setlisting(listing);
        setloading(false);
      } catch (error) {
        toast.error("Could not get the listing");
      }
    };

    fetchListing();
    console.log();
  }, [params.categoryName]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent" ? "Place to rent" : "place to sale"}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listing && listing.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listing.map((list) => (
                <ListingItems list={list.data} id={list.id} key={list.id} />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No listing for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
