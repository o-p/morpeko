import Ticket from './ticket';
import Lottery from './lottery';

test.each`
  numbers
  ${[1, 3, 5, 7, 9, 11]}
  ${[]}
  ${[1, 2, 3]}
`('Ticket ($numbers)', ({ numbers }): void => {
  const ticket = new Ticket(numbers, 100, 10);
  expect(ticket.getNumbers()).toBe(numbers);
  expect(ticket.getRound()).toBe(10);
});

describe('Lottery', () => {
  test('Happy path', () => {
    const l = new Lottery();

    const id = l.buy([1, 2, 3, 4, 5, 6]);

    const last = new Map();
    last.set(1, true);
    last.set(2, true);
    last.set(3, true);
    last.set(4, true);
    last.set(5, true);
    last.set(6, true);
    l.setLast(last);

    expect(l.兌獎(id)).toBe(6);
  });

  test('開獎測試', () => {
    const l = new Lottery();

    expect(l.getHistory(1)).toBe(null);

    l.open();
    const map = l.getHistory(1);
    expect(map).toBeInstanceOf(Map);
    expect([...map.keys()].length).toBe(6);
  });

  test('透過注入 generator 測試流程', () => {
    const l = new Lottery();

    const id = l.buy([1, 48, 47, 46, 45, 44]);

    l.open(() => 0);
    expect(l.兌獎(id)).toBe(1);
  });

  test('未買彩卷直接兌獎', () => {
    const l = new Lottery();
    expect(() => l.兌獎(1)).toThrowError();
  });
});
