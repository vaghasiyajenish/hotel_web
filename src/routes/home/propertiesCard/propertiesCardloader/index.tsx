import React from "react";
import "./propertiesCardloader.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function PropertiesCardloader() {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((id) => {
        return (
          <div
            className="properties-loader-all-card-content-alignment"
            key={id}
          >
            <div className="card">
              <div className="grid">
                <div className="grid-items">
                  <div className="skeleton-image-loader">
                    <Skeleton className="skeleton-image-loader" />
                  </div>
                </div>
                <div className="grid-items">
                  <Skeleton className="first-contnet-loading" />
                  <Skeleton className="sec-contnet-loading" />
                  <Skeleton className="sec-contnet-loading" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
