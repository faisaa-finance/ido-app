import Image from "next/image";
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useAccount, useToken } from "wagmi";
import { useWeb3Contract, useMoralis } from "react-moralis";
import abi from "../constants/abi.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Modal({ setopenModal, amount  }) {
  const { address } = useAccount();
  const [TxnSuccess, setTxnSuccess] = useState(false);
  const [isTxnLoading, setisTxnLoading] = useState(false);
  const { isWeb3Enabled, web3EnableError, Moralis } = useMoralis();
  const { data: tokenInfo } = useToken({
    address: "0x67742bB42e5EEA9083a0BEDA0CE65BaB04703E79",
  });
  // defining contract function
  const {
    data: contractData,
    error,
    runContractFunction: buyTokens,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress:"0xd4E6b5390C7B3f5E07d866E1551CB7C3327638D8",
    functionName: "buyTokens",
    params: {
      _beneficiary: address,
    },
    msgValue: Moralis.Units.ETH(amount),
  });

  //buy token function
  const buyToken = async () => {
    if ( isWeb3Enabled) {
      setisTxnLoading(true);
      await buyTokens({
        onSuccess: handleSuccess,
        onError: (error) => {
           console.log(error),
          setisTxnLoading(false);
        },
      });
    } else {
      toast.error("something went wrong", {
        theme: "dark",
      });
    }
  };

  // function to update ui
  const updateUi = () => {
    setisTxnLoading(false);
    setTxnSuccess(true);
  };

  //function to be called after 1 confirmation in the blockchain
  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      updateUi();
    } catch (error) {
      // console.log(error);
    }
  };

  const toFixed = (x) => {  return Number.parseFloat(x).toFixed(2);  }

  // add to wallet function
  const AddToWallet = async () => {
    const tokenAddress = tokenInfo?.address;
    const tokenSymbol = tokenInfo?.symbol;
    const tokenDecimals = tokenInfo?.decimals;

    try {
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
          },
        },
      });

      if (wasAdded) {
        toast.success(`${tokenSymbol} succesfully added`, {
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("User rejected the request", {
        theme: "dark",
      });
    }
  };
  return (
    <>
      <div className="darkBG" onClick={() => setopenModal(false)} />
      <ToastContainer position="top-center" />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">
              {TxnSuccess ? "Success" : "Confirm Buy"}
            </h5>
          </div>
          <button className="closeBtn" onClick={() => setopenModal(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
            {/* svg to show txn loading*/}
            <div className={`${isTxnLoading ? "show" : "hide"}`}>
              <Image
                height="200"
                width="200"
                alt="transaction loading"
                src="/assets/spinner.svg"
              />
            </div>
            {/* svg to show txn complete */}
            <div className={`${TxnSuccess ? "show" : "hide"}`}>
              <Image
                height="128"
                width="128"
                alt="transaction confirmation succesful"
                src="/assets/check.gif"
              />
            </div>
            {/* svg to show on error */}
            <div className={`${error ? "show" : "hide"}`}>
              <Image
                height="128"
                width="128"
                alt="transaction failed due to an error"
                src="/assets/cancel.svg"
              />
            </div>
            {/* modal details for txn loading and success  */}
            <div className="modal-info">
              <h4>{TxnSuccess ? "Transaction Processed" : "Committing"}</h4>
              <p>
                <span>{amount} wCORE</span>&nbsp;for &nbsp;
                <span>{toFixed(amount)} $FAISAA</span>
              </p>
              <a
                href={`https://scan.test.btcs.network/tx/${contractData?.hash}`}
                className="txn-hash"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className={TxnSuccess ? "show" : "hide"}>
                  <strong>View Transaction &#8599;</strong>
                </p>
              </a>
            </div>
            {/* error display for modal  */}
            <p className="error">
              {error ? `${error?.data?.message || error.message}` : ""}
            </p>
            {TxnSuccess ? (
              <button type="button" onClick={AddToWallet} className="add-btn">
                {`Add  ${tokenInfo?.symbol} to wallet`}
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={() => setopenModal(false)}>
                {TxnSuccess ? "Close" : "Cancel"}
              </button>
              <button
                className={`buyBtn ${TxnSuccess ? "hide" : "show"}`}
                onClick={buyToken}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
