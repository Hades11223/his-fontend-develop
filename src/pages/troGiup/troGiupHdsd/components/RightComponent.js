import CheckIcon from "assets/svg/check.svg";
import QuestionIcon from "assets/svg/question.svg";
import React from "react";
import { useHistory } from "react-router-dom";
import { RightStyled } from "../styled";

const RightComponent = (props) => {
  const history = useHistory();

  const onClick = (pathTo) => () => {
    history.push(pathTo);
  };

  return (
    <RightStyled>
      <div className="title">Xem thêm</div>
      <div className="content">
        <div className="item" onClick={onClick("/tro-giup/video")}>
          <CheckIcon width={16} height={16} />
          <span>Video hướng dẫn sử dụng</span>
        </div>
        <div className="item">
          <QuestionIcon width={16} height={16} />
          <span>Câu hỏi thường gặp</span>
        </div>
      </div>
    </RightStyled>
  );
};

export default RightComponent;
