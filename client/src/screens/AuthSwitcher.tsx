import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {FailureView, LoadingView} from "rn-web-components";
import {web3Selector} from "../store/web3";
import {Router} from "./Router";
import actions from "../store/actions"
import {Web3Connect} from "../components/Web3Connect";

export const AuthSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const {status, error} = useSelector(web3Selector);


  useEffect(() => {
    console.log("STATUS", status)
    switch (status) {
      case "WEB3_STARTUP":
        dispatch(actions.web3.connectWeb3());
        break;
    }
  }, [status]);

  useEffect(() => {
        dispatch(actions.web3.connectWeb3());
  }, [window.ethereum]);

  switch (status) {
    default:
    case "WEB3_STARTUP":
      return <LoadingView />;
    case "WEB3_CONNECTED":
      return <Router />;
    case "NO_WEB3":
      switch (error) {
        default:
        case "CONNECTION_ERROR":
          return <Web3Connect />;
        case "WRONG_NETWORK_ERROR":
          return <FailureView error={"Please,choose another network"} />;
      }

  }
};
