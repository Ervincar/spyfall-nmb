export function GeneratePlayersList(listOfLocations, numberOfPlayers) {
	const location = listOfLocations[Math.floor(Math.random() * listOfLocations.length)]
	let players = (numberOfPlayers <= 8) ? ["Шпион"] : ["Шпион", "Шпион"]
  
	for (let i = 0; players.length < numberOfPlayers; i++) {
	  players.push(location)
	}
  
	for (let i = players.length - 1; i > 0; i--) {
	  let j = Math.floor(Math.random() * (i + 1));
	  [players[i], players[j]] = [players[j], players[i]];
	}

  let playersList = []

  let j = 0
  for (let i = 0; i < players.length * 2 - 1; i++) {
    if (i % 2 != 1) {
      playersList[i] = players[j]
      j++
    } else {
      playersList[i] = "Передайте телефон и нажмите здесь для получения следующей карты"
    }
  }

  playersList.push("Нажмите продолжить для начала игры")
  
	return playersList
  }