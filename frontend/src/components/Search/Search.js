import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchWorkingSuccess } from "../../features/users/searchSlice";
// import { searchBlogs, searchHotels } from "../../actions/userAction";

function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  let searchData;
  useEffect(() => {
    if (value === "Hotels") {
      propertyInfo.map((item) => optionsDetails.push(item.propName));
    } else {
      blogInfo.map((item) => optionsDetails.push(item.blogTitle));
    }
  }, [value, search, searchInputValue]);

  const submitSearch = () => {
    if (value === "Hotels" && search === null && searchInputValue === "") {
      navigate("/hotels");
    } else if (
      value === "Blogs" &&
      search === null &&
      searchInputValue === ""
    ) {
      navigate("/blogs");
    } else if (value && (search !== null || searchInputValue.length !== 0)) {
      if (value === "Hotels") {
        console.log("hotel");
        if (search !== null) {
          searchData = search;
        } else {
          searchData = searchInputValue;
        }
        let filteredProducts = propertyInfo?.filter((product) => {
          const regex = new RegExp(searchData, "i");
          return regex.test(product.propName);
        });
        if (filteredProducts.length !== 0) {
          console.log("filteredProducts:", filteredProducts);
          dispatch(searchWorkingSuccess({filteredProducts,value}));
        }
      } else if (value === "Blogs") {
        console.log("blog");
        if (search !== null) {
          searchData = search;
        } else {
          searchData = searchInputValue;
        }
        let filteredProducts = blogInfo?.filter((product) => {
          const regex = new RegExp(searchData, "i");
          return regex.test(product.blogTitle);
        });
        if (filteredProducts.length !== 0) {
          console.log("filteredProducts:", filteredProducts);
          dispatch(searchWorkingSuccess({filteredProducts,value}));
        }
      }
    }
  };

  return (
    <>
      <div class="container mx-auto flex justify-center items-center p-2 md:p-0">
        <div class="border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg">
          {/* <div class="grid grid-cols-1 md:grid-cols-1 gap-4"> */}
          <div class="flex flex-col md:flex-row w-auto">
            <div>
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
                  value={searchInputValue}
                  onChange={(event, newValue) => {
                    setSearch(newValue);
                  }}
                  id="free-solo-demo"
                  freeSolo
                  options={optionsDetails}
                  inputValue={searchInputValue}
                  onInputChange={(event, newInputValue) => {
                    setSearchInputValue(newInputValue);
                  }}
                  sx={{ width: 400 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Search here..." />
                  )}
                />
              </div>
            </div>
            <div class="">
              <button
                onClick={submitSearch}
                class="p-4 border rounded-md bg-gray-800 text-white"
              >
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
