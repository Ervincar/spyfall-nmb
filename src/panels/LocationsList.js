import React from "react";
import PropTypes from "prop-types";

import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Card,
  CardGrid,
} from "@vkontakte/vkui";

import "./LocationsList.css";

const LocationCards = (props) => {
  const locationsList = props.locationsList;
  const locationsItems = [];
  locationsList.forEach((location) => {
    locationsItems.push(
      <Card mode="shadow" key={locationsItems.length}>
        <div
          style={{
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {location}
        </div>
      </Card>
    );
  });
  return locationsItems;
};

const LocationsList = (props) => (
  <Panel id={props.id}>
    <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to="home" />}>
      Список локаций
    </PanelHeader>
    <CardGrid size="l" style={{ paddingTop: 10, paddingBottom: 10 }}>
      <LocationCards locationsList={props.listOfLocations} />
    </CardGrid>
  </Panel>
);

LocationsList.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default LocationsList;
