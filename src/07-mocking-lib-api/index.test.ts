// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const fakeBaseUrl = 'https://jsonplaceholder.typicode.com';
const fakeApi = '/posts/1';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: { id: 1, title: 'Title' } }),
  create() {
    return {
      get: this.get.mockResolvedValue({ data: { id: 1, title: 'Title' } }),
    };
  },
}));

jest.mock('lodash', () => {
  return {
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(fakeApi);
    expect(axiosSpy).toHaveBeenCalledWith({ baseURL: fakeBaseUrl });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(fakeApi);
    expect(axios.create().get).toHaveBeenCalledWith(fakeApi);
  });

  test('should return response data', async () => {
    const mockedData = { data: { id: 1, title: 'Title' } };
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockedData });

    const data = await throttledGetDataFromApi(fakeApi);
    expect(data).toBe(mockedData);
  });
});
