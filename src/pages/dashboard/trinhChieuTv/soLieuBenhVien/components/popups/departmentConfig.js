import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Button, Modal } from "antd";
import Loading from "../common/Loading";

const moveRightIcon = (
  <svg
    width={(window.innerWidth / 3840) * 100}
    height={(window.innerWidth / 3840) * 100}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M49.9997 91.6664C44.4136 91.7064 38.88 90.5854 33.7497 88.3747C23.7805 84.154 15.8454 76.2189 11.6247 66.2497C9.414 61.1195 8.2931 55.5859 8.33306 49.9997C8.2931 44.4136 9.414 38.88 11.6247 33.7497C15.8454 23.7805 23.7805 15.8454 33.7497 11.6247C38.88 9.414 44.4136 8.2931 49.9997 8.33306C55.5859 8.2931 61.1195 9.414 66.2497 11.6247C76.2189 15.8454 84.154 23.7805 88.3747 33.7497C90.5854 38.88 91.7064 44.4136 91.6664 49.9997C91.7064 55.5859 90.5854 61.1195 88.3747 66.2497C84.154 76.2189 76.2189 84.154 66.2497 88.3747C61.1195 90.5854 55.5859 91.7064 49.9997 91.6664ZM49.9997 83.3331C54.3886 83.4076 58.746 82.5808 62.8025 80.9037C66.859 79.2267 70.5282 76.7351 73.5831 73.5831C76.7351 70.5282 79.2267 66.859 80.9037 62.8025C82.5808 58.746 83.4076 54.3886 83.3331 49.9997C83.4076 45.6109 82.5808 41.2534 80.9037 37.197C79.2267 33.1405 76.7351 29.4713 73.5831 26.4164C70.5282 23.2644 66.859 20.7728 62.8025 19.0957C58.746 17.4187 54.3886 16.5918 49.9997 16.6664C45.6109 16.5918 41.2534 17.4187 37.197 19.0957C33.1405 20.7728 29.4713 23.2644 26.4164 26.4164C23.2644 29.4713 20.7728 33.1405 19.0957 37.197C17.4187 41.2534 16.5918 45.6109 16.6664 49.9997C16.5918 54.3886 17.4187 58.746 19.0957 62.8025C20.7728 66.859 23.2644 70.5282 26.4164 73.5831C29.4713 76.7351 33.1405 79.2267 37.197 80.9037C41.2534 82.5808 45.6109 83.4076 49.9997 83.3331ZM28.0414 55.1664H58.0831L51.4581 61.7914L57.3747 67.6664L74.0414 50.9997L57.3747 34.3331L51.4581 40.2914L57.9997 46.8331H28.1247L28.0414 55.1664Z"
      fill="#EB5757"
    />
  </svg>
);

const moveLeftIcon = (
  <svg
    width={(window.innerWidth / 3840) * 100}
    height={(window.innerWidth / 3840) * 100}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50.0003 8.3336C55.5864 8.29364 61.12 9.41455 66.2503 11.6253C76.2195 15.846 84.1546 23.7811 88.3753 33.7503C90.586 38.8805 91.7069 44.4141 91.6669 50.0003C91.7069 55.5864 90.586 61.12 88.3753 66.2503C84.1546 76.2195 76.2195 84.1546 66.2503 88.3753C61.12 90.586 55.5864 91.7069 50.0003 91.6669C44.4141 91.7069 38.8805 90.586 33.7503 88.3753C23.7811 84.1546 15.846 76.2195 11.6253 66.2503C9.41455 61.12 8.29365 55.5864 8.33361 50.0003C8.29365 44.4141 9.41456 38.8805 11.6253 33.7503C15.846 23.781 23.7811 15.8459 33.7503 11.6253C38.8805 9.41455 44.4141 8.29364 50.0003 8.3336ZM50.0003 16.6669C45.6114 16.5924 41.254 17.4192 37.1975 19.0963C33.141 20.7733 29.4718 23.2649 26.4169 26.4169C23.2649 29.4718 20.7733 33.141 19.0963 37.1975C17.4192 41.254 16.5924 45.6114 16.6669 50.0003C16.5924 54.3891 17.4192 58.7466 19.0963 62.803C20.7733 66.8595 23.2649 70.5287 26.4169 73.5836C29.4718 76.7356 33.141 79.2272 37.1975 80.9043C41.254 82.5813 45.6114 83.4082 50.0003 83.3336C54.3891 83.4082 58.7466 82.5813 62.803 80.9043C66.8595 79.2272 70.5287 76.7356 73.5836 73.5836C76.7356 70.5287 79.2272 66.8595 80.9043 62.803C82.5813 58.7466 83.4082 54.3891 83.3336 50.0003C83.4082 45.6114 82.5813 41.254 80.9043 37.1975C79.2272 33.141 76.7356 29.4718 73.5836 26.4169C70.5287 23.2649 66.8595 20.7733 62.803 19.0963C58.7466 17.4192 54.3891 16.5924 50.0003 16.6669ZM71.9586 44.8336L41.9169 44.8336L48.5419 38.2086L42.6253 32.3336L25.9586 49.0003L42.6253 65.6669L48.5419 59.7086L42.0003 53.1669L71.8753 53.1669L71.9586 44.8336Z"
      fill="#1C75BC"
    />
  </svg>
);

