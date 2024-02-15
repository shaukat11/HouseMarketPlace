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
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

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
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

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
        console.log(error);
        toast.error("Could not get the listing");
        setloading(false);
      }
    };

    fetchListing();
  }, [params.categoryName]);

  // Creating fetch function for loading batch data
  const FetchMoreListing = async () => {
    try {
      // Get reference
      const listingRef = collection(db, "listings");

      // Create query
      const q = query(
        listingRef,
        where("type", "==", params.categoryName),
        orderBy("timespan", "desc"),
        startAfter(lastFetchedListing),
        limit(10)
      );

      // Execute Query
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      let listing = [];

      querySnap.forEach((doc) => {
        return listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      // adding more listing to the previous listing using preState
      setlisting((preState) => [...preState, ...listing]);
      setloading(false);
    } catch (error) {
      console.log(error);
      toast.error("Could not get the listing");
      setloading(false);
    }
  };

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

          <br />

          {lastFetchedListing ? (
            <p className="loadMore" onClick={FetchMoreListing}>
              Load More
            </p>
          ) : (
            <p style={{ textAlign: "center" }}>No More Listing</p>
          )}
        </>
      ) : (
        <p>No listing for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
