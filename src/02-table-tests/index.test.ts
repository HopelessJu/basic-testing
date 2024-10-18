import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 1, b: 1, action: Action.Multiply, expected: 1 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: -3, b: 2, action: Action.Multiply, expected: -6 },
  { a: 1, b: 1, action: Action.Divide, expected: 1 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: -3, b: 3, action: Action.Divide, expected: -1 },
  { a: 1, b: 1, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 'invalid value', b: 2, action: Action.Exponentiate, expected: null },
  { a: 5, b: 2, action: 'invalid action', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
