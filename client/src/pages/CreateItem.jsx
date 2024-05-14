import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { CustomButton, FormField } from "../components";
import { checkIfImage } from "../utils";
import { AdminFlag } from "@thirdweb-dev/sdk";

const CreateItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { createPatent } = useStateContext();
  const [form, setForm] = useState({
    title: "",
    description: "",
    organization: "",
    uri: "",
    admin: "",
    profile: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setLoading(true);
        // console.log()
        await createPatent(
          form.title,
          form.description,
          form.organization,
          form.uri,
          form.admin,
          form.profile
        );

        setLoading(false);
        navigate("/Home");
      } else {
        alert("Provide a valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };
  return (
    <div className="bg-[#1dc071] flex justify-center mt-[60px] items-center flex-col rounded-[5px] sm:p-15p-4 ml-[55px]">
      {loading && "Loader..."}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[480px] bg-[#1dc071] mt-[30px] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[24px] text-[17px] leading-[37px] text-white">
          Create Market Item
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-[] mt-[65px] flex flex-col gap-[30px] sm:min-w-[200px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Grant Name *"
            placeholder="Grant's name"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Receiver Address *"
            placeholder="Enter Receiver"
            inputType="text"
            value={form.description}
            handleChange={(e) => handleFormFieldChange("receiver", e)}
          />
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="City *"
            placeholder="City's name"
            inputType="text"
            value={form.organization}
            handleChange={(e) => handleFormFieldChange("city", e)}
          />
          <FormField
            labelName="State *"
            placeholder="State Name"
            inputType="text"
            value={form.uri}
            handleChange={(e) => handleFormFieldChange("state", e)}
          />
          <FormField
            labelName="Country *"
            placeholder="Country"
            inputType="text"
            value={form.admin}
            handleChange={(e) => handleFormFieldChange("country", e)}
          />
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Grant Image*"
            placeholder="Grant Photo Url"
            inputType="url"
            value={form.profile}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />
        </div>
        <div className="flex justify-center items-center mb-[30px]">
          <CustomButton
            btnType="submit"
            title="Submit"
            styles="bg-[black]"
            handleClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateItem;
