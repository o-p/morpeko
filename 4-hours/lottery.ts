import Ticket from './ticket';

export default class Lottary {
  private round = 1;

  private history = new Map<number, Map<number, boolean>>();

  private tickets = new Map<number, Ticket>();

  private counts = 0;

  buy(arr: number[]): number {
    if (arr.length !== 6) {
      throw new Error('invalid number counts');
    }

    arr.reduce((all, num) => {
      if (all[num]) {
        throw new Error('duplicated');
      }
      if (num < 0 || num > 49) {
        throw new Error('invalid number');
      }
      all[num] = 1;
      return all;
    }, {});

    const id = ++this.counts;
    this.tickets.set(id, new Ticket(arr, id, this.round));
    return id;
  }

  static getNumber(arr: number[], generator = Math.random) {
    const size = arr.length;

    const pos = Math.floor(generator() * size);
    const num = arr[pos];

    return {
      num,
      rest: [...arr.slice(0, pos), ...arr.slice(pos + 1)],
    };
  }

  setLast(last: Map<number, boolean>): void {
    this.history.set(this.round++, last);
  }

  open(generator = Math.random) {
    const availables = new Array(49).fill(0).map((v, i) => i + 1);

    const 中獎的 = new Array(6).fill(0).reduce(
      ({ goals, numbers }) => {
        const result = Lottary.getNumber(numbers, generator);
        return {
          goals: [...goals, result.num],
          numbers: result.rest,
        };
      },
      { goals: [], numbers: availables },
    ).goals;

    return this.setLast(
      中獎的.reduce((map, v) => {
        map.set(v, true);
        return map;
      }, new Map()),
    );
  }

  兌獎(id: number) {
    const ticket = this.tickets.get(id) ?? null;
    if (!ticket) {
      throw new Error('No ticket');
    }

    const numbers = this.history.get(ticket.getRound());

    if (!numbers) {
      throw new Error('Not open yet');
    }
    const all = ticket.getNumbers().filter((v) => numbers.get(v)).length;
    return all;
  }

  getHistory(round: number) {
    return this.history.get(round) ?? null;
  }
}
