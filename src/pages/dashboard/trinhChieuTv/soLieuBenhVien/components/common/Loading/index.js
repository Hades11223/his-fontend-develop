import React, { useMemo } from "react";
import Wrapper from "../LoadingIndicator/Wrapper";
import loadingImage from "assets/images/dashboard/loading.png";
import loadingWhiteImage from "assets/images/dashboard/loading-white.png";
import loadingCardImg from "assets/images/dashboard/loading_white.png";
import ContentLoader from "react-content-loader";
import { useSelector } from "react-redux";
import { Main } from "./styled";
const Loading = ({
  skeletons,
  isAbsolute,
  size,
  type = "default",
  whiteLoading = false,
  alignTop = false,
  noSub = false,
  skeletonStyle,
}) => {
  // const theme = useSelector((state) => state.tvShow.theme);
  // const theme = 'dark';
  const skeletonContent = useMemo(() => {
    const rsContent = [];
    if (skeletons) {
      for (let i = 0; i < skeletons || 0; i++) {
        rsContent.push(
          <ContentLoader
            width={"100%"}
            height={skeletonStyle?.height || 60}
            backgroundColor={
              skeletonStyle?.bgColor || "rgba(189, 189, 189, 0.2)"
            }
            foregroundColor={
              skeletonStyle?.fgColor || "rgba(255, 245, 157, 0.2)"
            }
          >
            <rect
              x={(skeletonStyle?.x || 20) + (skeletonStyle?.width || 60) + 10}
              y={skeletonStyle?.y || 15}
              rx={skeletonStyle?.r || 5}
              ry={skeletonStyle?.r || 5}
              width={"calc(100%)"}
              height={(skeletonStyle?.height || 60) / 4}
            />
            <rect
              x={(skeletonStyle?.x || 20) + (skeletonStyle?.width || 60) + 10}
              y={(skeletonStyle?.y || 15) + (skeletonStyle?.height || 60) / 2}
              rx={skeletonStyle?.r || 5}
              ry={skeletonStyle?.r || 5}
              width="calc(100% / 2)"
              height={(skeletonStyle?.height || 60) / 6}
            />
            <rect
              x={skeletonStyle?.x || 20}
              y={2 * (skeletonStyle?.r || 5)}
              rx="0"
              ry="0"
              width={skeletonStyle?.width || 60}
              height={skeletonStyle?.height || 60}
            />
          </ContentLoader>
        );
      }
    }
    return rsContent;
  }, [skeletons]);

  if (skeletons > 0) {
    return (
      <div
        style={{
          dislay: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "2em",
          padding: "2em",
          flexDirection: "column",
        }}
      >
        {skeletonContent}
      </div>
    );
  }

  return (
    <Main>
      <Wrapper
        isAbsolute={isAbsolute}
        size={size}
        whiteLoading={whiteLoading}
        alignTop={alignTop}
        // {...theme}
      >
        {type === "default" && (
          <div className="container">
            <div className="spinner"></div>
            <div className="spinner">
              <div className="spinner-item"></div>
              <div className="spinner-item"></div>
              <div className="spinner-item"></div>
              <div className="spinner-item"></div>
              <div className="spinner-item"></div>
            </div>
          </div>
        )}
        {type === "chart" && (
          <div className="loading-chart">
            <img
              style={{
                width: "calc(100vw * 60 / 3840)",
                height: "calc(100vw * 60 / 3840)",
                // filter: theme.loading,
              }}
              src={whiteLoading ? loadingWhiteImage : loadingImage}
            />
            {!noSub && (
              <span className="loading-sub">
                Đang xử lý dữ liệu. Xin vui lòng chờ!
              </span>
            )}
          </div>
        )}
        {type === "card" && (
          <div className="loading-card">
            <img
              style={{
                width: "calc(100vw * 60 / 3840)",
                height: "calc(100vw * 60 / 3840)",
              }}
              src={loadingCardImg}
            />
          </div>
        )}
      </Wrapper>
    </Main>
  );
};

export default Loading;
