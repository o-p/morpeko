export default function PlayerCards({ name, cards }) {
  return (
    <div className="player-board">
      <div className="name">{ name }</div>
      {
        cards.map(card => <div id={ `${card.suit}-${card.rank}` }>{ card }</div>)
      }
    </div>
  )
}
