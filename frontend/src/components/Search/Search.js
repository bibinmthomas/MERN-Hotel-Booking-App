import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";

function Search() {
  const options = ["Hotels", "Blogs"];
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState(options[0]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const blogData = useSelector((state) => state.blogCreate);
  const { blogInfo } = blogData;
  const propertyData = useSelector((state) => state.propertyWorking);
  const { propertyInfo } = propertyData;
  const optionsDetails = [];

  useEffect(() => {
    if (value === "Hotels") {
      propertyInfo.map((item) => optionsDetails.push(item.propName));
    } else {
      blogInfo.map((item) => optionsDetails.push(item.blogTitle));
    }
  }, [value, search]);
  return (
    <>
      <div class="container mx-auto flex justify-center items-center p-2 md:p-0">
        <div class="border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg">
          {/* <div class="grid grid-cols-1 md:grid-cols-1 gap-4"> */}
          <div class="flex flex-col md:flex-row w-auto">
            <div>
              {/* <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
              <div>{`inputValue: '${inputValue}'`}</div>
              <br /> */}
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="Type of Search" />
                )}
              />
            </div>
            {/*  */}
            <div class="">
              <div>
                <Autocomplete
                  value={search}
                  onChange={(event, newValue) => {
                    setSearch(newValue);
                  }}
                  inputValue={searchInputValue}
                  onInputChange={(event, newInputValue) => {
                    setSearchInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={optionsDetails}
                  sx={{ width: 400 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Search here..." />
                  )}
                />
              </div>
              {/*  */}
              {/* <div class="flex border rounded bg-gray-300 items-center p-4 sm:w-96 ">
                <svg
                  class="fill-current text-gray-800 mr-2 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    class="heroicon-ui"
                    d="M14 5.62l-4 2v10.76l4-2V5.62zm2 0v10.76l4 2V7.62l-4-2zm-8 2l-4-2v10.76l4 2V7.62zm7 10.5L9.45 20.9a1 1 0 0 1-.9 0l-6-3A1 1 0 0 1 2 17V4a1 1 0 0 1 1.45-.9L9 5.89l5.55-2.77a1 1 0 0 1 .9 0l6 3A1 1 0 0 1 22 7v13a1 1 0 0 1-1.45.89L15 18.12z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search here..."
                  class="bg-gray-300 max-w-full focus:outline-none text-gray-700"
                />
              </div> */}
            </div>
            <div class="">
              <button class="p-4 border rounded-md bg-gray-800 text-white">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
