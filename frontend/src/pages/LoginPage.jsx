import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../store/Users/userActions";
import UseValid from "../hooks/useValid";
import { validateEmail } from "../hooks/useValid.js";
import Input from "../utils/input";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //user login
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(enteredEmail, enteredPassword));
  };

  const emailInputClasses = emailInputHasError ? "invalid" : "";
  const passwordInputClasses = passwordInputHasError ? "invalid" : "";

  let isValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    isValid = true;
  }

  useEffect(() => {
    document.title = "Diet&Gym|Login";
    if (userInfo) {
      navigate(redirect);
      console.log(userInfo);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <div className="add-padding">
      <FormContainer style={{ paddingBottom: "200px" }}>
        <h1>{t("pages.user.signIn")}</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Input
            className={emailInputClasses}
            controlId="email"
            label={t("general.email")}
            type="email"
            value={enteredEmail}
            onInputFn={emailChangeHandler}
            onBlurFn={emailInputBlurHandler}
            errorTernary={emailInputHasError}
            errorText="is not valid"
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
            errorText={t("pages.user.signIn")}
          />

          <Button
            isDisabled={!isValid}
            type="submit"
            className="my-3"
            text={t("pages.user.login")}
          />
        </Form>
        <Row className="py-3">
          <Col>
            {t("pages.user.newHere")}{" "}
            <Link to={"/register"}>{t("pages.user.register")}</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};
export default LoginPage;
