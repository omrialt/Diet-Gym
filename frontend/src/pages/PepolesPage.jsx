import { Fragment, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../store/Users/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import "../styles/postsPage.scss";
import { useTranslation } from "react-i18next";

const PeoplesPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    document.title = "Diet&Gym|Peoples";

    dispatch(listUsers());
  }, [dispatch]);

  return (
    <div className="posts-main">
      <h2>{t("general.peoples")}</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Row>
            {users.map((user) => (
              <Col key={user._id} sm={12} md={6} lg={4} xl={3}>
                <ProfileCard profile={user} />
              </Col>
            ))}
          </Row>
        </Fragment>
      )}
    </div>
  );
};
export default PeoplesPage;
