import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  FormControl,
  ListGroupItem,
  FormGroup,
  FormLabel,
  Table,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  listUsers,
  getUserPosts,
} from "../store/Users/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "../styles/profilePage.scss";
import PostCard from "../components/PostCard";
import { useTranslation } from "react-i18next";

const PeoplePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userPosts = useSelector((state) => state.userPosts);

  const { loading: loadingPosts, error: errorPosts, posts } = userPosts;

  useEffect(() => {
    document.title = `Diet&Gym|`;
    dispatch(getUserDetails(id));
    debugger;
    dispatch(getUserPosts(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <header className="d-flex">
            <div className="details">
              <img
                className="profile-image"
                alt={user.fullname}
                src={user.profileImage}
              />
              <h4>{user.fullname}</h4>
            </div>
            <div className="info">
              <a
                className="contact"
                href={`mailto:${user.email}`}
                target="_blank"
              >
                {user.email}
              </a>
              {user.shareMyPhone && (
                <a
                  className="contact"
                  href={`https://api.whatsapp.com/send?phone=${user.phoneNumber}&text=Hey Omri! can i see some of your works ?`}
                  target="_blank"
                >
                  {user.phoneNumber}
                </a>
              )}
            </div>
          </header>
          <div className="profile-main">
            <h3>{t("general.posts")}</h3>
            {loadingPosts ? (
              <Loader />
            ) : errorPosts ? (
              <Message variant="danger">{errorPosts}</Message>
            ) : (
              <Row>
                {posts.map((post) => (
                  <Col key={post._id} sm={12} md={6} lg={3} xl={3}>
                    <PostCard
                      post={post}
                      postType={post.foods ? "menus" : "programs"}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default PeoplePage;
