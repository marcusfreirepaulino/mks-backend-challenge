import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';

describe('AppController', () => {
  let appController: MoviesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
    }).compile();

    appController = app.get<MoviesController>(MoviesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {});
  });
});
