import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, AdaptivityProvider, AppRoot, ConfigProvider} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import LocationList from './panels/LocationsList';
import PreGame from './panels/PreGame';
import InGame from './panels/InGame';
import {GeneratePlayersList} from './services/GeneratePlayersList'
import { func } from 'prop-types';


const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('home')
	const [timeLeft, setTimeLeft] = useState(0)
	const [listOfPlayers, setListOfPlayers] = useState([])
	const [listOfLocations, setListOfLocations] = useState(["Ресторан",
		"Спа-салон",
		"Отель",
		"Университет",
		"Банк",
		"Больница",
		"Посольство",
		"Киностудия",
		"Цирк-шапито",
		"Театр",
		"Церковь",
		"Овощебаза",
		"Супермаркет",
		"Полицейский участок",
		"Корпоративная вечеринка",
		"Океанский лайнер",
		"Подводная лодка",
		"Станция техобслуживания",
		"Полярная станция",
		"Пляж",
	])
	const [numberOfPlayers, setNumberOfPlayers] = useState(0)
	let numberOfPlayers1

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});
	}, []);

	useEffect(() => {
		setTimeout(() => {
		  if (timeLeft)
			setTimeLeft(timeLeft - 1);
		}, 1000);
	});

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const startGame = e => {
		setNumberOfPlayers(e.currentTarget.dataset.to)
		setListOfPlayers(GeneratePlayersList(listOfLocations, e.currentTarget.dataset.to))
		setActivePanel("pregame")
	}

	const startInGame = e => {
		setTimeLeft(numberOfPlayers * 60)
		setActivePanel("ingame")
	}

	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<View activePanel={activePanel}>
						<Home id='home' go={go} startGame={startGame} />
						<LocationList id='locations-list' go={go} listOfLocations={listOfLocations} />
						<PreGame id="pregame" go={go} numberOfPlayers={numberOfPlayers} listOfPlayers={listOfPlayers} startInGame={startInGame} />
						<InGame id='ingame' go={go} timeLeft={timeLeft} />
					</View>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
