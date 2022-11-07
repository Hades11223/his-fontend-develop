import { refCamera } from "app";
export default function useCamera() {
  const onShowCamera = ({ title, type, propSelect }, uploadFunc, callback) => {
    refCamera.current &&
      refCamera.current.show({ title, type, propSelect }, uploadFunc, callback);
  };
  return { onShowCamera };
}
