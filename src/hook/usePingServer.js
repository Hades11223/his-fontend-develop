import { useEffect, useRef } from "react";

function ping() {
  return new Promise((resolve, reject) => {
    fetch("/app.info?v=" + new Date().getTime(), {
      cache: "no-cache",
      mode: "no-cors", //
    })
      .then((s) => {
        resolve({ status: true });
      })
      .catch(() => {
        resolve({ status: false });
      });
  });
}

const usePingServer = (callback) => {
  const refCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    refCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const getData = () => {
      ping().then((s) => {
        refCallback.current && refCallback.current(s);
      });
    };
    const interval = setInterval(getData, 10000);
    getData();
    return () => {
      clearInterval(interval);
    };
  }, []);
};
export default usePingServer;
