import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { ModalStyled, Main, ContentTable } from "./styled";
import TableWrapper from "components/TableWrapper";
import { HeaderSearch } from "components";
import { useDispatch, useSelector } from "react-redux";
import { SelectOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { cloneDeep } from "lodash";
import { message, Button as AntButton } from "antd";

const ModalTimKiemDV = (props, ref) => {
  //state
  const [state, _setState] = useState({
    show: false,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  //redux
  const {
    dichVuKSK: { listSearchDV, listGiamGiaByDV },
  } = useSelector((state) => state);

  const {
    dichVuKSK: { updateData },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
      });
    },
  }));

  const listSearchDVMemo = useMemo(() => {
    return listSearchDV.map((item, index) => {
      return {
        ...item,
        index: index + 1,
      };
    });
  }, [listSearchDV]);

  //function
  function onClose() {
    setState({ show: false });
  }

  function onSelectDV(item) {
    const _index = listGiamGiaByDV.findIndex(
      (x) => x.dichVuId === item.dichVuId
    );

    if (_index === -1) {
      const _listGiamGiaByDV = cloneDeep(listGiamGiaByDV);
      _listGiamGiaByDV.push({
        tenDichVu: item.ten,
        dichVuId: item.dichVuId,
        phanTramGiamGia: 0,
      });

      updateData({ listGiamGiaByDV: _listGiamGiaByDV });
      onClose();
    } else {
      message.error("Dịch vụ đã được chọn");
    }
  }

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        console.log("record", record);
        onSelectDV(record);
      },
    };
  };

  //columns
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      dataIndex: "index",
      align: "center",
      width: 80,
    },
    {
      title: <HeaderSearch title="Mã dịch vụ" />,
      dataIndex: "ma",
      width: 150,
    },
    {
      title: <HeaderSearch title="Dịch vụ" />,
      dataIndex: "ten",
    },
    {
      title: <HeaderSearch title="Tiện ích" />,
      align: "center",
      width: 100,
      render: (field, item, index) => <SelectOutlined />,
    },
  ];

  return (
    <ModalStyled
      width={"60%"}
      visible={state.show}
      footer={null}
      closable={false}
      onCancel={onClose}
      title={
        <div className="header-title">
          <div className="title">Chọn dịch vụ</div>
        </div>
      }
    >
      <Main>
        <ContentTable>
          <TableWrapper
            onRow={onRow}
            columns={columns}
            dataSource={listSearchDVMemo || []}
          />
        </ContentTable>

        <div className="footer-action">
          <AntButton
            type="text"
            className="back-text"
            icon={<ArrowLeftOutlined />}
            onClick={onClose}
          >
            Quay lại
          </AntButton>
        </div>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalTimKiemDV);
