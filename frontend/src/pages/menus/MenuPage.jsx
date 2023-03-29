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
  listMenuDetails,
  toggleMenuLike,
  createMenuReview,
} from "../../store/Menus/menuActions";
import {
  MENU_LIKE_RESET,
  MENU_CREATE_REVIEW_RESET,
} from "../../store/Menus/menuConstants";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Button from "../../components/Button";
import Rating from "../../components/Rating";
import "../../styles/menuPage.scss";
import { useTranslation } from "react-i18next";
const MenuPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const { t } = useTranslation();

  const menuDetails = useSelector((state) => state.menuDetails);
  const menuToggleLike = useSelector((state) => state.menuToggleLike);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { loading, error, menu } = menuDetails;
  const {
    loading: loadingToggle,
    error: errorToggle,
    success: successToggle,
  } = menuToggleLike;

  const menuReviewCreate = useSelector((state) => state.menuReviewCreate);
  const { error: errorMenuReview, success: successMenuReview } =
    menuReviewCreate;

  const toggleLike = () => {
    dispatch(toggleMenuLike(menu._id));
  };

  const createReview = (e) => {
    e.preventDefault();
    dispatch(
      createMenuReview(id, {
        rating,
        comment,
      })
    );
  };

  useEffect(() => {
    document.title = `Diet&Gym| ${menu.title}`;
    dispatch(listMenuDetails(id));
    document.querySelector(".program-description").innerHTML = menu.description;
    if (successToggle) {
      dispatch({ type: MENU_LIKE_RESET });
    }
    if (successMenuReview) {
      setRating(0);
      setComment("");
      dispatch({ type: MENU_CREATE_REVIEW_RESET });
    }
  }, [
    id,
    dispatch,
    menu.title,
    menu.description,
    successToggle,
    successMenuReview,
  ]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="program-page">
          <h3>{menu.title}</h3>
          <Row className="row-scroll">
            <Col md={6} sm={12}>
              <span className="program-description"></span>
              <div className="program-author">
                {t("pages.postPage.buildBy")}{" "}
                <Link to={`/profiles/${menu.user}`}>{menu.buildBy}</Link>
              </div>
              <div>
                <Rating value={menu.rating} text={``} />
              </div>
              <div className="d-flex info mt-5">
                <span className="program-type">
                  {t("pages.postPage.suitableFor", {
                    suitable:
                      menu.type === "Bulk"
                        ? t("general.bulk")
                        : t("general.cut"),
                  })}
                </span>
                <span className="program-likes">
                  {t("pages.postPage.likes", { likesCount: menu.likesCount })}
                </span>
                {userInfo?._id && (
                  <span onClick={toggleLike}>
                    <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                  </span>
                )}
              </div>
              {userInfo?._id === menu.user && (
                <span>
                  <Link to={`/menus/${id}/edit`}>
                    {t("pages.postPage.edit")}
                  </Link>
                </span>
              )}
            </Col>
            <Col md={6} className="scrolling col-flex">
              <table>
                <thead>
                  <tr>
                    <th>{t("pages.newPosts.menu.table.name")}</th>
                    <th>{t("pages.newPosts.menu.table.unit")}</th>
                    <th>{t("pages.newPosts.menu.table.qty")}</th>
                    <th>{t("pages.newPosts.menu.table.calories")}</th>
                    <th>{t("pages.newPosts.menu.table.protein")}</th>
                    <th>{t("pages.newPosts.menu.table.fat")}</th>
                    <th>{t("pages.newPosts.menu.table.carbs")}</th>
                  </tr>
                </thead>
                <tbody>
                  {menu.foods.map((food) => (
                    <tr>
                      <td>{food.name}</td>
                      <td>{food.unit}</td>
                      <td>{food.qty}</td>
                      <td>{food.calories}</td>
                      <td>{food.protein}</td>
                      <td>{food.fat}</td>
                      <td>{food.carbohydrate}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>{t("pages.newPosts.menu.table.total")}</td>
                    <td>{menu.totalCalories}</td>
                    <td>{menu.totalProtein}</td>
                    <td>{menu.totalFats}</td>
                    <td>{menu.totalCarbohydrate}</td>
                  </tr>
                </tfoot>
              </table>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>{t("pages.postPage.reviews")}</h2>
              {menu.reviews.length === 0 && (
                <Message>{t("pages.postPage.noReviews")}</Message>
              )}
              <ListGroup variant="flush">
                {menu.reviews.map((review) => {
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
                      {t("pages.postPage.writeReview")}
                    </h2>
                  )}
                  {errorMenuReview && (
                    <Message variant="danger">{errorMenuReview}</Message>
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
                            <option value="">
                              {t("pages.postPage.select")}
                            </option>
                            <option value="1">
                              1-{t("pages.postPage.r1")}
                            </option>
                            <option value="2">
                              2-{t("pages.postPage.r2")}
                            </option>
                            <option value="3">
                              3-{t("pages.postPage.r3")}
                            </option>
                            <option value="4">
                              4-{t("pages.postPage.r4")}
                            </option>
                            <option value="5">
                              5-{t("pages.postPage.r5")}
                            </option>
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
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
export default MenuPage;
