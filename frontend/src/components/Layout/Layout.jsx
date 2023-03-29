import Footer from "./Footer";
import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-container">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
