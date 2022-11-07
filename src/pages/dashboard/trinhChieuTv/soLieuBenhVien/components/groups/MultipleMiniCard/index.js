import React from "react";
import { MultipleMiniCardStyled } from "./styled";

const MultipleMiniCard = ({ cards = [] }) => {
  return (
    <MultipleMiniCardStyled>
      <div className="content-wrapper">
        {cards.map((cardsInCol, index) => (
          <div key={`col-of-cards-${index}`} className="cards-col">
            {cardsInCol.map((card, idx) => {
              return <div key={card.key || idx}>{card.render(card)}</div>;
            })}
          </div>
        ))}
      </div>
    </MultipleMiniCardStyled>
  );
};

export default React.memo(MultipleMiniCard);
