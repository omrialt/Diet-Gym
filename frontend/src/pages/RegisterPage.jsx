import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../store/Users/userActions";
import UseValid from "../hooks/useValid.js";
import { validateEmail } from "../hooks/useValid.js";
import Input from "../utils/input";
import Button from "../components/Button";
import "../styles/register.scss";
import axios from "axios";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const [message, setMessage] = useState(null);
  const [shareMyPhone, setShareMyPhone] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const { t } = useTranslation();

  //set user register
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userInfoLogin } = userLogin;

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    isValid: enteredEmailIsValid,
    inputBlurHandler: emailInputBlurHandler,
  } = UseValid((value) => validateEmail(value));
  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    isValid: enteredPasswordIsValid,
    inputBlurHandler: passwordInputBlurHandler,
  } = UseValid((value) => value.trim().length > 5);
  const {
    value: enteredFullName,
    hasError: fullNameInputHasError,
    valueChangeHandler: fullNameChangeHandler,
    isValid: enteredFullNameIsValid,
    inputBlurHandler: fullNameInputBlurHandler,
  } = UseValid((value) => value.trim().length > 2);
  const {
    value: enteredPhoneNumber,
    hasError: phoneNumberInputHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    isValid: enteredPoneNumberIsValid,
    inputBlurHandler: phoneNumberInputBlurHandler,
  } = UseValid((value) => value.trim().length > 6);

  let isValid = false;
  const fullNameInputClasses = fullNameInputHasError ? "invalid" : "";
  const emailInputClasses = emailInputHasError ? "invalid" : "";
  const passwordInputClasses = passwordInputHasError ? "invalid" : "";
  const phoneNumberInputClasses = phoneNumberInputHasError ? "invalid" : "";
  if (
    enteredEmailIsValid &&
    enteredFullNameIsValid &&
    enteredPasswordIsValid &&
    enteredPoneNumberIsValid
  ) {
    isValid = true;
  }

  const handleChange = (e) => {
    console.log(e.target.checked);
    setShareMyPhone(e.target.checked);
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
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      register(
        enteredFullName,
        enteredEmail,
        enteredPassword,
        enteredPhoneNumber,
        shareMyPhone,
        image
      )
    );
  };
  useEffect(() => {
    document.title = "Diet&Gym|Register";
    if (userInfoLogin) {
      navigate(redirect);
    }
  }, [navigate, userInfoLogin, redirect]);
  return (
    <FormContainer>
      <h1>{t("pages.user.signUp")}</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Input
          className={fullNameInputClasses}
          controlId="name"
          label={t("pages.user.fullName")}
          type="text"
          value={enteredFullName}
          onInputFn={fullNameChangeHandler}
          onBlurFn={fullNameInputBlurHandler}
          errorTernary={fullNameInputHasError}
          errorText={t("pages.user.errorName")}
        />
        <Input
          className={emailInputClasses}
          controlId="email"
          label={t("general.email")}
          type="email"
          value={enteredEmail}
          onInputFn={emailChangeHandler}
          onBlurFn={emailInputBlurHandler}
          errorTernary={emailInputHasError}
          errorText={t("general.isntValid")}
        />
        <Input
          className={passwordInputClasses}
          controlId="password"
          label={t("general.password")}
          type="password"
          value={enteredPassword}
          onInputFn={passwordChangeHandler}
          onBlurFn={passwordInputBlurHandler}
          errorTernary={passwordInputHasError}
          errorText={t("pages.user.errorPassword")}
        />
        <Input
          className={phoneNumberInputClasses}
          controlId="phoneNumber"
          label={t("pages.user.phoneNumber")}
          type="string"
          placeholder={t("pages.user.phoneNumber")}
          value={enteredPhoneNumber}
          onInputFn={phoneNumberChangeHandler}
          onBlurFn={phoneNumberInputBlurHandler}
          errorTernary={phoneNumberInputHasError}
          errorText={t("pages.user.errorPassword")}
        />
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
        <label htmlFor="shareMyPhone" class="checkbox">
          <span>{t("pages.user.shareMyPhone")}</span>
          <input
            id="shareMyPhone"
            onChange={handleChange}
            checked={shareMyPhone}
            type="checkbox"
          />
          <span class="checkmark"></span>
        </label>
        <Button
          isDisabled={!isValid}
          type="submit"
          onClickFn={submitHandler}
          className="my-3"
          text={t("pages.user.register")}
        />
      </Form>
      <Row className="py-3">
        <Col>
          {t("pages.user.hasAccount")}{" "}
          <Link to={redirect ? `/login/?redirect=${redirect}` : "/login"}>
            {t("pages.user.login")}
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default RegisterPage;
