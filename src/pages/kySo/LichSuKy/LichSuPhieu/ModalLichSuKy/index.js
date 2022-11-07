import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Spin } from "antd";
import { Main, ContentTable, ModalStyled, Footer } from "./styled";
import Button from "pages/kho/components/Button";
import IconCancel from "assets/images/kho/icClose.png";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Document, Page, pdfjs } from "react-pdf";
import { printJS } from "data-access/print-provider";
import moment from "moment";
pdfjs.GlobalWorkerOptions.workerSrc = `/js/pdf.worker.min.js`;
const ModalLichSuKy = (props, ref) => {
  const { getFilePdf } = useDispatch().lichSuKyLichSuPhieu;

  const [state, _setState] = useState({ open: false, pageNumber: 1 });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const columns = [
    {
      title: <HeaderSearch title="Người ký" isTitleCenter={true} />,
      width: "100px",
      dataIndex: "tenNguoiKy",
      key: "tenNguoiKy",
    },
    {
      title: (
        <HeaderSearch
          title="Thời gian ký"
          isTitleCenter={true}
        />
      ),
      width: "100px",
      dataIndex: "thoiGianKy",
      key: "thoiGianKy",
      render: (item) => {
        return item && moment(item)?.format("DD/MM/YYYY");
      },
    },
  ];
  const rowClassName = (record) => {
  };
  useImperativeHandle(ref, () => ({
    show: (options) => {
      const { fileLink = "", item } = options;
      getFilePdf(fileLink).then((s) => {
        setState({
          urlFileLocal: s,
        });
      });
      setState({
        open: true,
        itemCurrent: item,
        urlFileLocal: "",
        pageNumber: 1,
      });
    },
  }));
  const onCloseModal = () => {
    setState({
      open: false,
    });
  };

  //pdf
  const onDocumentLoadSuccess = ({ numPages }) => {
    setState({
      numPages: numPages,
    });
  };
  const onDocumentComplete = (pages) => {
    setState({
      pageNumber: 1,
      numPages: pages,
    });
  };
  const onPageComplete = (page) => {
    setState({
      pageNumber: page,
    });
  };

  const handlePrint = () => {
    printJS({
      printable: state.urlFileLocal,
      type: "pdf",
    });
  };
 
  return (
    <ModalStyled
      width={1300}
      visible={state.open}
      closable={false}
      footer={null}
    >
      <Main>
        <Row className="header-table">
          <div className="header-table__left">Ký và in</div>
          <div className="header-table__right">
            <img src={IconCancel} alt="IconCancel" onClick={onCloseModal} />
          </div>
        </Row>
        <ContentTable>
          <Row>
            <Col span={16} className="left-box">
              <Row className="header-table">
                <div className="header-table__left">
                  {state.itemCurrent?.tenBaoCao}
                </div>
              </Row>
              <Row align="center" className="pdf-view">
                <Spin spinning={!state.urlFileLocal}>
                  {state.urlFileLocal && ( 
                    <Document
                      file={state.urlFileLocal}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onDocumentComplete={onDocumentComplete}
                      onPageComplete={onPageComplete}
                      onLoadError={console.log}
                      height={200}
                    >
                      {Array.apply(null, Array(state.numPages))
                        .map((x, i) => i + 1)
                        .map((page) => (
                          <Page pageNumber={page} />
                        ))}
                    </Document>
                  )}
                </Spin>
              </Row>
            </Col>
            <Col span={7} className="right-box">
              <Row className="header-table">
                <div className="header-table__left">Lịch sử ký</div>
              </Row>
              <TableWrapper
                rowClassName={rowClassName}
                columns={columns}
                dataSource={[{ ...state?.itemCurrent }]}
                scroll={{ y: 500, x: 350 }}
                rowKey={(record) => `${record.ma}`}
              />
              <Footer align="end">
                <Button
                  onClick={handlePrint}
                  rightIcon={
                    <img
                      style={{ marginLeft: 5 }}
                      src={require("assets/images/utils/print-white.png")}
                      alt=""
                    ></img>
                  }
                  minWidth={100}
                >
                  In
                </Button>
              </Footer>
            </Col>
          </Row>
        </ContentTable>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalLichSuKy);
