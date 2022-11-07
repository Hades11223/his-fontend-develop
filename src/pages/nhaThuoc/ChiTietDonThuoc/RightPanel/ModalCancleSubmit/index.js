import React, { useCallback, useEffect, useState, useMemo, forwardRef, useImperativeHandle, useRef } from "react";
import {
    Main, ButtonWrapper, Wrapper,
    ModalStyled,
    ModalHeader,
    SubModalHeader,
    ModalContent,
    ModalFooter,
    ButtonBack,
    ButtonNext,
} from "./styled";
import { Col, Row, Input, Radio } from "antd";

const ModalCancleSubmit = (props, ref) => {
    const refOk = useRef(null)
    const [state, _setState] = useState({
        isModalVisible: false,
        discount: 1
    });
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };
    useImperativeHandle(ref, () => ({
        show: (options, onOk) => {
            setState({
                isModalVisible: true
            });
            refOk.current = onOk
        },
        close: () => {
            setState({
                isModalVisible: false
            });
        },
    }));
    const cancelHandler = () => {
        ref.current.close();
    }
    const submitHandler = () => {
        refOk.current({valueInput: state.valueInput})
        ref.current.close();
    }
    return (
        <Wrapper>
            <ModalStyled
                width={500}
                visible={state.isModalVisible}
                closable={false}
                footer={null}
            >
                <ModalHeader className="modal-header">
                    Xác nhận Hủy phát đơn thuốc
                </ModalHeader>
                <ModalContent className="modal-content">
                    <Main>
                        <Row >
                            <Col span={24}>
                                <div style={{ marginTop: 10 }}>
                                    Nhập lý do hủy
                                </div>
                                <Input
                                    value={state.valueInput}
                                    placeholder="Vui lòng nhập lý do hủy"
                                    onChange={(e) => {
                                        setState({ valueInput: e.target.value })
                                        // refOk.current({valueInput : e.target.value})
                                    }}
                                />
                            </Col>
                        </Row>
                    </Main>
                </ModalContent>
                <ModalFooter className="modal-footer">
                    <ButtonBack onClick={cancelHandler} style={{ border: "1px solid gray" }}>Quay lại</ButtonBack>
                    <ButtonNext onClick={submitHandler}>Đồng ý</ButtonNext>
                </ModalFooter>
            </ModalStyled>
        </Wrapper>
    );
};


export default forwardRef(ModalCancleSubmit);