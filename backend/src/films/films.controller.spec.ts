import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { NotFoundException } from '@nestjs/common';

describe('Тестирование FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  const filmsMock = [
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      rating: 2.9,
      director: 'Итан Райт',
      tags: ['Документальный'],
      title: 'Архитекторы общества',
      about:
        'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
      description:
        'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.',
      image: '/images/bg1s.jpg',
      cover: '/images/bg1c.jpg',
      schedule: [
        {
          id: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
          daytime: '2023-05-29T10:30:00.001Z',
          hall: '2',
          rows: 5,
          seats: 10,
          price: 350,
          taken: ['1:2', '1:2'],
        },
      ],
    },
  ];

  const mockedFilmsService = {
    findAll: jest.fn(() => filmsMock),
    findByUUID: jest.fn((id: string) => (!!id ? filmsMock[0] : undefined)),
  };

  const RANDOM_ID = 'acdefg';
  const EMPTY_STRING = '';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue(mockedFilmsService)
      .compile();

    filmsController = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('Метод .findAvailableFilms() должен вызывать метод Films Service', () => {
    filmsController.findAvailableFilms();

    expect(filmsService.findAll).toHaveBeenCalled();
  });

  it('Метод .findAvailableFilms() должен возвращать корректное значение', async () => {
    const receivedValue = await filmsController.findAvailableFilms();

    expect(receivedValue).toEqual(
      expect.objectContaining({
        total: expect.any(Number),
        items: expect.any(Array),
      }),
    );
  });

  it('Метод .findActualSchedule() должен вызывать метод Films Service', () => {
    filmsController.findActualSchedule(RANDOM_ID);

    expect(filmsService.findByUUID).toHaveBeenCalledWith(RANDOM_ID);
  });

  it('Метод .findActualSchedule() должен возвращать корректное значение', async () => {
    const receivedValue = await filmsController.findActualSchedule(RANDOM_ID);

    expect(receivedValue).toEqual(
      expect.objectContaining({
        total: expect.any(Number),
        items: expect.any(Array),
      }),
    );
  });

  it('Метод .findActualSchedule() должен бросать исключение, если фильм не найден', async () => {
    try {
      await filmsController.findActualSchedule(EMPTY_STRING);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
