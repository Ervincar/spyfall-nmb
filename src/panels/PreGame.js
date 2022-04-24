import React, { useState } from "react";

import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Card,
  CardGrid,
  Button,
  Div,
} from "@vkontakte/vkui";


let DrawCards = (listOfPlayers) => {
  const [currentCard, setCurrentCard] = useState(
    "Нажмите здесь для получения карты"
  );

  const onClick = () => {
    if (listOfPlayers.listOfPlayers.length) {
      setCurrentCard(listOfPlayers.listOfPlayers.shift());
    }
  };
  let card = (
    <Card
      mode="shadow"
      onClick={onClick}
      style={{
        color: "white",
        minWidth: "80vw",
        backgroundColor:
          currentCard == "Шпион"
            ? "#A70000"
            : currentCard.startsWith("Пере") || currentCard.startsWith("Наж")
            ? "#474747"
            : "#0012B0",
      }}
    >
      <div
        style={{
          fontSize: 25,
          height: 150,
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {currentCard}
      </div>
    </Card>
  );
  return card;
};

const PreGame = (props) => (
  <Panel id={props.id}>
    <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to="home" />}>
      Раздача карточек
    </PanelHeader>
    <Div style={{ display: "flex", justifyContent:"center", alignItems:"center", minHeight:"90vh", flexDirection: "column" }}>
      <CardGrid size="l">
        <DrawCards listOfPlayers={props.listOfPlayers} go={props.go} />
      </CardGrid>
      <Button
        size="l"
        mode="primary"
        onClick={props.startInGame}
        data-to={props.numberOfPlayers}
        style={{marginTop: "20px"}}
      >
        Продолжить
      </Button>
    </Div>
  </Panel>
);

export default PreGame;
