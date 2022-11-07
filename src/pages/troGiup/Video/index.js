import { Col, Row } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import IconPlayWhite from "assets/svg/troGiup/play-white.svg";
import Breadcrumb from "components/Breadcrumb";
import InputTimeout from "components/InputTimeout";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { listView } from "../constant";
import LayerPlay from "./LayerPlay";
import { WrapperCard, WrapperStyled } from "./styled";

const Video = ({ getAllVideo, filterVideos, currentVideos }) => {
  const refLayerVideo = useRef();
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const onSelectView = (viewSelect) => () => {
    setState({ viewSelect });
    filterVideos({ ma: viewSelect.value });
  };

  useEffect(() => {
    getAllVideo();
  }, []);

  const onSearch = (ten) => {
    filterVideos({ ten });
    if (state.viewSelect) {
      setState({ viewSelect: null });
    }
  };

  return (
    <WrapperStyled>
      <Breadcrumb
        chains={[
          { title: "Trợ giúp", link: "/tro-giup/tro-giup-hdsd" },
          { title: "Video hướng dẫn sử dụng", link: "/tro-giup/video" },
        ]}
      >
        <Row xs={24} className="title-header">
          Video hướng dẫn sử dụng
        </Row>
        <Row>
          <Col span={24}>
            <WrapperCard>
              <div className="input-search">
                <div className="icon-search">
                  <img src={IconSearch} className="icon-search" />
                </div>

                <InputTimeout
                  onChange={onSearch}
                  placeholder="Tìm kiếm tài liệu hướng dẫn sử dụng"
                />
              </div>

              <div className="wrap-container">
                <div className="container-left">
                  <div className="list-item">
                    {listView.map((item, idx) => (
                      <div
                        key={idx}
                        className={`item ${
                          item.value === state?.viewSelect?.value
                            ? "active"
                            : ""
                        }`}
                        onClick={onSelectView(item)}
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="container-right">
                  <div className="title-header">{state?.viewSelect?.title}</div>

                  <div className="content-video">
                    <div className="content-video-wrapper">
                      {currentVideos.map((item, idx) => (
                        <div
                          key={idx}
                          className="item-video"
                          onClick={() =>
                            refLayerVideo.current &&
                            refLayerVideo.current.show(item.url)
                          }
                        >
                          <img
                            src={require("assets/images/tro-giup/bg-video.png")}
                          />
                          <div className="black">
                            <IconPlayWhite />
                          </div>
                          <div className="title-item">{item.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <LayerPlay ref={refLayerVideo} />
            </WrapperCard>
          </Col>
        </Row>
      </Breadcrumb>
    </WrapperStyled>
  );
};

export default connect(
  ({ hdsd: { currentVideos } }) => ({
    currentVideos,
  }),
  ({ hdsd: { getAllVideo, filterVideos } }) => ({
    getAllVideo,
    filterVideos,
  })
)(Video);
