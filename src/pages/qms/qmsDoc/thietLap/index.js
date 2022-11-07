import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";
import { Wrapper } from "./styled";

const  QmsDoc = () => {
    return (
        <Wrapper>
        <Header
        />
        <Body
        />
        <Footer />
      </Wrapper>
    )
}

export default QmsDoc;
