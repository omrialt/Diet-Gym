import { Fragment, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listMenus } from "../../store/Menus/menuActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard";
import "../../styles/postsPage.scss";
import FilterSlider from "../../utils/filterSlider";
import { useTranslation } from "react-i18next";

const MenusPage = () => {
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const [caloriesRange, setCaloriesRange] = useState({ min: 0, max: 5000 });
  const [proteinRange, setProteinRange] = useState({ min: 0, max: 500 });
  const [fatsRange, setFatsRange] = useState({ min: 0, max: 200 });
  const [carbsRange, setCarbsRange] = useState({ min: 0, max: 2000 });

  const { t } = useTranslation();

  const menuList = useSelector((state) => state.menuList);
  const { loading, error, menus } = menuList;

  const filteredMenus = menus.filter(
    (menu) =>
      menu.totalCalories >= caloriesRange.min &&
      menu.totalCalories <= caloriesRange.max &&
      menu.totalProtein >= proteinRange.min &&
      menu.totalProtein <= proteinRange.max &&
      menu.totalFats >= fatsRange.min &&
      menu.totalFats <= fatsRange.max &&
      menu.totalCarbohydrate >= carbsRange.min &&
      menu.totalCarbohydrate <= carbsRange.max
  );

  const handleOnChange = (values, type) => {
    if (type === "calories") {
      setCaloriesRange({ min: values[0], max: values[1] });
    }
    if (type === "protein") {
      setProteinRange({ min: values[0], max: values[1] });
    }
    if (type === "carbs") {
      setCarbsRange({ min: values[0], max: values[1] });
    }
    if (type === "fats") {
      setFatsRange({ min: values[0], max: values[1] });
    }
  };
  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };
  useEffect(() => {
    document.title = "Diet&Gym|Menus";
    dispatch(listMenus());
  }, [dispatch]);

  return (
    <div className="posts-main">
      <h2>{t("general.menus")}</h2>
      <span onClick={handleShowFilters} className="filter-label">
        {showFilters ? t("general.close") : t("general.open")}{" "}
        {t("general.filterOptions")}
      </span>
      {showFilters && (
        <Row>
          <div className="sliders">
            <FilterSlider
              label={t("pages.menus.filterCalories")}
              minValue={0}
              maxValue={5000}
              type="calories"
              onInputFn={handleOnChange}
              rangeArray={caloriesRange}
            />
            <FilterSlider
              label={t("pages.menus.filterProtein")}
              minValue={0}
              maxValue={500}
              type="protein"
              onInputFn={handleOnChange}
              rangeArray={proteinRange}
            />
            <FilterSlider
              label={t("pages.menus.filterCarbs")}
              minValue={0}
              maxValue={2000}
              type="carbs"
              onInputFn={handleOnChange}
              rangeArray={carbsRange}
            />
            <FilterSlider
              label={t("pages.menus.filterFats")}
              minValue={0}
              maxValue={200}
              type="fats"
              onInputFn={handleOnChange}
              rangeArray={fatsRange}
            />
          </div>
        </Row>
      )}
      <Row>
        <Col sm={12} md={6} lg={11} xl={11}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Fragment>
              <Row>
                {filteredMenus.length ? (
                  filteredMenus.map((menu) => (
                    <Col key={menu._id} sm={12} md={6} lg={3} xl={3}>
                      <PostCard
                        post={menu}
                        postType="menus"
                        isPostsPage={true}
                      />
                    </Col>
                  ))
                ) : (
                  <h4>{t("pages.menus.notFound")}</h4>
                )}
              </Row>
            </Fragment>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default MenusPage;
