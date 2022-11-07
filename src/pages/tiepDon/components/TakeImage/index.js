import React from "react";
import Image from "components/Image";
import { Tooltip } from "antd";
const TakeImage = (props, ref) => {
  const { value, className, image, icon, svgIcon } = props;

  return (
    <>
      <Image
        className={`${className ? className : ""}image`}
        src={value}
        defaultImage={image}
      />
      <Tooltip title={props?.titleTooltipIcon} placement="bottom">
        {svgIcon || (
          <img className={`${className ? className : ""}icon`} src={icon}></img>
        )}
      </Tooltip>
    </>
  );
};

export default TakeImage;
