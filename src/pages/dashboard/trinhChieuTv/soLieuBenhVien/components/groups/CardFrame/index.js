import React from "react";
import { CardFrameStyled } from "./styled";

const CardFrame = ({
  grow,
  cards = [],
  title = "",
  transparent = false,
  isVerticle = false,
}) => {
  return (
    <CardFrameStyled
      grow={grow}
      style={{ flexGrow: grow || 0 }}
      transparent={transparent}
      isVerticle={isVerticle}
    >
      <div className="content-wrap">
        <div className="border-wrap">
          <div className="title">{title}</div>
          <div className="card-list">
            {cards.map((card, index) => (
              <div
                className="card-item"
                style={{ flexGrow: card.grow || 1 }}
                key={`card-item-${index}`}
              >
                {card.render(card)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardFrameStyled>
  );
};

export default React.memo(CardFrame);
