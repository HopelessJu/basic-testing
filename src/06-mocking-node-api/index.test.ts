// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const delay = 1000;
    doStuffByTimeout(callback, delay);
    jest.advanceTimersByTime(1000);
    expect(timeoutSpy).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const delay = 1000;
    doStuffByTimeout(callback, delay);

    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const intervalSpy = jest.spyOn(global, 'setInterval');
    const interval = 1000;
    const callback = jest.fn();
    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(1000);

    expect(intervalSpy).toHaveBeenLastCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 500;
    const callback = jest.fn();
    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(expect.anything(), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonexisting.path';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'existing.path';
    const content = 'Read Me';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(content);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(content);
  });
});
