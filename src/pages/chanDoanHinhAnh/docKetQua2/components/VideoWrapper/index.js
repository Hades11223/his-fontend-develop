import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";

const VideoWrapper = ({
  ...props
}) => {
  return (
    <Main {...props}>
      <div className="item">
        <img className="thumb" alt="thumb" />
      </div>
      <div className="item">
        <img className="thumb" alt="thumb" />
      </div>
      <div className="item">
        <img className="thumb" alt="thumb" />
      </div>
      <div className="item">
        <img className="thumb" alt="thumb" />
      </div>
      <div className="item">
        <img className="thumb" alt="thumb" />
      </div>
      <div className="item">
        <img className="thumb" alt="thumb" />
      </div>
    </Main>
  )
}

export default connect(
  (state) => ({

  }),
  ({ }) => ({

  })
)(VideoWrapper);