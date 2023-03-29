import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listMenus } from "../store/Menus/menuActions";
import { listTrainings } from "../store/Training/trainingActions";
import { Row, Col } from "react-bootstrap";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "../styles/postsPage.scss";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const trainingList = useSelector((state) => state.trainingList);
  const { loading: loadingTrainings, errorTrainings, trainings } = trainingList;
  const menuList = useSelector((state) => state.menuList);
  const { loading: loadingMenus, error: errorMenus, menus } = menuList;

  const posts = [...menus, ...trainings];

  function handleLanguageChange(event) {
    i18n.changeLanguage(event.target.value);
  }

  useEffect(() => {
    document.title = "Diet&Gym|Home";
    dispatch(listMenus());
    dispatch(listTrainings());
  }, [dispatch]);

  return (
    <div className="posts-main">
      <h2>{t("home.allPosts")}</h2>

      {loadingTrainings || loadingMenus ? (
        <Loader />
      ) : errorTrainings || errorMenus ? (
        <Message variant="danger">{errorTrainings || errorMenus}</Message>
      ) : (
        <>
          <Row>
            {posts.map((post) => (
              <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
                <PostCard
                  post={post}
                  postType={post.foods ? "menus" : "programs"}
                  isPostsPage={true}
                  showPostType={true}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};
export default HomePage;
