import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import CompanyController from './company.controller';
import CompanyService from './company.service';

function createMockedResponse(
  expected,
  result: string,
  expectedStatusCode = 200,
) {
  const mockedResponse = ({
    json(feed) {
      expect(feed).toEqual(expected);
      return result;
    },
    status(code) {
      expect(code).toBe(expectedStatusCode);
      return mockedResponse;
    },
  } as unknown) as Response;

  return mockedResponse;
}

describe('CompanyController', () => {
  const config = new ConfigService();
  jest.spyOn(config, 'get').mockImplementation(() => 1);
  let service: CompanyService;
  let controller: CompanyController;

  beforeEach(async () => {
    service = new CompanyService(config);
    controller = new CompanyController(service);
  });

  it('@info', () => {
    jest.spyOn(service, 'getCurrentSeason').mockImplementation(() => 5566);
    expect(
      controller.info({
        json(input) {
          expect(input).toMatchObject({ season: 5566 });
          return 'Company Info...';
        },
      }),
    ).toBe('Company Info...');
  });

  describe('@invest', () => {
    it('Happy path', () => {
      jest.spyOn(service, 'invest').mockImplementation((investment) => {
        expect(investment).toEqual({
          amount: 9999,
          investor: 'Happy Investor',
        });
        return {
          invested: 9999,
          total: 88888888,
        };
      });

      const fakeResponse = 'Response Success';
      expect(
        controller.invest(
          'Happy Investor',
          '9999',
          createMockedResponse(
            { invested: 9999, total: 88888888 },
            fakeResponse,
          ),
        ),
      ).toBe(fakeResponse);
    });

    it('Error case', () => {
      jest.spyOn(service, 'invest').mockImplementation((investment) => {
        expect(investment).toEqual({
          amount: 9999,
          investor: 'Bad Investor',
        });
        throw new Error('Invest Failure');
      });

      const fakeResponse = 'Response Failure';
      expect(
        controller.invest(
          'Bad Investor',
          '9999',
          createMockedResponse({ error: 'Invest Failure' }, fakeResponse, 400),
        ),
      ).toBe(fakeResponse);
    });
  });

  describe('@withdraw', () => {
    it('Happy path', () => {
      jest.spyOn(service, 'withdraw').mockImplementation((record) => {
        expect(record).toEqual({
          amount: 12345,
          investor: 'Happy Withdrawer',
        });
        return {
          withdrawn: 12345,
          total: 777,
        };
      });

      const fakeResponse = 'Withdraw Success';
      expect(
        controller.withdraw(
          'Happy Withdrawer',
          '12345',
          createMockedResponse({ withdrawn: 12345, total: 777 }, fakeResponse),
        ),
      ).toBe(fakeResponse);
    });

    it('Error case', () => {
      jest.spyOn(service, 'withdraw').mockImplementation((record) => {
        expect(record).toEqual({
          amount: 555555555,
          investor: 'Bad Withdrawer',
        });
        throw new Error('Withdraw Error');
      });

      const fakeResponse = 'Withdraw Failure';
      expect(
        controller.withdraw(
          'Bad Withdrawer',
          '555555555',
          createMockedResponse({ error: 'Withdraw Error' }, fakeResponse, 400),
        ),
      ).toBe(fakeResponse);
    });
  });

  it('@addCompanyProfits', () => {
    jest.spyOn(service, 'addProfit').mockImplementation((amount) => {
      expect(amount).toBe(666);
      return 6666;
    });

    jest.spyOn(service, 'getCurrentSeason').mockImplementation(() => 404);

    const fakeResponse = 'Add profit result';
    expect(
      controller.addCompanyProfits(
        '666',
        createMockedResponse({ season: 404, profits: 6666 }, fakeResponse),
      ),
    ).toBe(fakeResponse);
  });

  it('@claimProfits', () => {
    jest.spyOn(service, 'claim').mockImplementation((investor) => {
      expect(investor).toBe('我也要掏空公司');
      return 17;
    });

    const fakeResponse = 'Claim Result';
    expect(
      controller.claimProfits(
        '我也要掏空公司',
        createMockedResponse({ total: 17 }, fakeResponse),
      ),
    ).toBe(fakeResponse);
  });

  it('@startNewSeason', () => {
    jest.spyOn(service, 'nextSeason').mockImplementation(() => 100);

    const content = 'Start new season result';
    expect(
      controller.startNewSeason(createMockedResponse({ season: 100 }, content)),
    ).toBe(content);
  });
});
