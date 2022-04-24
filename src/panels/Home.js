import React from 'react';
import PropTypes from 'prop-types';

import { Panel, Button, Group, Div, Slider, FormItem } from '@vkontakte/vkui';

import PlayersNumberForm from "./PlayersNumberForm"

import "./Home.css"
import Logo from "../img/logo.png"


const Home = ({ id, go, startGame}) => (
	<Panel id={id}>
		<Group>
			<Div className='main'>
				<img src={Logo} width={150} height={150} />
				<Div style={{fontSize: 30}}>Добро пожаловать</Div>
				<Div>Количество игроков</Div>
				<PlayersNumberForm startGame={startGame} />
				<Button className='button' size="m" mode="secondary" onClick={go} data-to="locations-list">
					Список локаций
				</Button>
			</Div>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;
