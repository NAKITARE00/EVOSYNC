import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import Rudis from "../contracts/Rudis.json";
import RudisNFT from "../contracts/RudisNFT.json";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xb150db8a5FaE5b7dbF90F26eb00d03e2BE3F3aEB",
    Rudis.abi
  );
  const { mutateAsync: createPatent } = useContractWrite(
    contract,
    "createPatent"
  );
  const { mutateAsync: createCollaboration } = useContractWrite(
    contract,
    "createCollaboration"
  );
  const { mutateAsync: contributeToResearch } = useContractWrite(
    contract,
    "contributeToResearch"
  );
  const { mutateAsync: sellPatent } = useContractWrite(contract, "sellPatent");
  const { mutateAsync: joinCollaboration } = useContractWrite(
    contract,
    "joinCollaboration"
  );
  const address = useAddress();
  const connect = useMetamask();

  const publishPatent = async (
    _title,
    _description,
    _organization,
    _uri,
    _admin,
    _profile
  ) => {
    try {
      const data = await createPatent({
        args: [_title, _description, _organization, _uri, _admin, _profile],
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failed", error);
    }
  };

  const publishCollaboration = async (_name, _description, _uri, _profile) => {
    try {
      const data = await createCollaboration({
        args: [_name, _description, _uri, _profile],
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failed", error);
    }
  };

  const publishJoin = async (_id) => {
    try {
      const data = await joinCollaboration({
        args: [_id],
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failed", error);
    }
  };

  const publishContribute = async (_id, _description) => {
    try {
      const data = await contributeToResearch({
        args: [_id, _description],
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failed", error);
    }
  };

  const publishSale = async (_id, _amount) => {
    try {
      const data = await sellPatent({
        args: [_id, _amount],
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failed", error);
    }
  };

  const crowdFund = async (_id, _fund) => {
    const data = await contract.call("crowdFund", [_id], {
      value: ethers.utils.parseEther(_fund),
    });

    return data;
  };

  const buyPatent = async (_id, _organization, _amount) => {
    const data = await contract.call("buyPatent", [_id, _organization], {
      value: ethers.utils.parseEther(_amount),
    });
    return data;
  };

  const getPatentsOnsale = async () => {
    const items = await contract.call("getPatentsOnsale");

    const parsedItems = items.map((item, i) => ({
      id: item.id,
      patentId: item.patentId,
      name: item.name,
      amount: item.amount,
      owner: item.owner,
      profile: item.profile,
      pId: i,
    }));
    return parsedItems;
  };

  const getCollaborations = async () => {
    const collaborations = await contract.call("getCollaborations");

    const parsedCollaborations = collaborations.map((collaboration, i) => ({
      title: collaboration.title,
      id: collaboration.id,
      collaborators: collaboration.collaborators,
      description: collaboration.description,
      uri: collaboration.uri,
      admin: collaboration.admin,
      profile: collaboration.profile,
      pId: i,
    }));

    return parsedCollaborations;
  };

  const getResearch = async () => {
    const researches = await contract.call("getResearch");

    const parsedResearches = researches.map((research, i) => ({
      title: research.title,
      id: research.id,
      description: research.description,
      admin: research.admin,
      funding: research.funding,
      organization: research.organization,
      researchUri: research.uri,
      profile: research.profile,
      pId: i,
    }));

    return parsedResearches;
  };

  const getUserItems = async () => {
    const allItems = await getPatentsOnsale();

    const filteredItems = allItems.filter((item) => item.owner === address);
    return filteredItems;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createPatent: publishPatent,
        createCollaboration: publishCollaboration,
        joinCollaboration: publishJoin,
        contributeToResearch: publishContribute,
        sellPatent: publishSale,
        crowdFund,
        buyPatent,
        getPatentsOnsale,
        getCollaborations,
        getResearch,
        getUserItems,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
