import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import T from "prop-types";
import { Main } from "./styled";
import CheckBox from "./CheckBox";
import { useDispatch } from "react-redux";
import { MODE } from "utils/editor-utils";
import EMRContext from "pages/editor/context/EMR";
import { useStore } from "hook";

const CheckGroups = forwardRef((props, ref) => {
  const signStatus = useStore("files.signStatus", {});
  const context = useContext(EMRContext);

  const {
    component: { init, updateOne },
  } = useDispatch();

  const { component, mode, formChange, form, blockWidth } = props;
  const mainRef = useRef(null);
  const itemProps = component.props || {};
  const [state, _setState] = useState({
    disable: false,
    itemFocused: {},
    values: [],
    localCheckList: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    const isDisable = context.isDisable;
    let disable =
      isDisable({ itemProps, signStatus, props }) || itemProps.disabled;
    if (state.disable != disable) {
      setState({
        disable,
      });
    }
  }, [
    signStatus,
    itemProps,
    props.valuesHIS, //[dataFromHis]
    props.disable,
  ]);

  useImperativeHandle(ref, () => ({
    collectCheckList: () => {
      let newLocalCheckList = (state.localCheckList || []).map((item) => {
        item.label = item.labelValue;
        // item.label = item.labelValue;
        return item;
      });
      return newLocalCheckList;
    },
  }));

  const handleFocusItem = (item) => () => {
    setState({
      itemFocused: item,
    });
  };

  useEffect(() => {
    const reg = /^\d+$/;
    setState({
      localCheckList: itemProps?.checkList?.map((item) => {
        if (reg.test(item.value)) item.value = Number(item.value);
        return item;
      }),
    });
  }, [itemProps]);

  useEffect(() => {
    const reg = /^\d+$/;
    const defaultValues = (itemProps.checkList || [])
      .filter((item) => {
        return item?.autoCheck;
      })
      .map((item) => (reg.test(item.value) ? Number(item.value) : item.value));
    setState({
      values: form[itemProps.fieldName] || defaultValues,
    });
  }, [form, itemProps]);

  const handleBlueItem = () => {
    setState({
      itemFocused: {},
    });
  };

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };

  const handleOnChange = (value) => {
    if (state.disable) {
      return;
    }
    const reg = /^\d+$/;
    value = reg.test(value) ? Number(value) : value;
    if (itemProps.type === "onlyOne") {
      if (itemProps.fieldName && formChange[itemProps.fieldName]) {
        if (state.values.includes(value)) {
          setState({
            values: [],
          });
          itemProps.fieldName && formChange[itemProps.fieldName]([]);
        } else {
          setState({
            values: [value],
          });
          formChange[itemProps.fieldName]([value]);
        }
      }
    } else {
      if (itemProps.fieldName && formChange[itemProps.fieldName]) {
        if (state.values.includes(value)) {
          const newList = state.values.filter((item) => item !== value);
          setState({
            values: newList,
          });
          itemProps.fieldName && formChange[itemProps.fieldName](newList);
        } else {
          let newList = [...(state.values || []), value];
          setState({
            values: newList,
          });
          if (itemProps.fieldName && formChange[itemProps.fieldName])
            formChange[itemProps.fieldName](newList);
        }
      }
    }
  };

  const handleUpdateData = (data) => {
    const newList = state.localCheckList.map((item) =>
      item.key === data.key ? data : item
    );
    setState({
      localCheckList: newList,
    });
    const newProps = { ...component.props, checkList: newList };
    updateOne({
      key: "props",
      content: newProps,
    });
  };
  return (
    <Main
      ref={mainRef}
      onClick={handleFocus}
      itemProps={itemProps}
      data-type="check-groups"
      className="check-groups"
      data-key={itemProps.key}
    >
      {state.localCheckList?.length > 0 ? (
        state.localCheckList.map((item) => {
          if (item.label == null) item.label = "";
          let x = itemProps.checkList.find((item2) => item2.key == item.key);
          return (
            <div
              key={item.key}
              onClick={handleFocusItem(item)}
              onBlur={handleBlueItem}
              className={`${
                state.itemFocused.key === item.key ? "check-item-focused" : ""
              } check-item`}
            >
              <CheckBox
                handleUpdateData={handleUpdateData}
                handleOnChange={handleOnChange}
                item={item}
                checked={
                  state.values === item.value || //fix trong trường hợp giá trị không phải array (yêu cầu trường dữ liệu cho checkbox phải là array)
                  (Array.isArray(state.values) && state.values.length
                    ? state.values.includes(item.value)
                    : [`${state.values}`].includes(item.value))
                }
                mode={mode}
                direction={itemProps.direction}
                width={x?.width}
                note={x?.note}
                disabled={state.disable}
                blockWidth={blockWidth}
              />
            </div>
          );
        })
      ) : props.fromTableGrid ? (
        <CheckBox
          item={{
            label: "",
          }}
          checked={!Array.isArray(state.values) && !!state.values}
          mode={mode}
          disabled={state.disable}
          blockWidth={blockWidth}
        />
      ) : (
        <span>{"groups"}</span>
      )}
    </Main>
  );
});

// direction: rtl: right to left or ltr: left to right

CheckGroups.defaultProps = {
  form: {},
  component: {
    props: {
      checkList: [],
      direction: "ltr",
    },
  },
  line: {},
  disabled: false,
  mode: "config",
};

CheckGroups.propTypes = {
  form: T.shape({}),
  component: T.shape({}),
  line: T.shape({}),
  updateContent: T.func,
  disabled: T.bool,
  mode: T.string,
};

export default CheckGroups;
