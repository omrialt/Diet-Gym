import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Table,
  ListGroup,
  ListGroupItem,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listTrainingDetails,
  toggleTrainingLike,
  createTrainingReview,
} from "../../store/Training/trainingActions";
import {
  TRAINING_LIKE_RESET,
  TRAINING_CREATE_REVIEW_RESET,
} from "../../store/Training/trainingConstants";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Button from "../../components/Button";
import Rating from "../../components/Rating";
import "../../styles/programPage.scss";
import { useTranslation } from "react-i18next";

const ProgramPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const { t } = useTranslation();

  const trainingDetails = useSelector((state) => state.trainingDetails);
  const trainingToggleLike = useSelector((state) => state.trainingToggleLike);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { loading, error, training } = trainingDetails;
  const {
    loading: loadingToggle,
    error: errorToggle,
    success: successToggle,
  } = trainingToggleLike;

  const trainingReviewCreate = useSelector(
    (state) => state.trainingReviewCreate
  );
  const { error: errorTrainingReview, success: successTrainingReview } =
    trainingReviewCreate;

  const toggleLike = () => {
    dispatch(toggleTrainingLike(training._id));
  };

  const createReview = (e) => {
    e.preventDefault();
    dispatch(
      createTrainingReview(id, {
        rating,
        comment,
      })
    );
  };
  console.log(training);
  useEffect(() => {
    document.title = `Diet&Gym| ${training.title}`;
    dispatch(listTrainingDetails(id));
    document.querySelector(".program-description").innerHTML =
      training.description;
    if (successToggle) {
      dispatch({ type: TRAINING_LIKE_RESET });
    }
    if (successTrainingReview) {
      setRating(0);
      setComment("");
      dispatch({ type: TRAINING_CREATE_REVIEW_RESET });
    }
  }, [
    id,
    dispatch,
    training.title,
    training.description,
    successToggle,
    successTrainingReview,
  ]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="program-page">
          <h3>{training.title}</h3>
          <Row className="row-scroll">
            <Col md={6}>
              <span className="program-description">
                {training.description}
              </span>
              <div className="program-author">
                {t("pages.postPage.buildBy")}{" "}
                <Link to={`/profiles/${training.user}`}>
                  {training.buildBy}
                </Link>
              </div>
              <div>
                <Rating value={training.rating} text={``} />
              </div>
              <div className="d-flex info mt-5">
                <span className="program-type">
                  {t("pages.postPage.suitableFor", {
                    suitable:
                      training.type === "Bulk"
                        ? t("general.bulk")
                        : t("general.cut"),
                  })}
                </span>
                <span className="program-likes">
                  {t("pages.postPage.likes", {
                    likesCount: training.likesCount,
                  })}
                </span>
                {userInfo?._id && (
                  <span onClick={toggleLike}>
                    <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                  </span>
                )}
              </div>
              {userInfo?._id === training.user && (
                <span>
                  <Link to={`/programs/${id}/edit`}>
                    {t("pages.postPage.edit")}
                  </Link>
                </span>
              )}
            </Col>
            <Col className="scrolling col-flex" md={6}>
              <table>
                <thead>
                  <tr>
                    <th>{t("pages.newPosts.training.table.name")}</th>
                    <th>{t("pages.newPosts.training.table.muscleName")}</th>
                    <th>{t("pages.newPosts.training.table.reps")}</th>
                    <th>{t("pages.newPosts.training.table.sets")}</th>
                  </tr>
                </thead>
                <tbody>
                  {training.exercise.map((ex) => (
                    <tr>
                      <td>{ex.name}</td>
                      <td>{ex.muscleName}</td>
                      <td>{ex.reps}</td>
                      <td>{ex.sets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
          <Row>
            <h2>{t("pages.postPage.reviews")}</h2>
            {training.reviews.length === 0 && (
              <Message>{t("pages.postPage.noReviews")}</Message>
            )}
            <ListGroup variant="flush">
              {training.reviews.map((review) => {
                return (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                );
              })}

              <ListGroupItem>
                {userInfo && !userInfo.isAdmin && (
                  <h2 className="review-header">
                    {" "}
                    {t("pages.postPage.writeReview")}
                  </h2>
                )}
                {errorTrainingReview && (
                  <Message variant="danger">{errorTrainingReview}</Message>
                )}
                {userInfo ? (
                  !userInfo.isAdmin && (
                    <Form onSubmit={createReview}>
                      <FormGroup controlId="rating">
                        <FormLabel>{t("pages.postPage.rating")}</FormLabel>
                        <FormControl
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">{t("pages.postPage.select")}</option>
                          <option value="1">1-{t("pages.postPage.r1")}</option>
                          <option value="2">2-{t("pages.postPage.r2")}</option>
                          <option value="3">3-{t("pages.postPage.r3")}</option>
                          <option value="4">4-{t("pages.postPage.r4")}</option>
                          <option value="5">5-{t("pages.postPage.r5")}</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId="comment">
                        <FormLabel>{t("pages.postPage.comment")}</FormLabel>
                        <FormControl
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></FormControl>
                      </FormGroup>
                      <Button
                        className="my-3"
                        type="submit"
                        text={t("general.submit")}
                        variant="primary"
                        disabled={comment.trim().length === 0}
                      />
                    </Form>
                  )
                ) : (
                  <Message>
                    <Link to="/login">{t("general.pleaseLogin")}</Link>
                  </Message>
                )}
              </ListGroupItem>
            </ListGroup>
          </Row>
        </div>
      )}
    </>
  );
};
export default ProgramPage;
