import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import CompanyService from './company.service';

describe('CompanyService', () => {
  test('題目 Example', async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: ConfigService.name,
          useFactory: () => ({
            get(key: string) {
              expect(key).toBe('MAX_CLAIMABLE_SEASONS');
              // Suppose MaxClaimableSeason = 1
              return 1;
            },
          }),
        },
      ],
    }).compile();

    const company = app.get<CompanyService>(CompanyService);

    // Season 1

    // invest 10 	by Steve
    company.invest({ investor: 'Steve', amount: 10 });
    // addProfit 20
    company.addProfit(20);
    // invest 15 	by Dave
    company.invest({ investor: 'Dave', amount: 15 });
    // addProfit 30
    company.addProfit(30);
    // invest 25 	by Dave
    company.invest({ investor: 'Dave', amount: 25 });
    // claim 		by Dave  // Receives nothing
    expect(company.claim('Dave')).toBe(0);
    // Steve: 10, Dave: 40, profit: 50

    // Season 2
    company.nextSeason();
    expect(company.getCurrentSeason()).toBe(2)

    // claim 		by Dave  // Receives 40
    expect(company.claim('Dave')).toBe(40);

    // Season 3
    company.nextSeason();
    expect(company.getCurrentSeason()).toBe(3)

    // invest 20 	by Steve
    company.invest({ investor: 'Steve', amount: 20 });
    // claim 		by Steve // Receives nothing, no profit from season 2, profit from season 1 has expired
    expect(company.claim('Steve')).toBe(0);
    // addProfit 35
    company.addProfit(35);
    // Steve: 30, Dave: 40, profit: 35

    // Season 4
    company.nextSeason();
    expect(company.getCurrentSeason()).toBe(4);

    // claim 		by Steve // Receives 15
    expect(company.claim('Steve')).toBe(15);
    // claim 		by Dave  // Receives 20
    expect(company.claim('Dave')).toBe(20);
  });
});
