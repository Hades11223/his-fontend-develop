import React, { useEffect, useState } from "react";
import {
  Button,
  HeaderSearch,
  InputTimeout,
  Pagination,
  TableWrapper,
} from "components";
import moment from "moment";
import DeleteIcon from "assets/svg/ic-delete.svg";
import XMarkIcon from "assets/svg/x-mark.svg";
import { Checkbox, Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DsHangHoaWrapper } from "../styled";
import { useLoading } from "hook";

const DanhSachHangHoa = (props) => {
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const {
    traHangHoa: { listHangHoaTra = [], dataSearch },
  } = useSelector((state) => state);
  const {
    danhSachNguoiBenhNoiTru: {
      postDsDvThuocTraKho,
      putDsDvThuocTraKho,
      deleteDsDvThuocTraKho,
    },
    traHangHoa: { getListHangHoa, postDsDvThuocTraKhoTatCa },
  } = useDispatch();

  const [state, _setState] = useState({
    dataSource: [],
    newDataDsTra: [],
    editDataDsTra: [],
    currentIndex: { hs1: null, hs2: null },

    totalElements: 0,
    page: 0,
    size: 10,
  });

  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  useEffect(() => {
    const fromIndex = state.page * state.size;
    const toIndex = Math.min(
      (state.page + 1) * state.size,
      listHangHoaTra.length
    );
    setState({
      dataSource: [...listHangHoaTra].slice(fromIndex, toIndex),
      totalElements: listHangHoaTra?.length || 0,
      page: state.page,
      size: state.size,
    });
  }, [listHangHoaTra, state.page, state.size]);

  const { dataSource, newDataDsTra, editDataDsTra } = state;

  const onChange =
    ({ key, hs1, hs2, data }) =>
    (value) => {
      setTimeout(() => {
        dataSource[hs1].dsTra[hs2][key] = value;

        let arrEditDataDsTra = [...editDataDsTra];
        if (data.id) {
          // edit
          const indexResult = editDataDsTra.findIndex(
            (itemDataDsTra) => itemDataDsTra.id === data.id
          );

          if (indexResult >= 0) {
            editDataDsTra[indexResult] = {
              ...editDataDsTra[indexResult],
              soLuongTra: value,
            };
            arrEditDataDsTra = [...editDataDsTra];
          } else {
            arrEditDataDsTra = [
              ...editDataDsTra,
              {
                ...data,
                hs1,
                hs2,
                key: `key${hs1}-${dataSource[hs2].dsTra.length - 1}`,
                soLuongTra: value,
              },
            ];
          }
        } else {
          // new
          const indexResult = newDataDsTra.findIndex(
            (itemDataDsTra) => itemDataDsTra.timestamp === data.timestamp
          );

          newDataDsTra[indexResult] = {
            ...newDataDsTra[indexResult],
            soLuongTra: value,
          };
        }
        setState({
          dataSource,
          newDataDsTra,
          editDataDsTra: arrEditDataDsTra,
        });
      }, 500);
    };

  const onAddNewRow =
    ({ item, index }) =>
    () => {
      // +1 index for add list
      const newData = {
        timestamp: moment().unix(),
        hs1: index,
        hs2: dataSource[index].dsTra.length - 1,
        nbDichVuId: item.id,
        key: `key${index}-${dataSource[index].dsTra.length - 1}`,
      };
      dataSource[index].dsTra.push(newData);

      setState({
        dataSource,
        // -1 index for current status
        newDataDsTra: [
          ...newDataDsTra,
          {
            timestamp: moment().unix(),
            hs1: index,
            hs2: dataSource[index].dsTra.length - 1,
            nbDichVuId: item.id,
            key: `key${index}-${dataSource[index].dsTra.length - 1}`,
          },
        ],
        currentIndex: { hs1: index, hs2: dataSource[index].dsTra.length - 1 },
      });
    };

  const onRemoveItemDsTra =
    ({ hs1, hs2, data }) =>
    () => {
      if (data.id) {
        // note
        const indexResult1 = dataSource[hs1].dsTra.findIndex(
          (item) => item.id === data.id
        );
        const indexResult2 = editDataDsTra.findIndex(
          (item) => item.id === data.id
        );

        if (indexResult1 >= 0) dataSource[hs1].dsTra.splice(indexResult1, 1);
        if (indexResult2 >= 0) {
          editDataDsTra.splice(indexResult2, 1);
        } else {
          handleRemove(data.id);
        }
      } else {
        const indexResult1 = dataSource[hs1].dsTra.findIndex(
          (item) => item.timestamp === data.timestamp
        );
        const indexResult2 = newDataDsTra.findIndex(
          (item) => item.timestamp === data.timestamp
        );
        if (indexResult1 >= 0) dataSource[hs1].dsTra.splice(indexResult1, 1);
        if (indexResult2 >= 0) newDataDsTra.splice(indexResult2, 1);
      }

      setState({ dataSource, editDataDsTra, newDataDsTra });
    };

  const handleSubmit = async () => {
    showLoading();
    try {
      if (dataSearch?.traTatCa) {
        await postDsDvThuocTraKhoTatCa({
          nbDotDieuTriId: id,
          khoId: dataSearch.khoId,
          dichVuId: null,
          tuThoiGianThucHien:
            dataSearch.tuThoiGianThucHien &&
            dataSearch.tuThoiGianThucHien instanceof moment
              ? dataSearch.tuThoiGianThucHien.format("DD-MM-YYYY HH:mm:ss")
              : undefined,
          denThoiGianThucHien:
            dataSearch.denThoiGianThucHien &&
            dataSearch.denThoiGianThucHien instanceof moment
              ? dataSearch.denThoiGianThucHien.format("DD-MM-YYYY HH:mm:ss")
              : undefined,
        });
      } else {
        if (newDataDsTra.length) {
          await Promise.allSettled(
            newDataDsTra.map((itemDsTra) => {
              if (itemDsTra.nbDichVuId && itemDsTra.soLuongTra) {
                return new Promise((resolve, reject) => {
                  postDsDvThuocTraKho([
                    {
                      nbDichVuId: itemDsTra.nbDichVuId,
                      soLuong: itemDsTra.soLuongTra,
                    },
                  ])
                    .then((s) => {
                      if (s.code === 0) resolve(s?.data);
                      else reject(s?.data);
                    })
                    .catch((e) => reject(e));
                });
              }
            })
          );
        }
        if (editDataDsTra.length) {
          await Promise.allSettled(
            editDataDsTra.map((itemDsTra) => {
              if (itemDsTra.nbDichVuId && itemDsTra.soLuongTra) {
                return new Promise((resolve, reject) => {
                  const {
                    id,
                    nbDotDieuTriId,
                    tenNb,
                    maNb,
                    maHoSo,
                    nbDichVuId,
                    khoaChiDinhId,
                    loaiDichVu,
                    thoiGianThucHien,
                    phieuLinhId,
                    khoId,
                    phieuTraId,
                    maDichVu,
                    tenDichVu,
                    soPhieuLinh,
                    soPhieuTra,
                  } = itemDsTra;
                  putDsDvThuocTraKho([
                    {
                      id,
                      nbDotDieuTriId,
                      tenNb,
                      maNb,
                      maHoSo,
                      nbDichVuId,
                      khoaChiDinhId,
                      loaiDichVu,
                      khoId,
                      thoiGianThucHien,
                      phieuLinhId,
                      phieuTraId,
                      maDichVu,
                      tenDichVu,
                      soLuong: itemDsTra.soLuongTra,
                      soPhieuLinh,
                      soPhieuTra,
                    },
                  ])
                    .then((s) => {
                      if (s.code === 0) resolve(s?.data);
                      else reject(s?.data);
                    })
                    .catch((e) => reject(e));
                });
              }
            })
          );
        }
      }

      await getListHangHoa({ nbDotDieuTriId: id });
      hideLoading();
      setState({
        newDataDsTra: [],
        editDataDsTra: [],
      });
    } catch (error) {
      hideLoading();
    }
  };

  const handleRemove = (idData) => {
    showLoading();
    return new Promise((resolve, reject) => {
      deleteDsDvThuocTraKho([idData])
        .then((s) => {
          if (s.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e))
        .finally(async () => {
          await getListHangHoa({ nbDotDieuTriId: id });
          hideLoading();
        });
    });
  };

  const handleCancel = () => {
    setState({
      newDataDsTra: [],
      editDataDsTra: [],
    });
    getListHangHoa({ nbDotDieuTriId: id });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, __, index) => state.page * state.size + index + 1,
    },
    {
      title: <HeaderSearch title="Kê tại kho" />,
      width: "170px",
      dataIndex: "tenKho",
      key: "tenKho",
      render: (item, list, index) => {
        return item;
      },
    },
    {
      title: <HeaderSearch title="Tên hàng hóa" />,
      width: "160px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      render: (item, list, index) => item,
    },
    {
      title: <HeaderSearch title="Lần trả" />,
      width: 120,
      render: (item, list, index) => {
        return (
          <div className="cell">
            <div className="cell-total">
              <div className="cell-total-add">
                <span>Thêm</span>
                <Tooltip title="Thêm lần trả">
                  <XMarkIcon
                    style={{ transform: "rotate(45deg)" }}
                    onClick={onAddNewRow({ item, list, index })}
                  />
                </Tooltip>
              </div>
            </div>
            <div className="cell-list">
              {list.dsTra?.map((itm, idx) => (
                <div className={`cell-item cell-action`} key={itm.id}>
                  {!!itm.id ? <div>Lần {idx + 1}</div> : <div></div>}
                  <Tooltip title="Xóa">
                    <DeleteIcon
                      className="icon-action"
                      onClick={onRemoveItemDsTra({
                        hs1: index,
                        hs2: idx,
                        data: itm,
                      })}
                    />
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        );
      },
    },
    {
      title: <HeaderSearch title="SL yêu cầu trả" />,
      width: 80,
      render: (_, list, index) => (
        <div className="cell">
          <div className="cell-total">
            <div className="cell-total-number">
              {!!list.dsTra?.length && (
                <span>
                  Tổng:{" "}
                  {list.dsTra?.reduce((a, b) => a + (b.soLuongTra || 0), 0)}
                </span>
              )}
            </div>
          </div>
          <div className="cell-list">
            {list.dsTra?.map((itm, idx) => {
              return (
                <div key={itm.id} className={`cell-item `}>
                  <InputTimeout
                    controls={false}
                    type="number"
                    value={itm.soLuongTra}
                    onChange={onChange({
                      key: "soLuongTra",
                      hs1: index,
                      hs2: idx,
                      data: itm,
                    })}
                    min={0}
                    className="cell-item-input"
                    autoFocus={
                      !!(
                        state.currentIndex.hs1 === index &&
                        state.currentIndex.hs2 === idx
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      title: <HeaderSearch title="SL kê" />,
      width: 80,
      align: "right",
      key: "soLuongYeuCau",
      dataIndex: "soLuongYeuCau",
    },
    {
      title: <HeaderSearch title="SL còn lại" />,
      width: 80,
      align: "right",
      render: (item, list, index) =>
        (list?.soLuongYeuCau || 0) - (list?.soLuongYeuCauTra || 0),
    },
    {
      title: <HeaderSearch title="Số phiếu trả" />,
      width: 120,
      render: (_, data, idx) => (
        <div className="cell">
          <div className="cell-total"></div>
          <div className="cell-list">
            {data.dsTra?.map((item, index) => (
              <div key={item.id} className="cell-item">
                {item.soPhieuTra}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: <HeaderSearch title="Ngày trả" />,
      width: 180,
      render: (_, list, idx) => (
        <div className="cell">
          <div className="cell-total"></div>
          <div className="cell-list">
            {list.dsTra?.map((item, index) => (
              <div key={item.id} className="cell-item">
                {item?.thoiGianThucHien
                  ? moment(item.thoiGianThucHien).format("DD/MM/YYYY")
                  : ""}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: <HeaderSearch title="Ngày tạo" />,
      width: 160,
      dataIndex: "thoiGianThucHien",
      render: (item) => (
        <div className="cell">
          <div className="cell-total">{moment(item).format("DD/MM/YYYY")}</div>
        </div>
      ),
    },
    {
      title: <HeaderSearch title="Đã phát" />,
      width: 80,
      dataIndex: "phat",
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
  ];

  const onChangePage = (page) => {
    setState({
      page: page - 1,
    });
  };

  const onSizeChange = (size) => {
    setState({
      size: size,
    });
  };

  return (
    <DsHangHoaWrapper>
      <div>
        <div className="table-content">
          <TableWrapper
            showHeaderTable={true}
            title={"Danh sách hàng hóa"}
            columns={columns}
            dataSource={dataSource}
          />
        </div>

        {state.totalElements && (
          <Pagination
            onChange={onChangePage}
            onShowSizeChange={onSizeChange}
            current={state.page + 1}
            pageSize={state.size}
            total={state.totalElements}
            listData={dataSource}
          />
        )}
      </div>

      <div className="button-bottom-modal">
        <Button
          type={"default"}
          onClick={handleCancel}
          iconHeight={15}
          rightIcon={<CloseOutlined />}
          minWidth={100}
        >
          Hủy
        </Button>
        <Button
          type={"primary"}
          onClick={handleSubmit}
          minWidth={100}
          rightIcon={
            <img
              style={{ marginLeft: 6 }}
              src={require("assets/images/kho/save.png")}
              alt=""
            ></img>
          }
          iconHeight={15}
        >
          Lưu
        </Button>
      </div>
    </DsHangHoaWrapper>
  );
};

DanhSachHangHoa.propTypes = {};

export default DanhSachHangHoa;
