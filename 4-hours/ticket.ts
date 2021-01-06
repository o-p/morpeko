export default class Ticket {
  constructor(private readonly numbers: number[], private id: number, private round: number) {}

  getNumbers() {
    return this.numbers;
  }

  getRound() {
    return this.round;
  }
}
