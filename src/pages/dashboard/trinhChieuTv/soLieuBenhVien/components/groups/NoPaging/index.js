import React from "react";
import { GroupNoPagingStyled } from "./styled";

const GroupNoPaging = ({
  grow,
  cards = [],
  transparent = false,
  paddingBottom,
  style = {},
}) => {
  return (
    <GroupNoPagingStyled
      grow={grow}
      style={{ flexGrow: grow || 0, ...style }}
      transparent={transparent}
      paddingBottom={paddingBottom}
    >
      <div className="group-content animation-tv-card-moving">
        {cards.map((card) => card.render(card))}
      </div>
    </GroupNoPagingStyled>
  );
};

export default React.memo(GroupNoPaging);
