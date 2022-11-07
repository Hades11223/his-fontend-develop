
import { useEffect } from "react";
export default function useRefreshPage(history, path, resetRoute = "/") {
    //reset lại page , nhưng không bị hiển thị trạng thái loading của browser
    let handler;

    const refresh = () => {
        history.push(resetRoute);

        handler = setTimeout(() => history.push(path), 10);
    };

    useEffect(() => {
        return () => handler && clearTimeout(handler);
    }, [handler]);

    return refresh;
}

