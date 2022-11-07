import React, { useEffect, useRef, useState } from "react";
import { Form } from "antd";
import TableWrapper from "components/TableWrapper";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TabPanel from "components/MultiLevelTab/TabPanel";
import { connect, useDispatch } from "react-redux";

const KhaiBaoGiamGia = ({ layerId, ...props }) => {
  const [form] = Form.useForm();

  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
    listAllLoaiDoiTuong: [],
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { onRegisterHotkey } = useDispatch().phimTat;
  const refClickBtnSave = useRef();
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
  }, []);

  const onSave = () => {
    form
      .validateFields()
      .then((values) => {
        props.handleSubmit(values);
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = onSave;

  const onRow = (record = {}, index) => {
    return {
      onClick: (event) => {
        setState({
          currentItem: JSON.parse(JSON.stringify(record)),
          currentIndex: index,
        });
      },
    };
  };
  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    props.onChangeInputSearch({
      [key]: value,
      // dichVuId,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
  ];

  return (
    <TabPanel>
      <EditWrapper
        title="Khai báo giảm giá"
        onCancel={props.onCancel}
        onSave={onSave}
        showAdded={true}
        isShowSaveButton={true}
        isShowCancelButton={true}
      >
        <TableWrapper
          scroll={{ y: 500, x: 700 }}
          columns={columns}
          dataSource={[]}
          onRow={onRow}
        ></TableWrapper>
      </EditWrapper>
    </TabPanel>
  );
};
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, null)(KhaiBaoGiamGia);
