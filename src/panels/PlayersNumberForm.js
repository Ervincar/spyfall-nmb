import React, { useState } from 'react';
import { Slider, FormItem, Input, Button, FormLayout } from '@vkontakte/vkui';

import "./PlayersNumberForm.css"


const PlayersNumberForm = ({startGame}) => {

    const [numberOfPlayers, setNumberOfPlayers] = useState(3);
  
    return (
    <FormLayout>
        <FormItem top="Количество игроков">
            <Slider
            step={1}
            min={3}
            max={12}
            value={Number(numberOfPlayers)}
            onChange={(numberOfPlayers) => setNumberOfPlayers(numberOfPlayers)} />
        </FormItem>
        <FormItem>
            <Input
            disabled
            align="center"
            value={String(numberOfPlayers)}
            onChange={(e) => setNumberOfPlayers(e.target.value)}
            type="number" />
        </FormItem>
        <FormItem className='submit_item'>
            <Button
            className='submit_button'
            onClick={startGame} 
            data-to={numberOfPlayers} 
            size="m" 
            mode="primary">
                Начать
            </Button>
        </FormItem>
    </FormLayout>
    );
}

  export default PlayersNumberForm