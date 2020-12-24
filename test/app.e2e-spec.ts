import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import CompanyModule from '../src/company.module';

describe('CompanyController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CompanyModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/company (GET)', () => {
    return request(app.getHttpServer())
      .get('/company')
      .expect(200)
      .expect('{"name":"Morpeko","season":1}');
  });
});
