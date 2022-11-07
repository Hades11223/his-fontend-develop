import React from "react";

function WrapperContentLeft(props) {
  const { link, history, bg, homePage, title, icon } = props;
  const onClick = () => {
    if (homePage) {
      link && history.push(link);
      return setTimeout(() => {
        history.go();
      }, 300)
    } else {
      link && history.push(link);
    }
  }
  return (
    <div className="item" onClick={() => onClick()}  >
      <div className="item--bg">
        <img src={bg} alt="iSofh" />
      </div>
      <div className="item--content">
        <div>{title}</div>
        {!!icon && (
          <div className="item--icon">
            <img src={icon} alt="iSofh" />
          </div>
        )}
      </div>
    </div>
  );
}
function WrapperPanel(props) {
  const { title, description, link, icon } = props;
  return (
    <div className="item">
      <div className="item--icon">
        <img src={icon} alt="iSofh" />
      </div>
      <div className="item--content">
        <div className="item--title">{title}</div>
        <div className="item--description">{description}</div>
        {/* <a className="item--link" href={link || "#"}>
          Action link
        </a> */}
      </div>
    </div>
  );
}
export { WrapperContentLeft, WrapperPanel };
