import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import {
  onWithdraw,
  onDeposit,
  onStandBy,
  onConnectTransac,
  onUpdate,
} from "../store";
import DecentralBank from "../truffle_abis/DecentralBank";
import RWD from "../truffle_abis/RWD";
import Tether from "../truffle_abis/Tether";
import { Toast } from "../components/styles";
import handleErrors from "./handleError";

export const useTransactionStore = () => {
  const dispatch = useDispatch();

  const { user, provider } = useSelector((state) => state.web3);
  const {
    network,
    operation,
    tether,
    decentralBank,
    tetherBalance,
    rwd,
    rwdBalance,
    stakingBalance,
  } = useSelector((state) => state.transaction);

  const startConnection = async (data) => {
    const { account, provider } = data;
    const networkver = provider.provider.networkVersion;
    const networkId = () => {
      let value = 0;
      if (networkver === Object.keys(DecentralBank.networks)[0]) {
        value = 0;
      } else {
        value = 1;
      }
      return value;
    };
    const signer = provider.getSigner();
    const contractNetwork = Object.keys(DecentralBank.networks)[networkId()];
    if (contractNetwork === networkver) {
      const contract = new ethers.Contract(
        DecentralBank.networks[networkver].address,
        DecentralBank.abi,
        signer
      );
      const contractTether = new ethers.Contract(
        Tether.networks[networkver].address,
        Tether.abi,
        signer
      );
      const balanceTether = await contractTether.balanceOf(account);
      const parseBalanceTether = ethers.utils.formatEther(
        balanceTether.toString(),
        "ether"
      );
      const contractRWD = new ethers.Contract(
        RWD.networks[networkver].address,
        RWD.abi,
        signer
      );
      const balanceRWD = await contractRWD.balanceOf(account);
      const parseBalanceRWD = ethers.utils.formatEther(
        balanceRWD.toString(),
        "ether"
      );
      const balanceDecentalBank = await contractTether.balanceOf(
        DecentralBank.networks[networkver].address
      );
      const parseBalanceDecentalBank = ethers.utils.formatEther(
        balanceDecentalBank.toString(),
        "ether"
      );
      dispatch(
        onConnectTransac({
          network: networkId(),
          tether: contractTether,
          decentralBank: contract,
          rwd: contractRWD,
          tetherBalance: parseBalanceTether,
          rwdBalance: parseBalanceRWD,
          stakingBalance: parseBalanceDecentalBank,
        })
      );
    } else {
      Toast.fire({
        title: "Current Network is not supported change it in metamask.",
        icon: "warning",
      });
    }
  };

  const startUpdate = async () => {
    if (
      user > 0 &&
      provider.provider.networkVersion ===
        Object.keys(DecentralBank.networks)[network]
    ) {
      const balanceTether = await tether.balanceOf(user);
      const parseBalanceTether = ethers.utils.formatEther(
        balanceTether.toString(),
        "ether"
      );
      const balanceRWD = await rwd.balanceOf(user);
      const parseBalanceRWD = ethers.utils.formatEther(
        balanceRWD.toString(),
        "ether"
      );
      const balanceDecentalBank = await tether.balanceOf(decentralBank.address);
      const parseBalanceDecentalBank = ethers.utils.formatEther(
        balanceDecentalBank.toString(),
        "ether"
      );
      dispatch(
        onUpdate({
          network: network,
          tetherBalance: parseBalanceTether,
          rwdBalance: parseBalanceRWD,
          stakingBalance: parseBalanceDecentalBank,
        })
      );
    } else if (user > 0) {
      Toast.fire({
        title: "Current Network is not supported change it in metamask.",
        icon: "warning",
      });
    }
  };

  const startDeposit = async (amount) => {
    console.log(provider.provider.networkVersion);
    dispatch(onDeposit());
    if (
      user > 0 &&
      provider.provider.networkVersion ===
        Object.keys(DecentralBank.networks)[network]
    ) {
      const checkApprove = await tether.allowance(user, decentralBank.address);
      try {
        Toast.fire("Transaction status", "Checking for Allowance...", "info");
        if (ethers.utils.formatEther(checkApprove) <= 0) {
          Toast.fire({
            title: "Confirm allowance transaction...",
            icon: "info",
          });
          const Approve = await tether.approve(
            decentralBank.address,
            ethers.utils.parseEther("10000000000000000000000000")
          );
          Toast.fire({
            title: "Processing allowance transaction, please wait...",
            icon: "info",
          });
          await Approve.wait();
          Toast.fire({
            title: "Allowance granted, confirm transaction in metamask...",
            icon: "info",
          });
          const transaction = await decentralBank.depositTokens(
            ethers.utils.parseEther(amount.toString())
          );
          Toast.fire({
            title: "Processing deposit transaction, please wait...",
            icon: "info",
          });
          const receipt = await transaction.wait();
          if (receipt.status === 0) {
            Toast.fire({
              title: "Deposit transaction failed",
              icon: "warning",
            });
            throw new Error("Deposit transaction failed");
          } else {
            dispatch(onStandBy());
            Toast.fire({
              title: "Deposit transaction successful!!!",
              icon: "success",
            });
          }
        } else {
          Toast.fire({
            title:
              "Allowance already granted, confirm transaction in metamask...",
            icon: "info",
          });
          const transaction = await decentralBank.depositTokens(
            ethers.utils.parseEther(amount.toString())
          );
          Toast.fire({
            title: "Processing deposit transaction, please wait...",
            icon: "info",
          });
          const receipt = await transaction.wait();
          if (receipt.status === 0) {
            Toast.fire({
              title: "Deposit transaction failed",
              icon: "warning",
            });
            throw new Error("Deposit transaction failed");
          } else {
            dispatch(onStandBy());
            Toast.fire({
              title: "Deposit transaction successful!!!",
              icon: "success",
            });
          }
        }
      } catch (error) {
        handleErrors(error);
      }
    }
  };
  const startWithdraw = async () => {
    dispatch(onWithdraw());
    if (
      user > 0 &&
      provider.provider.networkVersion ===
        Object.keys(DecentralBank.networks)[network]
    ) {
      try {
        Toast.fire({
          title: "Confirm withdraw transaction in metamask...",
          icon: "info",
        });
        const transaction = await decentralBank.unstakeTokens();
        Toast.fire({
          title: "Processing withdraw transaction, please wait...",
          icon: "info",
        });
        const receipt = await transaction.wait();
        if (receipt.status === 0) {
          Toast.fire({
            title: "Withdraw transaction failed",
            icon: "warning",
          });
          throw new Error("Withdraw transaction failed");
        } else {
          dispatch(onStandBy());
          Toast.fire({
            title: "Withdraw transaction successful!!!",
            icon: "success",
          });
        }
      } catch (error) {
        handleErrors(error);
      }
    } else {
      dispatch(onStandBy());
      Toast.fire({
        title: "Deposit transaction successful!!!",
        icon: "success",
      });
    }
  };

  return {
    network,
    user,
    operation,
    tether,
    decentralBank,
    rwd,
    tetherBalance,
    rwdBalance,
    stakingBalance,

    startUpdate,
    startConnection,
    startDeposit,
    startWithdraw,
  };
};
