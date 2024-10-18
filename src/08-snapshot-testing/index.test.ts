// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const testElements = [1, 2, 3, 4];
    const linkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    };

    const result = generateLinkedList(testElements);
    expect(result).toStrictEqual(linkedList);
  });

  test('should generate linked list from values 2', () => {
    const testElements = [1, 2, 3, 4];
    const result = generateLinkedList(testElements);
    expect(result).toMatchSnapshot();
  });
});
