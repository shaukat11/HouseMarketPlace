import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../Firebase.config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";

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
            dataa: doc.data(),
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

        <Swiper
          slidesPerView={1}
            modules={[Pagination]}
            pagination={{ clickable: true }}
        >
          {listing.map(({ dataa, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${dataa.type}/${id}`)}
            >
              <div
                style={{
                  backgroundImage: `Url(${dataa.imageUrls[0]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "400px",
                }}
                className="swiperSlideDiv"
              >
                <p className="swiperSlideText">{dataa.name}</p>
                <p className="swiperSlidePrice">
                  ${dataa.discountedPrice ?? dataa.regularPrice}{" "}
                  {dataa.type === "rent" && "/ Month"}
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
