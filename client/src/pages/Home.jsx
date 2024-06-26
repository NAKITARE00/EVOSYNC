import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DisplayReceivers } from "../components";
import { useStateContext } from "../context";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { address, contract, getReceivers } = useStateContext();
  const [items, setItems] = useState([]);
  const fetchReceivers = async () => {
    setIsLoading(true);
    const data = await getReceivers();
    setItems(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchReceivers();
  }, [address, contract]);
  return (
    <div
      className="bg-[] flex justify-center pr-104px
        items-center flex-col rounded-[10px] sm:p-10p-4"
    >
      <div className="justify-left flex flex-row">
        <DisplayReceivers title="" isLoading={isLoading} items={items} />
      </div>
    </div>
  );
};

export default Home;
