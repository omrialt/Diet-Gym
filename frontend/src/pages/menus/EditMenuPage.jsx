import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Table, Row, Col } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  updateMenu,
  listMenuDetails,
  deleteMenu,
} from "../../store/Menus/menuActions";
import axios from "axios";
import { useTranslation } from "react-i18next";

const EditMenuPage = () => {
  const menuDetails = useSelector((state) => state.menuDetails);
  const { loading, error, menu } = menuDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const menuUpdate = useSelector((state) => state.menuUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = menuUpdate;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Bulk");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState("");

  const { t } = useTranslation();

  const handleAddFood = () => {
    const lastFood = foods[foods.length - 1];

    if (lastFood.name.trim() !== "" && lastFood.unit.trim() !== "") {
      setFoods([
        ...foods,
        {
          name: "",
          unit: "",
          qty: 0,
          calories: 0,
          protein: 0,
          fat: 0,
          carbohydrate: 0,
        },
      ]);
    } else {
      alert("please fill all the info about the food before");
    }
  };
  const handleDeleteFood = (index) => {
    const updatedFoods = [...foods];
    if (index === 0) {
      return;
    }
    updatedFoods.splice(index, 1);
    setFoods(updatedFoods);
  };
  const submitDeleteMenu = () => {
    dispatch(deleteMenu(id));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFats = 0;
    let totalCarbohydrate = 0;
    for (let i = 0; i < foods.length; i++) {
      totalCalories += foods[i].calories;
      totalProtein += foods[i].protein;
      totalFats += foods[i].fat;
      totalCarbohydrate += foods[i].carbohydrate;
    }
    dispatch(
      updateMenu({
        _id: id,
        title,
        buildBy: userInfo.fullname,
        type,
        description,
        user: userInfo._id,
        foods: foods,
        totalCalories: fixValues(totalCalories),
        totalProtein: fixValues(totalProtein),
        totalFats: fixValues(totalFats),
        totalCarbohydrate: fixValues(totalCarbohydrate),
        image,
      })
    );
  };
  const fixValues = (value) => {
    return Number(value.toFixed(2));
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (err) {
      setUploading(false);
    }
  };
  useEffect(() => {
    document.title = "Diet&Gym|Update Menu";
    if (!menu._id) {
      dispatch(listMenuDetails(id));
    }
    if (!userInfo || successUpdate) {
      navigate("/");
    } else {
      setTitle(menu.title);
      setDescription(menu.description);
      setFoods(menu.foods);
      setImage(menu.image);
    }
  }, [
    userInfo,
    successUpdate,
    navigate,
    id,
    dispatch,
    menu._id,
    menu.title,
    menu.description,
    menu.foods,
    menu.image,
  ]);
  return (
    <>
      {loading || loadingUpdate ? (
        <Loader />
      ) : error || errorUpdate ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="create-program-page mt-3">
          <h2 className="px-5">{t("pages.newPosts.menu.update")}</h2>
          <Form
            onSubmit={submitHandler}
            className="d-flex flex-column justify-content-center px-5"
          >
            <Row>
              <Col md={5}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>{t("pages.newPosts.general.title")}</Form.Label>
                  <Form.Control
                    onInput={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder={t("pages.newPosts.general.title")}
                    value={title}
                  />
                  <Form.Text className="text-muted">
                    {t("pages.newPosts.general.title")}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group>
                  <Form.Label>{t("pages.newPosts.menu.selectType")}</Form.Label>
                  <Form.Select
                    className="form-select-type"
                    onChange={(e) => setType(e.target.value)}
                    size="sm"
                  >
                    <option value="Bulk">{t("general.bulk")}</option>
                    <option value="Cut">{t("general.cut")}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={10}>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>
                    {t("pages.newPosts.general.description")}
                  </Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                  />
                </Form.Group>
                <Form.Group controlId="image">
                  <Form.Label>{t("pages.newPosts.general.image")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("pages.newPosts.general.imageDesc")}
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                    }}
                  ></Form.Control>
                  <Form.Control
                    controlId="image"
                    type="file"
                    label="Choose file"
                    accept=".jpg,.jpeg,.png"
                    onChange={uploadFileHandler}
                  ></Form.Control>
                  {uploading && <Loader />}
                </Form.Group>
              </Col>
            </Row>
            <span className="table-title">
              {t("pages.newPosts.menu.addFood")}
            </span>
            <Table>
              <thead>
                <tr>
                  <th>{t("pages.newPosts.menu.table.name")}</th>
                  <th>{t("pages.newPosts.menu.table.unit")}</th>
                  <th>{t("pages.newPosts.menu.table.qty")}</th>
                  <th>{t("pages.newPosts.menu.table.calories")}</th>
                  <th>{t("pages.newPosts.menu.table.protein")}</th>
                  <th>{t("pages.newPosts.menu.table.fat")}</th>
                  <th>{t("pages.newPosts.menu.table.carbs")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        type="text"
                        value={food.name}
                        onChange={(event) => {
                          const updateFoods = [...foods];
                          updateFoods[index].name = event.target.value;
                          setFoods(updateFoods);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Select
                        type="text"
                        onChange={(event) => {
                          const updateFoods = [...foods];
                          updateFoods[index].unit = t(
                            `pages.newPosts.menu.table.${event.target.value}`
                          );
                          setFoods(updateFoods);
                        }}
                      >
                        <option value="unitFixed">
                          {t("pages.newPosts.menu.table.unitFixed")}
                        </option>
                        <option value="unitGrams">
                          {t("pages.newPosts.menu.table.unitGrams")}
                        </option>
                        <option value="unitKg">
                          {t("pages.newPosts.menu.table.unitKg")}
                        </option>
                        <option value="unitCup">
                          {t("pages.newPosts.menu.table.unitCup")}
                        </option>
                        <option value="unitMl">
                          {t("pages.newPosts.menu.table.unitMl")}
                        </option>
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={food.qty}
                        onChange={(event) => {
                          const updateFoods = [...foods];
                          updateFoods[index].qty = +event.target.value;
                          setFoods(updateFoods);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={food.calories}
                        onChange={(event) => {
                          const updateFoods = [...foods];
                          updateFoods[index].calories = +event.target.value;
                          setFoods(updateFoods);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={food.protein}
                        onChange={(event) => {
                          const updateFoods = [...foods];
                          updateFoods[index].protein = +event.target.value;
                          setFoods(updateFoods);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={food.fat}
                        onChange={(event) => {
                          const updateFoods = [...foods];
                          updateFoods[index].fat = +event.target.value;
                          setFoods(updateFoods);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={food.carbohydrate}
                        onChange={(event) => {
                          const updateFoods = [...foods];
                          updateFoods[index].carbohydrate = +event.target.value;
                          setFoods(updateFoods);
                        }}
                      />
                    </td>
                    <td>
                      <span>
                        <i
                          onClick={() => handleDeleteFood(index)}
                          className="fas fa-trash"
                          style={{ color: "white" }}
                        ></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex">
              <Button
                type="button"
                text={t("pages.newPosts.menu.addBtn")}
                className="add-button"
                onClickFn={handleAddFood}
              />
              <Button
                type="submit"
                text={t("pages.newPosts.menu.update")}
                className="create-button"
              ></Button>
              <Button
                type="button"
                text={t("pages.newPosts.menu.delete")}
                className="delete-button"
                onClickFn={submitDeleteMenu}
              ></Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};
export default EditMenuPage;
