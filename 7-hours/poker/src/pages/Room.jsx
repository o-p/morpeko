import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import PlayerCards from '../components/PlayerCards'

const Room = () => {
  const [roomMeta, setRoomMeta] = useState({
    id: null,
    players: [],
  })

  const [cards, setCards] = useState([])

  // const [current, nextPlayer] = useState(0)

  const { name: roomId } = useParams()

  if (!roomMeta.id) {
    axios.post('http://192.168.156.163:3000/room', {
      roomId,
    }).then(
      () => axios.get(`http://192.168.156.163:3000/room/${roomId}`)
    ).then(
      ({ data }) => {
        const {
          room: id,
          players,
        } = data;
        setRoomMeta({
          id,
          players: players.map(player => ({ cards: [], ...player })),
        })

      }
    ).then(
      () => axios.get('http://192.168.156.163:3000/poker/1')
    ).then(
      ({ data }) => {
        console.log('cards', data)
        setCards(data)
      }
    )
  }

  useEffect(() => {
    const { players } = roomMeta

    console.log(roomMeta, 'xxx')

    cards.map((card, order) => {
      const index = order % players.length
      const player = players[index]
      setRoomMeta({
        ...roomMeta,
        players: [
          ...players.slice(0, index),
          { ...player, cards: [...player.cards, card] },
          ...players.slice(index + 1)
        ]
      })
      // player = { ...player, cards: [...player.cards, card] }
    })
  }, [cards])

  console.log(cards);
  console.log(roomMeta.players)

  return (
    <div className="room">
      <div className="player">xxxx</div>
      <div className="room-id"></div>
      <div className="people"></div>
      <div className="game-board">
        {
          roomMeta.players.map(player => <PlayerCards
            name={player.name}
            cards={player.cards}
          />)
        }
      </div>
    </div>
  )
}
export default Room
