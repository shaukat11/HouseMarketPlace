import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../Firebase.config";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";

function Slider() {
  const [loading, SetLoading] = useState(true);
  const [listing, setListing] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, orderBy("timespan", "desc"), limit(5));
        const querySnap = await getDocs(q);

        let listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListing(listings);
        SetLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Not able to fetch Listing");
      }
    };

    getListings();
  }, []);
  console.log(listing);

  if (loading) {
    return <Spinner />;
  }
  return (
    listing && (
      <>
        <p className="exploreHeading">Recommended</p>
        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listing.map((data, id) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imageUrls}) center no repeat`,
                  backgroundSize: "cover",
                }}
                className="swiperSlideDiv"
              >
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  ${data.discountedPrice ?? data.regularPrice}{" "}
                  {data.type === "rent" && "/ Month"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;
