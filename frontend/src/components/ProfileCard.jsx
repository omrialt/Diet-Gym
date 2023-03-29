import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { Fragment } from "react";
import "../styles/card.scss";
const ProfileCard = ({ profile }) => {
  return (
    <div className="card custom-card">
      <Link to={`/profiles/${profile._id}`}>
        <img src={profile.profileImage} alt={profile.fullname} />
      </Link>
      <div className="details-part">
        <div className="profile-details">
          <div className="fullname">{profile.fullname}</div>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
