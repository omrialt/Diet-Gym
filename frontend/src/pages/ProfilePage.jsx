import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Table, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getUserDetails,
  updateUserProfile,
  getUserPosts,
} from "../store/Users/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../store/Users/userConstants";
import UseValid from "../hooks/useValid";
import { validateEmail } from "../hooks/useValid";
import Input from "../utils/input";
import axios from "axios";
import Button from "../components/Button";
import "../styles/profilePage.scss";
import { useTranslation } from "react-i18next";
const ProfilePage = () => {
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    isValid: enteredEmailIsValid,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailValue,
    setEnteredValue: setEmailValueHandler,
  } = UseValid((value) => validateEmail(value));
  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    isValid: enteredPasswordIsValid,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordValue,
  } = UseValid((value) => value.length > 5);

  const {
    value: enteredFullName,
    hasError: fullNameInputHasError,
    valueChangeHandler: fullNameChangeHandler,
    isValid: enteredFullNameIsValid,
    inputBlurHandler: fullNameInputBlurHandler,
    reset: resetFullNameValue,
    setEnteredValue: setFullNameValueHandler,
  } = UseValid((value) => value.trim().length > 2);
  const {
    value: enteredPhoneNumber,
    hasError: phoneNumberInputHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    isValid: enteredPhoneNumberIsValid,
    inputBlurHandler: phoneNumberInputBlurHandler,
    reset: resetPhoneNumberValue,
    setEnteredValue: setPhoneNumberValueHandler,
  } = UseValid((value) => value.trim().length > 2);

  //get user details
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  //get user login info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userPosts = useSelector((state) => state.userPosts);

  const { loading: loadingPosts, error: errorPosts, posts } = userPosts;

  //update user detail
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
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
      updateUserProfile({
        id: user._id,
        fullname: enteredFullName,
        email: enteredEmail,
        password: enteredPassword,
        phoneNumber: enteredPhoneNumber,
        //profileImage: image,
      })
    );
    resetEmailValue();
    resetPasswordValue();
    resetFullNameValue();
    resetPhoneNumberValue();
    setMessage(null);
    dispatch({ type: USER_UPDATE_PROFILE_RESET });
  };

  const fullNameInputClasses = fullNameInputHasError ? "invalid" : "";
  const emailInputClasses = emailInputHasError ? "invalid" : "";
  const passwordInputClasses = passwordInputHasError ? "invalid" : "";
  const phoneNumberInputClasses = phoneNumberInputHasError ? "invalid" : "";

  let isValid = false;
  if (
    enteredEmailIsValid &&
    enteredFullNameIsValid &&
    enteredPasswordIsValid &&
    enteredPhoneNumberIsValid
  ) {
    isValid = true;
  }

  useEffect(() => {
    document.title = "Diet&Gym|My Profile";
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.fullname || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails(userInfo._id));
        dispatch(getUserPosts(userInfo._id));
      }
      if (userInfo) {
        setFullNameValueHandler(userInfo.fullname);
        setEmailValueHandler(userInfo.email);
        setPhoneNumberValueHandler(userInfo.phoneNumber);
      }
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    user,
    success,
    setFullNameValueHandler,
    setEmailValueHandler,
    setPhoneNumberValueHandler,
  ]);

  return (
    <div className="profile-main">
      <Row>
        <Col md={3}>
          <h2>{t("pages.user.myProfile")}</h2>
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {success && (
            <Message variant="success">{t("pages.user.update")}</Message>
          )}
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
              type="text"
              value={enteredPhoneNumber}
              onInputFn={phoneNumberChangeHandler}
              onBlurFn={phoneNumberInputBlurHandler}
              errorTernary={phoneNumberInputHasError}
              errorText={t("pages.user.errorPassword")}
            />

            <Button
              isDisabled={!isValid}
              type="submit"
              className="my-3"
              text={t("pages.user.updateBtn")}
            />
          </Form>
        </Col>
        <Col md={2}></Col>
        <Col md={7}>
          <span>{t("general.posts")}</span>
          <Table>
            <thead>
              <tr>
                <th>{t("pages.user.table.title")}</th>
                <th>{t("pages.user.table.type")}</th>
                <th>{t("pages.user.table.likes")}</th>
                <th>{t("pages.user.table.reviews")}</th>
              </tr>
            </thead>
            {loadingPosts ? (
              <Loader />
            ) : errorPosts ? (
              <Message variant="danger">{errorPosts}</Message>
            ) : (
              <tbody>
                {posts.map((post) => (
                  <tr>
                    <td>
                      <Link
                        to={
                          post.foods
                            ? `/menus/${post._id}`
                            : `/programs/${post._id}`
                        }
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td>
                      {post.foods ? t("general.menu") : t("general.training")}
                    </td>
                    <td>{post.likesCount}</td>
                    <td>{post.reviews.length}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </Col>
      </Row>
    </div>
  );
};
export default ProfilePage;
