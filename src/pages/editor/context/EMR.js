import React from "react";
const EMRContext = React.createContext({});
export const EMRProvider = EMRContext.Provider;
export const EMRConsumer = EMRContext.Consumer;
export default EMRContext;
