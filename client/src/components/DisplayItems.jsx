import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { loader } from "../assets";
import { ItemCard } from ".";

const DisplayItems = ({ title, isLoading, items }) => {
  const navigate = useNavigate();
  const handleNavigate = (item) => {
    navigate(`/item-details/${item.name}`, { state: item });
  };
  return (
    <div>
      <h1
        className="font-epilogue font-bold text-[18px]
            text-black text-left"
      >
        {title}
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            className="w-{100px] h-[100px]
                        object-contain"
          />
        )}

        {!isLoading && items.length === 0 && (
          <p
            className="font-epilogue font-semibold text-[14px
                    leading-[30px] text-[#818183]"
          >
            No Market Items
          </p>
        )}

        {!isLoading &&
          items.length > 0 &&
          items.map((item) => (
            <ItemCard
              key={uuidv4()}
              {...item}
              handleClick={() => handleNavigate(item)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayItems;
