import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Modal } from "antd";
import styled from "styled-components";
import BgThemeDark from "assets/images/dashboard/theme-dark.svg";
import BgThemeLight from "assets/images/dashboard/theme-light.svg";
// import IcCircleCheck from "@resources/svg/circle-check.svg";
import { useDispatch, useSelector } from "react-redux";
// import tvShow from '@redux-store/actions/tv-show';

const WrapModal = styled(Modal)`
  .ant-modal-close-x {
    svg {
      width: 1.3vw;
      height: 1.3vw;
    }
  }
  .ant-modal-body {
    padding-top: 0;
    .select-theme {
      display: flex;
      justify-content: center;
      &-item {
        padding: 0 0.2vw;
      }
      .theme-bg {
        padding: 0 0.5vw;
        &.active {
          border: 1px solid green;
          border-radius: 0.8vw;
        }
      }
    }
  }
`;

const WrapTitle = styled.div`
  font-size: 1.52vw;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const themeOption = [
  {
    title: "Tối",
    icon: BgThemeDark,
    key: "dark",
  },
  {
    title: "Hồng",
    icon: BgThemeLight,
    key: "pink",
  },
];

const ModalTheme = (props, ref) => {
  // const themeKey = useSelector((state) => state.tvShow.themeKey);
  const dispatch = useDispatch();
  const [state, _setState] = useState({ visible: false });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  useImperativeHandle(ref, () => ({
    open: () => {
      setState({ visible: true });
    },
    close: () => {
      setState({ visible: false });
    },
  }));

  const onCancel = () => {
    setState({ visible: false });
  };

  const selectTheme = (theme) => () => {
    document.getElementsByTagName("html")[0].setAttribute("data-theme", theme);
    localStorage.setItem("dataTheme", theme);
    // dispatch(tvShow.changeTheme(theme));
  };

  return (
    <WrapModal
      open={state.visible}
      title={<WrapTitle>Cá nhân hóa Dashboards Trình chiếu TIVI</WrapTitle>}
      width={"66vw"}
      footer={null}
      onCancel={onCancel}
    >
      <WrapTitle>
        Chọn 1 màu sắc, Command Center sẽ thay đổi chủ đề Dashboards theo màu
        sắc bạn chọn
      </WrapTitle>
      <div className="select-theme">
        {themeOption.map((item) => (
          <div
            key={item.key}
            className={"select-theme-item"}
            onClick={selectTheme(item.key)}
          >
            <div
            // className={"theme-bg" + (themeKey === item.key ? " active" : "")}
            >
              <item.icon style={{ width: "30vw", height: "26vw" }}></item.icon>
            </div>
            <WrapTitle>
              {/* {themeKey === item.key && (
                <IcCircleCheck
                  style={{
                    width: "1.55vw",
                    height: "1.55vw",
                    marginRight: "0.2vw",
                    marginBottom: "0.1vw",
                  }}
                ></IcCircleCheck>
              )} */}
              {item.title}
            </WrapTitle>
          </div>
        ))}
      </div>
    </WrapModal>
  );
};

export default memo(forwardRef(ModalTheme));
