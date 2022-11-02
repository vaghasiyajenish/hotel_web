import React from "react";
import "./propertiesCard.scss";
import LocationIcon from "../../../assets/icons/location.svg";
import { IHotelList } from "../../../_redux/models/IHotelList";

export interface PropertiesCardProps {
  data: IHotelList[];
}

const PropertiesCard: React.FC<PropertiesCardProps> = (props) => {
  const { data } = props;
  return (
    <div className="properties-all-card-content-alignment">
      {data.map((item, id) => {
        return (
          <div className="card" key={id}>
            <div className="grid">
              <div className="grid-items">
                <div className="image">
                  <img src={item.image} alt="CardImage" />
                </div>
              </div>
              <div className="grid-items">
                <h2>{item.title}</h2>
                <div className="location">
                  <img src={LocationIcon} alt="LocationIcon" />
                  <span>{item.address}</span>
                </div>
                <div className="details-alignment">
                  <span>{item.slaapkamers} Slaapkamers</span>
                  <ul>
                    <li>{item.badkamers} Badkamers</li>
                  </ul>
                </div>
                <h6>€ {item.price}</h6>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertiesCard;