const animation_item_appear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
  }
`;

const ModalStyled = styled(Modal)`
  width: calc(100vw / 3840 * 2700) !important;
  .ant-modal-title {
    text-align: center;
    font-weight: 700;
    font-size: calc(100vw / 3840 * 60);
    line-height: calc(100vw / 3840 * 82);
    color: #172b4d;
  }
  .sub {
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: calc(100vw / 3840 * 60);
    line-height: calc(100vw / 3840 * 82);
    color: #172b4d;
  }
  .actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    button {
      font-weight: 400;
      font-size: calc(100vw / 3840 * 46.555);
      line-height: calc(100vw / 3840 * 64);
      color: #172b4d;
    }
    .ant-btn.ant-btn-primary {
      color: white !important;
    }
  }
  .selection-pane {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .left-pane,
    .right-pane {
      margin-top: 0.5em;
      .pane-title {
        font-weight: 700;
        font-size: calc(100vw / 3840 * 60);
        line-height: calc(100vw / 3840 * 82);
        color: #172b4d;
        align-items: center;
        text-align: center;
      }
      .pane-content {
        height: calc(100vw / 3840 * 1220);
        width: calc(100vw / 3840 * 1170);
        overflow: scroll;
        background: #ffffff;
        border-radius: calc(100vw / 3840 * 16);
        border: 1px solid;
        border-image-source: linear-gradient(
            0deg,
            rgba(23, 43, 77, 0.5),
            rgba(23, 43, 77, 0.5)
          ),
          linear-gradient(0deg, #ffffff, #ffffff);
        .pane-item {
          animation: ${animation_item_appear} 200ms ease-in-out;
          transition: height 200ms;
          width: 100%;
          padding: 0.5em;
          display: flex;
          align-items: center;
          height: calc(100vw / 3840 * 122);
          cursor: pointer;
          font-weight: 700;
          font-size: calc(100vw / 3840 * 60);
          line-height: calc(100vw / 3840 * 82);
          color: #172b4d;
          &.active {
            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.8),
                rgba(255, 255, 255, 0.8)
              ),
              #1c75bc;
          }
          :hover {
            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.8),
                rgba(255, 255, 255, 0.8)
              ),
              #1c75bc;
          }
        }
      }
    }
    .pane-actions {
      display: flex;
      justify-content: center;
      alignn-items: center;
      button {
        border: none !important;
        background: transparent !important;
        height: fit-content;
      }
    }
    .pane-footer {
      width: 100%;
      text-align: center;
      font-weight: 700;
      font-size: calc(100vw / 3840 * 60);
      line-height: calc(100vw / 3840 * 82);
      color: #172b4d;
    }
  }
  .actions {
    button {
      height: fit-content;
      width: fit-content !important;
    }
  }
