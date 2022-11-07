import React from 'react';
import components from 'components/editor/cores';

const boxRender = (com) => (props) => {
  if (components[com]) {
    return React.createElement(components[com]['component'], props);
  }
};

export default boxRender;