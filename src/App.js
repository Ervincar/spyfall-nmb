import React, { useState, useEffect, didMount } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, AdaptivityProvider, AppRoot, ConfigProvider} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import LocationList from './panels/LocationsList';
import PreGame from './panels/PreGame';
import InGame from './panels/InGame';
import {GeneratePlayersList} from './services/GeneratePlayersList'


const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('home')
	const [timeLeft, setTimeLeft] = useState()
	const [listOfPlayers, setListOfPlayers] = useState([])
	const [needFlashLight, setNeedFlashlight] = useState(false)
	const [isFlashlightAvailable, setFlashlightAvailable] = useState()
	const [isEndOfGame, setIsEndOfGame] = useState(false)
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

	function onFlashlight() {
		if (needFlashLight){
			bridge.send("VKWebAppFlashSetLevel", {"level": 1});
			setTimeout(offFlashlight, 500)
		}
	}

	function offFlashlight() {
		bridge.send("VKWebAppFlashSetLevel", {"level": 0});
		setTimeout(onFlashlight, 500)
	}

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});
	}, []);

	useEffect(() => {
		if (isFlashlightAvailable === undefined) {
			let fresult
			bridge.send("VKWebAppFlashGetInfo")
			.then(res => {
				fresult = res
			})
			.then(() => {
				setFlashlightAvailable(fresult)
			})
		}
		setTimeout(() => {
			if (timeLeft > 0 && !isEndOfGame){
				setTimeLeft(timeLeft - 1);
			}
			if (isEndOfGame){
				setTimeLeft()
				setNeedFlashlight(false)
			}
			if (timeLeft === 0 && isFlashlightAvailable){
				setNeedFlashlight(true)
				onFlashlight()
			}
		}, 1000);
	});

	useEffect(() => {
		if (isEndOfGame){
			setActivePanel("home")
		}
	}, [isEndOfGame])


	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const startGame = e => {
		setIsEndOfGame(false)
		setNumberOfPlayers(e.currentTarget.dataset.to)
		setListOfPlayers(GeneratePlayersList(listOfLocations, e.currentTarget.dataset.to))
		setActivePanel("pregame")
	}

	const startInGame = e => {
		setTimeLeft(numberOfPlayers * 6)
		setActivePanel("ingame")
	}

	const endGame = e => {
		setIsEndOfGame(true)
	}

	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<View activePanel={activePanel}>
						<Home id='home' go={go} startGame={startGame} />
						<LocationList id='locations-list' go={go} listOfLocations={listOfLocations} />
						<PreGame id="pregame" go={go} numberOfPlayers={numberOfPlayers} listOfPlayers={listOfPlayers} startInGame={startInGame} />
						<InGame id='ingame' go={go} endgame={endGame} timeLeft={timeLeft} />
					</View>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
