import { refLoading } from "app";
export default function useLoading() {
  const showLoading = (payload) => {
    const { title, width } = payload || {};
    refLoading.current && refLoading.current.show({ title, width });
  };
  const hideLoading = () => {
    refLoading.current && refLoading.current.hide();
  };
  return { showLoading, hideLoading };
}