`;

const DepartmentConfig = React.memo((props) => {
  const {
    visible,
    onClose,
    texts = {
      sub: "Chọn khoa hiển thị trên biểu đồ",
      title: "Tùy chỉnh",
      cancel: "Hủy",
      save: "Lưu",
      show: "Hiển thị",
      hide: "Không hiển thị",
    },
    data = [],
    showingKey = "name",
    onSubmit,
    loading = false,
    defaultValue = [],
    id = "dark-bar-chart",
  } = props;

  const [selectedDepartments, setSelectedDepartments] = useState(defaultValue);
  const [unselectedDepartments, setUnselectedDepartments] = useState(data);
  const [selected, setSelected] = useState(null);
  const [showingButton, setShowingButton] = useState("");

  useEffect(() => {
    setSelectedDepartments(defaultValue);
    setUnselectedDepartments(
      data.filter((item) => !defaultValue.map((it) => it.id).includes(item.id))
    );
  }, [props.defaultValue, props.data]);

  const handleSubmit = () => {
    onSubmit &&
      onSubmit(selectedDepartments, () => {
        onClose && onClose();
      });
  };

  const handleSelect = useCallback(() => {
    if (!selected) return;
    const selectedIndex = unselectedDepartments.indexOf(selected);
    const nextItem = unselectedDepartments[selectedIndex + 1] || null;
    const prevItem = unselectedDepartments[selectedIndex - 1] || null;
    setSelectedDepartments((prev) => [...prev, selected]);
    setUnselectedDepartments((prev) =>
      prev.filter((item) => item.id !== selected.id)
    );
    if (nextItem) {
      setSelected(nextItem);
    } else if (prevItem) {
      setSelected(prevItem);
    } else {
      setShowingButton("");
    }
    setTimeout(() => {
      const addedElement = document.querySelector(
        `#department-config-left-pane-${id} .pane-content`
      )?.lastChild;
      addedElement &&
        addedElement.scrollIntoView({
          behavior: "smooth",
        });
    }, 0);
  }, [selected]);

  const handleUnselect = useCallback(() => {
    if (!selected) return;
    const selectedIndex = selectedDepartments.indexOf(selected);
    const nextItem = selectedDepartments[selectedIndex + 1] || null;
    const prevItem = selectedDepartments[selectedIndex - 1] || null;
    setUnselectedDepartments((prev) => [...prev, selected]);
    setSelectedDepartments((prev) =>
      prev.filter((item) => item.id !== selected.id)
    );
    if (nextItem) {
      setSelected(nextItem);
    } else if (prevItem) {
      setSelected(prevItem);
    } else {
      setShowingButton("");
    }
    const addedElement = document.querySelector(
      `#department-config-right-pane-${id} .pane-content`
    )?.lastChild;
    addedElement &&
      addedElement.scrollIntoView({
        behavior: "smooth",
      });
  }, [selected]);

  const renderPane = (dataSource, titleText, paneKey) => {
    return (
      <div>
        {loading && <Loading type="chart" isAbsolute />}
        <div className="pane-title">{titleText}</div>
        <div className="pane-content">
          {dataSource?.map((item) => (
            <div
              key={item.id}
              className={`pane-item ${
                item.id === selected?.id ? "active" : ""
              }`}
              onClick={() => {
                setSelected(item);
                setShowingButton(paneKey);
              }}
            >
              {item[showingKey]}
            </div>
          ))}
        </div>
        <div className="pane-footer">
          {dataSource?.length}/{data.length}
        </div>
      </div>
    );
  };

  return (
    <ModalStyled
      visible={visible}
      footer={false}
      onCancel={onClose}
      title={texts.title}
    >
      <div className="sub">{texts.sub}</div>
      <div className="selection-pane">
        <div id={`department-config-left-pane-${id}`} className="left-pane">
          {renderPane(selectedDepartments, texts.show, "show")}
        </div>
        <div className="pane-actions">
          {showingButton === "hide" && (
            <Button className="select" onClick={handleSelect}>
              {moveLeftIcon}
            </Button>
          )}
          {showingButton === "show" && (
            <Button className="unselect" onClick={handleUnselect}>
              {moveRightIcon}
            </Button>
          )}
        </div>
        <div id={`department-config-right-pane-${id}`} className="right-pane">
          {renderPane(unselectedDepartments, texts.hide, "hide")}
        </div>
      </div>
      <div className="actions">
        <Button type="default" onClick={onClose}>
          {texts.cancel}
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          {texts.save}
        </Button>
      </div>
    </ModalStyled>
  );
});

export default DepartmentConfig;
