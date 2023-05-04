import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChecking, onConnect, onDisconnect, onNeedInstall } from "../store";
import { useTransactionStore } from "../hooks/useTransactionStore";
import { ethers } from "ethers";

export const useWeb3Store = () => {
  const dispatch = useDispatch();
  const { startConnection } = useTransactionStore();
  const { status, user, provider, errorMessage } = useSelector(
    (state) => state.web3
  );

  const startCheck = async () => {
    dispatch(onChecking());
    if (window.ethereum) {
      try {
        const data = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (data.length > 0) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          // const networkver = await provider.getNetwork();
          dispatch(
            onConnect({
              user: data[0],
              provider: provider,
            })
          );
          startConnection({ account: data[0], provider: provider });
        } else {
          dispatch(onDisconnect());
        }
      } catch (err) {
        dispatch(onDisconnect());
      }
    } else {
      dispatch(onNeedInstall());
    }
  };
  const startConnect = async () => {
    try {
      const data = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (data.length > 0) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        dispatch(
          onConnect({
            user: data[0],
          })
        );
        startConnection({ account: data[0], provider: provider });
      } else {
        dispatch(onDisconnect());
      }
    } catch (err) {
      dispatch(onDisconnect());
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        console.log(accounts);
        console.log(window.ethereum);
        startCheck();
      };

      const handleChainChange = () => {
        startCheck();
      };
      return () => (
        window.ethereum.on("accountsChanged", handleAccountsChanged),
        window.ethereum.on("chainChanged", handleChainChange)
      );
    }
  }, []);

  return {
    status,
    user,
    errorMessage,
    provider,

    startCheck,
    startConnect,
  };
};
