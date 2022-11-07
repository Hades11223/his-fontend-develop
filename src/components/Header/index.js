import React from 'react';
import { Main } from './styled';

function index(props) {
    return (
        <Main style={props.optionFit && props.optionBottom
            ? { position: "absolute", bottom: -270, marginLeft: 16 }
            : (props.optionFit ? { marginLeft: 16 } : null)}
        >
            <div className="header">
                <div className="content">{props.title}</div>
                <div className="content-note">{props.content}</div>
            </div>
        </Main>
    )
}

export default index;