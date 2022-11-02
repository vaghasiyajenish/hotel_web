/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./home.scss";
import PropertiesCard from "./propertiesCard";
import Searchbar from "./searchbar";
import Sidebar from "./sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotleRequest } from "../../_redux/actions/hotelActions/hotleActions";
import { RootState } from "../../_redux/reducers/rootReducer";
import PropertiesCardloader from "./propertiesCard/propertiesCardloader";

type HotelList = {
  image: string;
  title: string;
  address: string;
  slaapkamers: number;
  badkamers: number;
  price: number;
  type: number;
  createdAt: any;
};
type DropDownType = {
  sortedByDropDown: boolean;
  typeDropdown: boolean;
};
type selectedProps = {
  priceFiltredValue: HotelList[];
  typeFiltredValue: number;
};

export default function Home() {
  const [serchValue, setSerchValue] = useState("");
  const { loading, hotleData } = useSelector(
    (state: RootState) => state.hotleData
  );
  const [apiData, setData] = useState<HotelList[]>([]);
  const [filterdData, setFilterdData] = useState<HotelList[]>([]);
  const [serachData, setSerachData] = useState<HotelList[]>([]);
  const [freshData, setFreshData] = useState<HotelList[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hotleData.length === 0) {
      dispatch(fetchHotleRequest());
    } else {
      setData(hotleData);
      const cloneArray = JSON.parse(JSON.stringify(hotleData));
      setFreshData(cloneArray);
      setFilterdData(hotleData);
      setSerachData(hotleData);
    }
  }, [dispatch, hotleData]);

  const [dropdownSelectedValue, setdropdownSelectedValue] = useState({
    priceDropownSelectedValue: "",
    typeDropdownSelectedValue: "",
  });

  const [filtredValue, setFilterdValue] = useState<selectedProps>({
    priceFiltredValue: [],
    typeFiltredValue: 0,
  });
  
  const [dropdown, setDropdown] = useState({
    sortedByDropDown: false,
    typeDropdown: false,
  });

  const handleClickSearch = useCallback(() => {
    if (filterdData.length > 0) {
      const serachedData = filterdData.filter(
        (item: { title: string; address: string }) => {
          if (item?.title?.toLowerCase()?.includes(serchValue.toLowerCase())) {
            return item;
          }
        }
      );
      setSerachData(serachedData);
    }
  }, [filterdData, serchValue]);

  const handleChangeSearch = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setSerchValue(ev.target.value);
    },
    []
  );

  const filterFunc = useCallback(
    (sortedData: HotelList[], typeData: number) => {
      const newFilteredData = sortedData.filter((item: { type: number }) => {
        if (typeData && item.type === typeData) {
          return item;
        } else if (typeData === 0) {
          return item;
        }
      });
      setFilterdData(newFilteredData);
      setSerachData(newFilteredData);
    },
    []
  );

  const handleSlectDropDown = React.useCallback(
    (data: any) => {
      const slectedObj = {
        [Object.keys(data)[0]]: data[Object.keys(data)[0]]?.name,
      };
      setdropdownSelectedValue((prevent) => {
        return { ...prevent, ...slectedObj };
      });

      if (apiData.length > 0) {
        if (data[Object.keys(data)[0]]?.type) {
          filterFunc(
            filtredValue.priceFiltredValue,
            data[Object.keys(data)[0]]?.type
          );
          setFilterdValue((prevent) => {
            return {
              ...prevent,
              typeFiltredValue: data[Object.keys(data)[0]]?.type,
            };
          });
        } else {
          let sortedData: HotelList[] = [];
          if (data[Object.keys(data)[0]]?.name === "Highest price") {
            sortedData = serachData.sort(function (a, b) {
              return b.price - a.price;
            });
          } else if (data[Object.keys(data)[0]]?.name === "Lowest price") {
            sortedData = serachData.sort(function (a, b) {
              return a.price - b.price;
            });
          } else if (data[Object.keys(data)[0]]?.name === "Date added") {
            sortedData = serachData.sort(function (a, b) {
              return a.createdAt - b.createdAt;
            });
          }
          setFilterdValue((prevents) => {
            return {
              ...prevents,
              priceFiltredValue: sortedData,
            };
          });
          filterFunc(sortedData, filtredValue.typeFiltredValue);
        }
      }
    },
    [apiData, filtredValue, filterFunc, serachData]
  );

  const handleCloseFilter = useCallback(
    (items: string) => {
      let filterdandSerched: HotelList[] = [];
      if (serchValue) {
        filterdandSerched = freshData.filter(
          (item: { title: string; address: string }) => {
            if (
              item?.title?.toLowerCase()?.includes(serchValue.toLowerCase())
            ) {
              return item;
            }
          }
        );
      } else {
        filterdandSerched = freshData;
      }
      if (items === "clear") {
        setdropdownSelectedValue(() => {
          return {
            priceDropownSelectedValue: "",
            typeDropdownSelectedValue: "",
          };
        });
      } else {
        setdropdownSelectedValue((prevent) => {
          return { ...prevent, [items]: "" };
        });
      }
      let itmeData = "";
      if (items === "priceDropownSelectedValue") {
        itmeData = "priceFiltredValue";
      } else if (items === "typeDropdownSelectedValue") {
        itmeData = "typeFiltredValue";
      }
      if (itmeData === "priceFiltredValue") {
        filterFunc(filterdandSerched, filtredValue.typeFiltredValue);
        setFilterdValue((prevent) => {
          return { ...prevent, [itmeData]: filterdandSerched };
        });
      } else if (itmeData === "typeFiltredValue") {
        filterFunc(filtredValue.priceFiltredValue, 0);
        setFilterdValue((prevent) => {
          return { ...prevent, [itmeData]: 0 };
        });
      } else {
        filterFunc(filterdandSerched, 0);
        setFilterdValue(() => {
          return { priceFiltredValue: filterdandSerched, typeFiltredValue: 0 };
        });
      }
    },
    [filterFunc, freshData, serchValue, filtredValue]
  );

  const SideBarCmp = useMemo(() => {
    return (
      <div className="layout-grid-items">
        <Sidebar
          handleSlectDropDown={handleSlectDropDown}
          dropdownSelectedValue={dropdownSelectedValue}
          handleCloseFilter={handleCloseFilter}
          dropdown={dropdown}
          setDropdown={(data: DropDownType) => {
            setDropdown((prevent) => {
              return { ...prevent, ...data };
            });
          }}
        />
      </div>
    );
  }, [dropdownSelectedValue, handleCloseFilter, dropdown, handleSlectDropDown]);
  const CenterView = useMemo(() => {
    return (
      <div className="layout-grid-items">
        <Searchbar
          handleChangeSearch={handleChangeSearch}
          serchValue={serchValue}
          handleClickSearch={handleClickSearch}
          dropdown={dropdown}
        />
        {loading ? (
          <PropertiesCardloader />
        ) : (
          <PropertiesCard data={serachData} />
        )}
      </div>
    );
  }, [
    handleChangeSearch,
    handleClickSearch,
    dropdown,
    loading,
    serachData,
    serchValue,
  ]);

  return (
    <div className="page-layout-content-alignment">
      <div className="container">
        <div className="layout-grid">
          {SideBarCmp}
          {CenterView}
        </div>
      </div>
    </div>
  );
}
