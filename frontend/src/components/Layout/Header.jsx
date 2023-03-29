import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/nav.scss";
import { logout } from "../../store/Users/userActions";
import { useTranslation } from "react-i18next";
import { useEffect, useCallback } from "react";
const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  const currentLang = localStorage.getItem("i18nextLng");
  const body = document.body;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addClass = useCallback((langName) => {
    if (langName === "en") {
      body.classList.remove("dir-rtl");
      body.classList.add("dir-ltr");
    } else {
      body.classList.remove("dir-ltr");
      body.classList.add("dir-rtl");
    }
  });

  function handleLanguageChange(langName) {
    i18n.changeLanguage(langName);
    addClass(langName);
  }

  useEffect(() => {
    addClass(currentLang);
  }, [addClass, currentLang]);

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">{t("navbar.home")}</Nav.Link>
            <Nav.Link href="/menus">{t("navbar.menus")}</Nav.Link>
            <Nav.Link href="/programs">{t("navbar.programs")}</Nav.Link>
            <Nav.Link href="/peoples">{t("navbar.peoples")}</Nav.Link>
            {userInfo && (
              <Nav.Link href="/menus/create">{t("navbar.newMenu")}</Nav.Link>
            )}
            {userInfo && (
              <Nav.Link href="/programs/create">
                {t("navbar.newProgram")}
              </Nav.Link>
            )}
            {!userInfo ? (
              <Nav.Link href="/login">{t("navbar.login")}</Nav.Link>
            ) : (
              <Nav.Link>
                <Nav.Item onClick={logoutHandler}>
                  {t("navbar.logout")}
                </Nav.Item>
              </Nav.Link>
            )}
            {currentLang === "en" ? (
              <Nav.Link>
                {" "}
                <Nav.Item onClick={() => handleLanguageChange("he")}>
                  {t("general.hebrew")}
                </Nav.Item>
              </Nav.Link>
            ) : (
              <Nav.Link>
                <Nav.Item onClick={() => handleLanguageChange("en")}>
                  {t("general.english")}
                </Nav.Item>
              </Nav.Link>
            )}
            {userInfo && (
              <Nav.Link className="p-image" href="/profile">
                <img
                  className="nav-image"
                  src={userInfo?.profileImage}
                  alt="profile"
                ></img>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
