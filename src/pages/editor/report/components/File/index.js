import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
  memo,
} from "react";
import { convert } from "utils/editor-utils";
import { useDispatch, useSelector } from "react-redux";
import File2 from "../File2";
import { message } from "antd";
import { MODE } from "utils/editor-utils";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";
import ModalAddNameTemplate from "../ModalAddNameTemplate";
import Prompt from "components/Prompt";
export const refValues = React.createRef({});
const File = ({ mode, isPreview, config, isTemplate, ...props }, ref) => {
  const { t } = useTranslation();
  const {
    files: {
      onSaveForm,
      updateData,
      createTemplateBieuMau,
      updateTemplateBieuMau,
    },
  } = useDispatch();
  if (!refValues.current) refValues.current = {};
  const refSaveFile = useRef(true);
  const refModalName = useRef(null);
  const refPrompt = useRef();
  const apiFields = useStore("files.apiFields", []);
  const fileTemplate = useStore("files.fileTemplate", {});
  const fileData = useStore("files.fileData", {});
  const fileDataHIS = useStore("files.fileDataHIS", {});
  const file = useStore("files.file", {});
  const fileDataTemplate = useStore("files.fileDataTemplate", {});
  const [state, _setState] = useState({
    formChange: {},
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const handleSubmit = ({ file, id, queries = {}, isSaveTemplate }) => {
    refSaveFile.current = false;
    return new Promise((resolve, reject) => {
      if (!Object.keys(refValues.current).length) {
        message.error(
          t(
            isSaveTemplate
              ? "editor.banChuaNhapDuLieu"
              : "editor.formChuaDuocLoadVuiLongThuLaiSau"
          )
        );
        return;
      }
      const data = convert(refValues.current);
      if (isSaveTemplate) {
        if (data.id) {
          updateTemplateBieuMau({
            ...data,
            api: file?.api,
            baoCaoId: file?.id,
          });
        } else {
          if (refModalName.current.show) {
            refModalName.current.show({}, (text) => {
              createTemplateBieuMau({
                ...data,
                api: file?.api,
                baoCaoId: file?.id,
                ten: text,
              });
            });
          }
        }
      } else {
        onSaveForm({ file, data: { id, ...data, ...queries } })
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            reject(e);
          });
      }
    });
  };
  useImperativeHandle(ref, () => ({
    values: refValues.current,
    handleSubmit,
  }));
  const setFormKey = (key) => (value) => {
    refPrompt?.current && refPrompt.current.setCheckChangeForm();
    refValues.current = { ...refValues.current, [key]: value };
  };
  useEffect(() => {
    if (apiFields) {
      const obj = apiFields.reduce(
        (res, key) => ({
          ...res,
          [key]: setFormKey(key),
        }),
        {}
      );
      obj.setMultiData = (data) => {
        refValues.current = { ...refValues.current, ...data };
      };
      setState({ formChange: obj });
    }
  }, [apiFields]);

  refValues.current = useMemo(() => {
    return isTemplate ? fileDataTemplate : fileData;
  }, [fileData, fileDataHIS]);
  useEffect(() => {
    if (refValues.current) {
      updateData({
        refValues: refValues.current,
      });
    }
  }, [refValues.current]);
  state.formChange.getAllData = () => {
    return refValues.current;
  };

  if (!Object.keys(refValues?.current).length && !isPreview && !isTemplate) {
    return null;
  }
  return (
    <>
      {!isPreview && <Prompt ref={refPrompt}></Prompt>}
      <File2
        fileTemplate={fileTemplate}
        apiFields={apiFields}
        file={file}
        fileData={isTemplate ? fileDataTemplate : fileData}
        fileDataHIS={fileDataHIS}
        formChange={state.formChange}
        mode={mode || MODE.editing}
        config={config}
      ></File2>
      <ModalAddNameTemplate ref={refModalName}></ModalAddNameTemplate>
    </>
  );
};

export default memo(forwardRef(File));
