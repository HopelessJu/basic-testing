// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(1000);
    expect(bankAccount.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(1000);
    expect(() => bankAccount.withdraw(1001)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(1000);
    expect(() => bankAccount.transfer(1001, bankAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(1000);
    expect(() => bankAccount.transfer(101, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(500);
    expect(account.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(500);
    expect(account.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const accountA = getBankAccount(1000);
    const accountB = getBankAccount(500);
    accountA.transfer(500, accountB);
    expect(accountA.getBalance()).toBe(500);
    expect(accountB.getBalance()).toBe(1000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);
    const balance = await account.fetchBalance();
    if (balance !== null) expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(1000);
    const balance = account.fetchBalance();

    if (typeof balance === 'number') {
      await account.synchronizeBalance();
      expect(account.getBalance()).toBe(balance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(1000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
