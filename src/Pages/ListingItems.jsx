import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../assets/svg/editIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

function ListingItems({ list, id, onDelete, onEdit }) {
  return (
    <li className="categoryListing">
      <Link to={`/category/${list.type}/${id}`} className="categoryListingLink">
        <img
          src={list.imageUrls[0]}
          alt={list.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{list.location}</p>
          <p className="categoryListingName">{list.name}</p>

          <p className="categoryListingPrice">
            $
            {list.offer
              ? list.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : list.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {list.type === "rent" && "/Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="categoryListingInfoText">
              {list.bedrooms > 1 ? `${list.bedrooms} Bedrooms` : "1 Bedroom"}
            </p>
            <img src={bathtubIcon} alt="bath" />
            <p className="categoryListingInfoText">
              {list.bathrooms > 1
                ? `${list.bathrooms} bathrooms`
                : "1 bathroom"}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <DeleteIcon
          className="removeIcon"
          fill="rgb(231, 76, 68)"
          onClick={() => onDelete(list.id, list.name)}
        />
      )}
      {onEdit && <EditIcon className="editIcon" onClick={() => onEdit(id)} />}
    </li>
  );
}

export default ListingItems;
