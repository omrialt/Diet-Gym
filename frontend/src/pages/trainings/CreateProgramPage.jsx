import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Table,
  Row,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Button from "../../components/Button";
import FormContainer from "../../components/FormContainer";
import Input from "../../utils/input";
import { useDispatch, useSelector } from "react-redux";
import { createTraining } from "../../store/Training/trainingActions";
import "../../styles/createProgram.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const CreateProgramPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([
    { name: "", muscleName: "", reps: 0, sets: 0 },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Bulk");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState("");
  const { t } = useTranslation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const programCreate = useSelector((state) => state.trainingCreate);

  const { loading, success, error } = programCreate;

  const handleAddExercise = () => {
    const lastExercise = exercises[exercises.length - 1];
    // Check if the last exercise has a name, muscleName, and reps set
    if (
      lastExercise.name.trim() !== "" &&
      lastExercise.muscleName.trim() !== "" &&
      lastExercise.reps !== 0 &&
      lastExercise.sets !== 0
    ) {
      setExercises([
        ...exercises,
        { name: "", muscleName: "", reps: 0, sets: 0 },
      ]);
    } else {
      alert("please fill all the info about the exercise before");
    }
  };

  const handleDeleteExercise = (index) => {
    const updatedExercises = [...exercises];
    if (index === 0) {
      return;
    }
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(exercises);
    dispatch(
      createTraining({
        title,
        buildBy: userInfo.fullname,
        type,
        description,
        user: userInfo._id,
        exercise: exercises,
        image,
      })
    );
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
    document.title = "Diet&Gym|Create New Program";
    if (!userInfo || success) {
      navigate("/");
    }
  }, [userInfo, success, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="create-program-page mt-3">
          <h2 className="px-5">{t("pages.newPosts.training.create")}</h2>
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
                    placeholder={t("pages.newPosts.general.titleDesc")}
                  />
                  <Form.Text className="text-muted">
                    {t("pages.newPosts.general.titleDesc")}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group>
                  <Form.Label>
                    {t("pages.newPosts.training.selectType")}
                  </Form.Label>
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
              </Col>
            </Row>
            <Row>
              <Col md={10}>
                <FormGroup controlId="image">
                  <FormLabel>{t("pages.newPosts.general.image")}</FormLabel>
                  <FormControl
                    type="text"
                    placeholder={t("pages.newPosts.general.imageDesc")}
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                    }}
                  ></FormControl>
                  <FormControl
                    controlId="image"
                    type="file"
                    label="Choose file"
                    accept=".jpg,.jpeg,.png"
                    onChange={uploadFileHandler}
                  ></FormControl>
                  {uploading && <Loader />}
                </FormGroup>
              </Col>
            </Row>
            <span className="table-title">
              {t("pages.newPosts.training.addExercise")}
            </span>
            <Table>
              <thead>
                <tr>
                  <th>{t("pages.newPosts.training.table.name")}</th>
                  <th>{t("pages.newPosts.training.table.muscleName")}</th>
                  <th>{t("pages.newPosts.training.table.reps")}</th>
                  <th>{t("pages.newPosts.training.table.sets")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        type="text"
                        value={exercise.name}
                        onChange={(event) => {
                          const updatedExercises = [...exercises];
                          updatedExercises[index].name = event.target.value;
                          setExercises(updatedExercises);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={exercise.muscleName}
                        onChange={(event) => {
                          const updatedExercises = [...exercises];
                          updatedExercises[index].muscleName =
                            event.target.value;
                          setExercises(updatedExercises);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        step={1}
                        value={exercise.reps}
                        onChange={(event) => {
                          const updatedExercises = [...exercises];
                          updatedExercises[index].reps = +event.target.value;
                          setExercises(updatedExercises);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        step={1}
                        value={exercise.sets}
                        onChange={(event) => {
                          const updatedExercises = [...exercises];
                          updatedExercises[index].sets = +event.target.value;
                          setExercises(updatedExercises);
                        }}
                      />
                    </td>
                    <td>
                      <span>
                        <i
                          onClick={() => handleDeleteExercise(index)}
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
                text={t("pages.newPosts.training.addExercise")}
                className="add-button"
                onClickFn={handleAddExercise}
              />
              <Button
                type="submit"
                text={t("pages.newPosts.training.uploadBtn")}
                className="create-button"
              ></Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};
export default CreateProgramPage;
