import React from 'react';

import { Panel, Button, Group, Div, CardGrid, Card } from '@vkontakte/vkui';



const InGame = ({ id, go, endgame, timeLeft }) => (
    <Panel id={id}>
        <Group>
            <Div className='InGame'>
                <Div>Игра началась!</Div>
                <CardGrid size="l" style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Card mode="shadow">
                        <div
                            style={{
                                height: 50,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
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