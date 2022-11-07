import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import Icon, { FolderAddOutlined, FileAddOutlined } from "@ant-design/icons";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import { TableWrapper, Button } from "components";
import { GlobalStyle, Main } from "./styled";
import { Popover, Table, Image } from "antd";
import IconEdit from "assets/svg/thuNgan/iconPencel.svg";
import IconDelete from "assets/svg/kho/delete.svg";
import IconCamera from "assets/svg/chuanDoanHinhAnh/camera-turn-on.svg";
import IconFolder from "assets/svg/folder.svg";
import IconAdd from "assets/svg/chuanDoanHinhAnh/add.svg";

import IconImage from "assets/svg/imagesmode.svg";
import IconBack from "assets/svg/tiep-don/iconBack.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { refCamera, refConfirm } from "app";
import ModalAddEditFileOrFolder from "./ModalAddEditFileOrFolder";
import fileUtils from "utils/file-utils";
import { clone, cloneDeep } from "lodash";
import ModalPdfView from "./ModalPdfView";

const { Column } = TableWrapper;

const ModalFolderAndFile = (props, ref) => {
  const [state, _setState] = useState({
    data: [],
    listIdFolderPrev: [],
    title: "Giấy tờ tải lên",
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const refModalFoderAndFile = useRef(null);
  const refModalAddEdit = useRef(null);
  const refModalPdfView = useRef(null);

  const {
    hoSoBenhAn: {
      getFileAndFolder,
      deleteFileOrFolder,
      uploadImage,
      editFileOrFolder,
      createFileOrFolder,
    },
  } = useDispatch();
  const getLitsUrl = async (list) => {
    let promiseAll = [];
    list.forEach((image) => {
      promiseAll.push(fileUtils.getImg({ src: image.duongDan }));
    });

    let listUrl = await Promise.all(promiseAll);
    listUrl = listUrl.map((item, index) => ({
      url: item,
      id: list[index].id,
    }));
    setState({
      listImage: listUrl,
    });
  };
  useEffect(() => {
    const listImage = state.data.filter((image) => image.loai == 20);
    getLitsUrl(listImage);
  }, [state.data]);
  const { t } = useTranslation();
  const getData = ({
    fileChinh,
    nbThongTinId,
    isSelectFolder = false,
    isBack = false,
    fileCha,
  }) => {
    getFileAndFolder({ fileChinh, nbThongTinId, fileChaId: fileCha?.id })
      .then((s) => {
        refModalFoderAndFile.current && refModalFoderAndFile.current.show();
        if (isSelectFolder || fileChinh) {
          setState({
            data: s,
            nbThongTinId,
            title: fileChinh ? "Giấy tờ tải lên" : fileCha.ten,
            listIdFolderPrev: fileChinh
              ? []
              : [...state.listIdFolderPrev, fileCha],
          });
        }

        if (isBack) {
          const listIdFolderPrev = state.listIdFolderPrev.slice(
            0,
            state.listIdFolderPrev.length - 1
          );
          setState({
            data: s,
            nbThongTinId,
            listIdFolderPrev: fileChinh ? [] : listIdFolderPrev,
            title: fileChinh ? "Giấy tờ tải lên" : fileCha.ten,
          });
        }
      })
      .catch((e) => {
        refModalFoderAndFile.current && refModalFoderAndFile.current.show();
      });
  };
  useImperativeHandle(ref, () => ({
    show: ({ nbThongTinId }) => {
      getData({ fileChinh: true, nbThongTinId });
    },
  }));

  function isIOSDevice() {
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  }
  const upLoad = (data) => {
    createFileOrFolder(data).then((s) => {
      setState({
        data: [...state.data, s],
      });
      refModalAddEdit.current.hide();
    });
  };
  const update = (data) => {
    editFileOrFolder(data).then((s) => {
      const findIndex = state.data.findIndex((item) => item.id === s.id);
      if (findIndex >= 0) {
        state.data[findIndex] = s;

        setState({
          data: cloneDeep(state.data),
        });
        refModalAddEdit.current.hide();
      }
    });
  };
  const handleSelectFolder = (item) => {
    getData({
      nbThongTinId: state.nbThongTinId,
      fileChinh: false,
      fileCha: item,
      isSelectFolder: true,
    });
  };
  const handleEdit = async (item) => {
    let src = "";
    if (item.loai === 20) {
      src = await fileUtils.getImg({ src: item.duongDan });
    }
    refModalAddEdit.current.show(
      {
        data: state.data,
        loai: item.loai,
        ten: item.ten,
        item: item,
        duongDan: item.duongDan,
        src: src,
      },
      (data) => {
        update(data);
      }
    );
  };
  const handleDelete = (item) => {
    const onDelete = () => {
      deleteFileOrFolder({ id: item.id }).then((s) => {
        setState({
          data: state.data.filter((el) => el.id !== item.id),
        });
      });
    };
    refConfirm.current.show(
      {
        title: "Thông báo",
        typeModal: "warning",
        content: `Bạn có chắc chắn muốn xóa ${
          item.loai === 10 ? `thư mục` : `file`
        } ${item.ten}`,

        cancelText: "Hủy",
        okText: "Đồng ý",
        showBtnOk: true,
      },
      () => onDelete(item.id)
    );
  };
  const handleBack = () => {
    getData({
      nbThongTinId: state.nbThongTinId,
      fileChinh: state.listIdFolderPrev.length - 1 === 0 ? true : false,
      fileCha:
        state.listIdFolderPrev.length - 1 === 0
          ? null
          : state.listIdFolderPrev[state.listIdFolderPrev.length - 2],
      isSelectFolder: false,
      isBack: true,
    });
  };
  const onClickPreview = async (item) => {
    if (item?.ten.includes(".pdf")) {
      refModalPdfView.current &&
        refModalPdfView.current.show({ srcPdf: item.duongDan, ten: item.ten });
    } else {
      const src = await fileUtils.getImg({ src: item.duongDan });
      const current = state.listImage.findIndex((el) => el.id === item.id);
      setState({
        current,
        visible: true,
        src: src,
      });
    }
  };
  const renderName = (item) => {
    if (item) {
      if (item?.loai === 10) {
        return (
          <span
            onClick={() => handleSelectFolder(item)}
            className="name-folder"
          >
            <span className="name">
              <IconFolder className="icon icon-image"></IconFolder>
              {item?.ten}
            </span>
          </span>
        );
      } else {
        return (
          <span className="name-folder">
            <span className="name" onClick={() => onClickPreview(item)}>
              <IconImage className="icon icon-image"></IconImage>
              {item.ten}
            </span>
          </span>
        );
      }
    }
  };

  const handleShowCamera = () => {
    refCamera.current.show(
      {
        title: "Chụp ảnh",
        show: true,
      },
      (file) => {
        uploadImage({ file }).then((s) => {
          refModalAddEdit.current.show(
            {
              data: state.data,
              loai: 20,
              ten: `picture_${new Date().getTime()}`,
              duongDan: s,
              file,
              src: URL.createObjectURL(file),
              nbThongTinId: state.nbThongTinId,
              fileChaId: state.listIdFolderPrev.length
                ? state.listIdFolderPrev[state.listIdFolderPrev.length - 1]?.id
                : null,
            },
            (data) => {
              upLoad(data);
            }
          );
        });
        return new Promise((resolve, reject) => {
          resolve("oke");
        });
      }
    );
  };
  const handleAddFolderOrFile = (type) => {
    refModalAddEdit.current.show(
      {
        data: state.data,
        loai: type,
        ten: "",
        nbThongTinId: state.nbThongTinId,
        fileChaId: state.listIdFolderPrev.length
          ? state.listIdFolderPrev[state.listIdFolderPrev.length - 1].id
          : null,
      },
      (data) => {
        upLoad(data);
      }
    );
  };
  const onChangeImage = async (file) => {
    uploadImage({ file }).then((s) => {
      refModalAddEdit.current.show(
        {
          data: state.data,
          loai: 20,
          ten: `picture_${new Date().getTime()}`,
          duongDan: s,
          file,
          src: URL.createObjectURL(file),
          nbThongTinId: state.nbThongTinId,
          fileChaId: state.listIdFolderPrev.length
            ? state.listIdFolderPrev[state.listIdFolderPrev.length - 1]?.id
            : null,
        },
        (data) => {
          upLoad(data);
        }
      );
    });
  };
  const content = (
    <div className="list-action-upload">
      <p className="item icon-folder" onClick={() => handleAddFolderOrFile(10)}>
        <FolderAddOutlined />
        Thư mục
      </p>
      <p
        className="item icon-upload-file"
        onClick={() => handleAddFolderOrFile(20)}
      >
        <FileAddOutlined />
        Tệp tải lên
      </p>

      {isIOSDevice() ? (
        <p className="item">
          <label for="upload-photo">
            <Icon component={IconCamera}></Icon>
            Chụp ảnh
          </label>
          <input
            style={{
              opacity: 0,
              position: "absolute",
              zIndex: "-1",
            }}
            onChange={(e) => {
              onChangeImage(e.target.files[0]);
            }}
            type="file"
            accept="image/*"
            id="upload-photo"
          />
        </p>
      ) : (
        <p className="item" onClick={handleShowCamera}>
          <Icon component={IconCamera}></Icon>
          Chụp ảnh
        </p>
      )}
    </div>
  );
  const columns = [
    Column({
      title: t("hsba.ten"),
      dataIndex: "ten",
      key: 1,
      align: "center",
      i18Name: "hsba.ten",
      sorter: {
        compare: (a, b) => a.ten.localeCompare(b.ten),
      },
      render: (e, item) => {
        return renderName(item);
      },
    }),
    Column({
      title: t("hsba.ngayTao"),
      dataIndex: "thoiGianThucHien",
      key: 2,
      align: "center",
      i18Name: "hsba.ngayTao",
      sorter: {
        compare: (a, b) => {
          return (
            new Date(a.thoiGianThucHien).getTime() -
            new Date(b.thoiGianThucHien).getTime()
          );
        },
      },
      render: (field, item) => {
        return moment(item.thoiGianThucHien).format("DD/MM/YYYY LT");
      },
    }),
    Column({
      title: t("hsba.nguoiTao"),
      dataIndex: "tenNhanVien",
      key: 3,
      align: "center",
      i18Name: "hsba.nguoiTao",
      sorter: {
        compare: (a, b) => {
          return a.tenNhanVien.localeCompare(b.tenNhanVien);
        },
      },
    }),
    Column({
      title: t("common.tienIch"),
      dataIndex: "id",
      key: 4,
      align: "center",
      i18Name: "common.tienIch",
      width: 50,
      render: (field, item) => {
        return (
          <span className="action">
            <Icon
              className="icon-edit"
              component={IconEdit}
              onClick={() => handleEdit(item)}
            ></Icon>
            <Icon
              component={IconDelete}
              className="icon-delete"
              onClick={() => handleDelete(item)}
            ></Icon>
          </span>
        );
      },
    }),
  ];
  return (
    <ModalTemplate
      width={1140}
      ref={refModalFoderAndFile}
      closable={true}
      wrapClassName={"modal-folder-and-file"}
      title={
        <span style={{ display: "flex", alignItems: "center" }}>
          {state.listIdFolderPrev.length ? (
            <IconBack className="icon-back" onClick={handleBack}></IconBack>
          ) : null}
          <span style={{ margin: "0px 10px" }}>
            {state.title || t("hsba.giayToTaiLen")}
          </span>
          <Popover
            overlayClassName="popover-upload"
            content={content}
            placement="bottom"
          >
            <Button type="success" className="btn-add">
              {t("common.themMoi")}
              <IconAdd></IconAdd>
            </Button>
          </Popover>
        </span>
      }
    >
      <GlobalStyle></GlobalStyle>
      <Main>
        <TableWrapper
          className="table-folder"
          scroll={{ y: 100 }}
          columns={columns}
          dataSource={state.data}
          rowKey={(record) => record?.id}
          pagination={false}
        ></TableWrapper>
      </Main>
      <Image
        width={200}
        style={{
          display: "none",
        }}
        src={state.src}
      />
      <div
        style={{
          display: "none",
        }}
      >
        <Image.PreviewGroup
          preview={{
            current: state.current,
            visible: state.visible,
            onVisibleChange: (value) => {
              setState({
                visible: value,
              });
            },
          }}
        >
          {(state.listImage || []).map((item, index) => (
            <Image src={item.url} key={index} />
          ))}
        </Image.PreviewGroup>
      </div>

      <ModalAddEditFileOrFolder
        ref={refModalAddEdit}
      ></ModalAddEditFileOrFolder>
      <ModalPdfView ref={refModalPdfView} />
    </ModalTemplate>
  );
};

export default forwardRef(ModalFolderAndFile);
