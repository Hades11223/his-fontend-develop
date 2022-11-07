import React from "react";
// import tvLogoFooter from "@resources/images/logo/tv-logo-footer.png";
// import tvLogoFooterPink from "@resources/images/logo/tv-logo-footer-pink.png";
import { useSelector } from "react-redux";
import Logo from "assets/images/dashboard/logo-isofh.svg";

const Footer = () => {
  // const themeKey = useSelector((state) => state.tvShow.themeKey);

  return (
    <>
      <div className="footer">
        <span>
          Cung cấp bởi
          {/* <img src={themeKey === 'pink' ? tvLogoFooterPink : tvLogoFooter} /> */}
        </span>
        <Logo width={100} />
      </div>
    </>
  );
};

export default React.memo(Footer);
