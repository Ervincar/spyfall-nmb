import React from 'react';

import { Panel, Button, Group, Div, CardGrid, Card } from '@vkontakte/vkui';

import "./InGame.css"


const InGame = ({ id, go, endgame, timeLeft }) => (
    <Panel id={id}>
        <Group>
            <Div className='InGame'>
                <Div className='title'>Игра началась!</Div>
                <Div className='title'>Осталось секунд</Div>
                <CardGrid size="l" style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Card mode="shadow">
                        <div className='card'
                            style={{
                                height: 150,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 40,
                                minWidth: "85vw",
                            }}
                        >
                            {timeLeft}
                        </div>
                    </Card>
                </CardGrid>

                <Button className='button' size="m" mode="primary" appearance='negative' onClick={endgame}>
                    Закончить игру
                </Button>
            </Div>
        </Group>
    </Panel>
);


export default InGame;