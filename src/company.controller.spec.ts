import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import CompanyController from './company.controller';
import CompanyService from './company.service';

describe('CompanyController', () => {
  let company: CompanyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.test'],
        }),
      ],
      controllers: [CompanyController],
      providers: [CompanyService],
    }).compile();

    company = app.get<CompanyController>(CompanyController);
  });

  describe('/company', () => {
    it('Get company info', () => {
      expect(
        company.info({
          json(input) {
            expect(input).toMatchObject({ season: 1 });
            return JSON.stringify(input);
          },
        }),
      ).toContain('season');
    });
  });
});
