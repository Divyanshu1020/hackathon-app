import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cross from "../../assets/icons/cross.svg";
import { setFilter } from "../../redux/hackathonsSlice";
import { RootState } from "../../redux/store";

import { selectedOptionsType } from "@/types/staticData";
import Filter from "./Filter";

export default function SearchInput() {
  const [selectedOptions, setSelectedOptions] = useState<selectedOptionsType[]>(
    []
  );
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.hackathons.filter);
  const handleChange = (newValue: selectedOptionsType) => {
    const alreadySelected = selectedOptions?.some(
      (option) =>
        option.value === newValue.value && option.heading === newValue.heading
    );

    if (!alreadySelected) {
      const newSelectedOptions = [
        ...selectedOptions,
        { value: newValue.value, heading: newValue.heading },
      ];
      const levels = newSelectedOptions
        .filter((option) => option.heading === "Level")
        .map((option) => option.value);
      const statuses = newSelectedOptions
        .filter((option) => option.heading === "Status")
        .map((option) => option.value);
    
      dispatch(
        setFilter({
          level: levels,
          status: statuses,
          search: filter.search,
        })
      );
      setSelectedOptions(newSelectedOptions);
    }else{
      removeOption(newValue)
    }
  };

  const handleCheckbox = (newValue: selectedOptionsType)=>{
    return  selectedOptions?.some(
      (option) =>
        option.value === newValue.value && option.heading === newValue.heading
    );
  }

  const removeOption = (optionToRemove: selectedOptionsType) => {
    const newSelectedOptions = selectedOptions?.filter(
      (option) => option.value !== optionToRemove.value
    );
    setSelectedOptions(newSelectedOptions);

    if (newSelectedOptions) {
      const levels = newSelectedOptions
        .filter((option) => option.heading === "Level")
        .map((option) => option.value);
      const statuses = newSelectedOptions
        .filter((option) => option.heading === "Status")
        .map((option) => option.value);

      console.log({
        level: levels,
        status: statuses,
        search: filter.search,
      });

      dispatch(
        setFilter({
          level: levels,
          status: statuses,
          search: filter.search,
        })
      );
    }
  };

  return (
    <div className=" w-full max-w-4xl mx-auto p-4 flex flex-col items-center gap-8 ">
      <div className="w-full  flex flex-col sm:flex-row justify-start items-center gap-4">
        <div className="relative w-full">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
            size={20}
          />
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => {
              dispatch(
                setFilter({
                  ...filter,
                  search: e.target.value,
                })
              );
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Filter
            handleChange={handleChange}
            handleCheckbox={handleCheckbox}
          />
        </div>
      </div>
      <Pills selectedOptions={selectedOptions} removeOption={removeOption} />
    </div>
  );
}

const Pills = ({
  selectedOptions,
  removeOption,
}: {
  selectedOptions: selectedOptionsType[] | undefined;
  removeOption: (option: selectedOptionsType) => void;
}) => {
  return (
    <div className="flex gap-2  w-full justify-start items-center  ">
      {selectedOptions?.map((option) => (
        <span
          key={option.value}
          className="px-4 py-2 bg-[#F8F9FD7D] text-white rounded-full text-sm flex justify-center items-center gap-4"
        >
          {option.value}
          <button
            onClick={() => removeOption(option)}
            className="text-gray-800"
          >
            <img src={cross} alt="cross" />
          </button>
        </span>
      ))}
    </div>
  );
};
