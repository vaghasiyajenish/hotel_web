import React from "react";
import "./searchbar.scss";
import SearchIcon from "../../../assets/icons/search.svg";
import Button from "../../../components/common/Button";

type DropDownType = {
  sortedByDropDown: boolean;
  typeDropdown: boolean;
};

interface SearchbarProps {
  handleChangeSearch: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  serchValue: string;
  handleClickSearch: () => void;
  dropdown: DropDownType;
}

const Searchbar: React.FC<SearchbarProps> = (props) => {
  const { handleChangeSearch, serchValue, handleClickSearch, dropdown } = props;

  return (
    <div
      className={
        dropdown.sortedByDropDown || dropdown.typeDropdown
          ? "searchbar-grid-relative"
          : ""
      }
    >
      <div className="searchbar-grid">
        <div className="searchbar-grid-items">
          <div className="searchbar-design">
            <input
              type="text"
              value={serchValue}
              placeholder="Plaats, buurt, adres, etc."
              onChange={handleChangeSearch}
            />
            <div className="left-icon-alignment">
              <img src={SearchIcon} alt="SearchIcon" />
            </div>
          </div>
        </div>
        <div className="searchbar-grid-items">
          <div className="search-button">
            <Button title={"Search"} handleClickButton={handleClickSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
