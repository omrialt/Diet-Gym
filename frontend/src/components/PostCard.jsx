import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { Fragment } from "react";
import "../styles/card.scss";
import { useTranslation } from "react-i18next";
const PostCard = ({ postType, post, isPostsPage, showPostType }) => {
  const { t } = useTranslation();
  return (
    <div className="card custom-card">
      <div className="title">{post.title}</div>
      {showPostType && (
        <div className="post-type">
          {postType === "menus" ? t("general.menus") : t("general.trainings")}
        </div>
      )}
      <Link to={`/${postType}/${post._id}`}>
        {" "}
        <img src={post.image} alt={post.title} />
      </Link>
      <div className="details-part">
        <div className="details">
          {isPostsPage && (
            <div className="type">
              {t("general.type", {
                type:
                  post.type === "Bulk" ? t("general.bulk") : t("general.cut"),
              })}
            </div>
          )}
          <div className="likes">
            {t("general.likes", { likesCount: post.likesCount })}
          </div>
        </div>
        {postType === "menus" && (
          <>
            <div className="numbers">
              <span>
                {post.totalCalories} {t("pages.card.calories")}
              </span>
              <span>
                {post.totalProtein} {t("pages.card.protein")}
              </span>
            </div>
            <div className="numbers">
              <span>
                {post.totalFats} {t("pages.card.fat")}
              </span>
              <span>
                {post.totalCarbohydrate} {t("pages.card.carbs")}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default PostCard;
