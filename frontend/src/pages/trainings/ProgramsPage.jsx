import { Fragment, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTrainings } from "../../store/Training/trainingActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard";
import "../../styles/postsPage.scss";
import FilterSlider from "../../utils/filterSlider";
import { useTranslation } from "react-i18next";

const ProgramsPage = () => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState("");

  const { t } = useTranslation();

  const trainingList = useSelector((state) => state.trainingList);
  const { loading, error, trainings } = trainingList;

  const filteredTrainings = trainings.filter((training) => {
    if (selectedType === "") {
      return true;
    }
    return training.type === selectedType;
  });

  useEffect(() => {
    document.title = "Diet&Gym|Programs";

    dispatch(listTrainings());
  }, [dispatch]);

  return (
    <div className="posts-main">
      <h2>{t("general.trainings")}</h2>
      <span className="filter-label">{t("general.typeFilter")}</span>
      <select onChange={(e) => setSelectedType(e.target.value)}>
        <option value="Cut">{t("general.cut")}</option>
        <option value="Bulk">{t("general.bulk")}</option>
      </select>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Row>
            {filteredTrainings.map((training) => (
              <Col key={training._id} sm={12} md={6} lg={4} xl={3}>
                <PostCard
                  post={training}
                  postType="programs"
                  isPostsPage={true}
                />
              </Col>
            ))}
          </Row>
        </Fragment>
      )}
    </div>
  );
};
export default ProgramsPage;
