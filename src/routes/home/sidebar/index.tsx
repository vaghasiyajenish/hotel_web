import React, { useCallback, useEffect, useRef, useState } from "react";
import "./sidebar.scss";
import DownIcon from "../../../assets/icons/down.svg";
import useOnClickOutside from "../../../components/useOnClickOutside/index";
import { ApiGet } from "../../../utiles/ApiData";
import Button from "../../../components/common/Button";

interface dropdownSelectedValueProps {
  priceDropownSelectedValue: string;
  typeDropdownSelectedValue: string;
}

type PriceMenu = {
  createdAt: Date;
  name: string;
  id: number;
};
type DropDownType = {
  sortedByDropDown: boolean;
  typeDropdown: boolean;
};
type TypeMenu = {
  createdAt: Date;
  name: string;
  type: number;
  id: number;
};

interface SidebarProps {
  handleSlectDropDown: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseFilter: (ev: string) => void;
  dropdownSelectedValue: dropdownSelectedValueProps;
  dropdown: DropDownType;
  setDropdown: (data: DropDownType) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const {
    handleSlectDropDown,
    dropdownSelectedValue,
    handleCloseFilter,
    dropdown,
    setDropdown,
  } = props;
  const dropDownref = useRef<HTMLDivElement>(null);
  const villaTypeDropdownRef = useRef<HTMLDivElement>(null);
  const [isOutSide, setIsOutSide] = useOnClickOutside(dropDownref);
  const [isOutSideVilla, setIsOutSideVilla] =
    useOnClickOutside(villaTypeDropdownRef);

  const [dropDownLoader, setDropDownLoader] = useState<boolean>(false);

  const [dropdownMenuItem, setDropdownMenuItems] = useState({
    priceMenuItem: [],
    typeMenuItem: [],
  });

  useEffect(() => {
    if (isOutSide) {
      setDropdown({ sortedByDropDown: false } as DropDownType);
      setIsOutSide(false);
    }
  }, [isOutSide, setDropdown, setIsOutSide]);

  useEffect(() => {
    if (isOutSideVilla) {
      setDropdown({ typeDropdown: false } as DropDownType);
      setIsOutSideVilla(false);
    }
  }, [isOutSideVilla, setDropdown, setIsOutSideVilla]);

  const handleClickSortedDropdown = useCallback(() => {
    setDropdown({
      sortedByDropDown: !dropdown.sortedByDropDown,
    } as DropDownType);
    if (dropdownMenuItem.priceMenuItem.length === 0) {
      setDropDownLoader(true);
      ApiGet("https://635fb9f7ca0fe3c21aa2dd22.mockapi.io/api/v1/price")
        .then((res: any) => {
          setDropDownLoader(false);

          setDropdownMenuItems((prvents) => {
            return { ...prvents, priceMenuItem: res?.data };
          });
        })
        .catch((error) => {
          setDropDownLoader(false);
        });
    }
  }, [
    dropdown.sortedByDropDown,
    dropdownMenuItem.priceMenuItem.length,
    setDropdown,
  ]);

  const handleClickTypeDropdown = useCallback(() => {
    setDropdown({ typeDropdown: !dropdown.sortedByDropDown } as DropDownType);
    if (dropdownMenuItem.typeMenuItem.length === 0) {
      setDropDownLoader(true);
      ApiGet("https://635fb9f7ca0fe3c21aa2dd22.mockapi.io/api/v1/type")
        .then((res: any) => {
          setDropDownLoader(false);
          setDropdownMenuItems((prvents) => {
            return { ...prvents, typeMenuItem: res?.data };
          });
        })
        .catch((error) => {
          setDropDownLoader(false);
        });
    }
  }, [
    dropdown.sortedByDropDown,
    dropdownMenuItem.typeMenuItem.length,
    setDropdown,
  ]);

  return (
    <div className="sidebar">
      <div className="menu" ref={dropDownref}>
        <div
          className="selected-menu"
          onClick={() => {
            handleClickSortedDropdown();
          }}
        >
          <input
            type="text"
            placeholder="Select Sort by"
            value={dropdownSelectedValue?.priceDropownSelectedValue}
            onChange={() => {
              return;
            }}
          />
          <div className="left-side-text">
            <span>Sort by</span>
          </div>
          <div className="icon-alignment">
            <img src={DownIcon} alt="DownIcon" />
          </div>
        </div>
        <div
          className={
            dropdown?.sortedByDropDown
              ? "dropdown dropdown-show"
              : "dropdown dropdown-hidden"
          }
        >
          <div className="dropdown-design">
            {dropDownLoader ? (
              <div className="loaderMain">
                <div className="loader"></div>
              </div>
            ) : (
              dropdownMenuItem?.priceMenuItem.map((item: PriceMenu, id) => {
                return (
                  <span
                    key={id}
                    onClick={() => {
                      handleSlectDropDown({
                        priceDropownSelectedValue: item,
                      } as any);
                      setDropdown({ sortedByDropDown: false } as DropDownType);
                    }}
                  >
                    {item.name}
                  </span>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="menu" ref={villaTypeDropdownRef}>
        <div
          className="selected-menu villa-type"
          onClick={() => {
            handleClickTypeDropdown();
          }}
        >
          <input
            type="text"
            placeholder="Select Type"
            value={dropdownSelectedValue?.typeDropdownSelectedValue}
            onChange={() => {
              return;
            }}
          />
          <div className="left-side-text">
            <span>Type</span>
          </div>
          <div className="icon-alignment">
            <img src={DownIcon} alt="DownIcon" />
          </div>
        </div>

        <div
          className={
            dropdown?.typeDropdown
              ? "dropdown dropdown-show"
              : "dropdown dropdown-hidden"
          }
        >
          <div className="dropdown-design">
            {dropDownLoader ? (
              <div className="loaderMain">
                <div className="loader"></div>
              </div>
            ) : (
              dropdownMenuItem?.typeMenuItem.map((item: TypeMenu, id) => {
                return (
                  <span
                    key={id}
                    onClick={() => {
                      handleSlectDropDown({
                        typeDropdownSelectedValue: item,
                      } as any);
                      setDropdown({ typeDropdown: false } as DropDownType);
                    }}
                  >
                    {item.name}
                  </span>
                );
              })
            )}
          </div>
        </div>
      </div>
      {(dropdownSelectedValue.priceDropownSelectedValue ||
        dropdownSelectedValue.typeDropdownSelectedValue) && (
        <>
          <span className="filters">Apply Filter</span>
          {dropdownSelectedValue.priceDropownSelectedValue && (
            <div className="filterContainer">
              <div className="cheapContainer">
                <div className="cheap">
                  <p>{dropdownSelectedValue.priceDropownSelectedValue}</p>
                </div>
                <div
                  className="cheapIcon"
                  onClick={() => {
                    handleCloseFilter("priceDropownSelectedValue");
                  }}
                >
                  <p>X</p>
                </div>
              </div>
            </div>
          )}
          {dropdownSelectedValue.typeDropdownSelectedValue && (
            <div className="filterContainer">
              <div className="cheapContainer">
                <div className="cheap">
                  <p>{dropdownSelectedValue.typeDropdownSelectedValue}</p>
                </div>
                <div
                  className="cheapIcon"
                  onClick={() => {
                    handleCloseFilter("typeDropdownSelectedValue");
                  }}
                >
                  <p>X</p>
                </div>
              </div>
            </div>
          )}
          <div className="clearbutton">
            <Button
              title={"Clear all"}
              handleClickButton={() => handleCloseFilter("clear")}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
