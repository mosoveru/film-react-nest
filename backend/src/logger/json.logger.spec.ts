import { JsonLogger } from './json.logger';

describe('Тестирование JsonLogger', () => {
  let logger: JsonLogger;
  const MESSAGE = 'Hello World!';
  const ADDITIONAL_PARAM = 'Additional Param';
  const ANOTHER_ADDITIONAL_PARAM = 'Another Param';

  enum LEVELS {
    LOG = 'log',
    ERROR = 'error',
    INFO = 'info',
    WARN = 'warn',
  }

  const returnExpectedJsonStringWithParams = (level: LEVELS) =>
    JSON.stringify({
      level,
      message: MESSAGE,
      optionalParams: [ADDITIONAL_PARAM, ANOTHER_ADDITIONAL_PARAM],
    });

  const returnExpectedJsonStringWithoutParams = (level: LEVELS) =>
    JSON.stringify({
      level,
      message: MESSAGE,
      optionalParams: [],
    });

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Проверка корректного форматирования строки', () => {
    const receivedStrWithParams = logger.formatMessage(
      LEVELS.INFO,
      MESSAGE,
      ADDITIONAL_PARAM,
      ANOTHER_ADDITIONAL_PARAM,
    );

    const receivedStrWithoutParams = logger.formatMessage(LEVELS.INFO, MESSAGE);

    expect(receivedStrWithParams).toEqual(
      returnExpectedJsonStringWithParams(LEVELS.INFO),
    );
    expect(receivedStrWithoutParams).toEqual(
      returnExpectedJsonStringWithoutParams(LEVELS.INFO),
    );
  });

  it('Проверка работы метода log', () => {
    const spy = jest.spyOn(console, 'log');

    logger.log(MESSAGE, ADDITIONAL_PARAM, ANOTHER_ADDITIONAL_PARAM);

    expect(spy).toHaveBeenCalledWith(
      returnExpectedJsonStringWithParams(LEVELS.LOG),
    );

    logger.log(MESSAGE);

    expect(spy).toHaveBeenCalledWith(
      returnExpectedJsonStringWithoutParams(LEVELS.LOG),
    );
  });

  it('Проверка работы метода warn', () => {
    const spy = jest.spyOn(console, 'log');

    logger.warn(MESSAGE, ADDITIONAL_PARAM, ANOTHER_ADDITIONAL_PARAM);

    expect(spy).toHaveBeenCalledWith(
      returnExpectedJsonStringWithParams(LEVELS.WARN),
    );

    logger.warn(MESSAGE);

    expect(spy).toHaveBeenCalledWith(
      returnExpectedJsonStringWithoutParams(LEVELS.WARN),
    );
  });

  it('Проверка работы метода error', () => {
    const spy = jest.spyOn(console, 'log');

    logger.error(MESSAGE, ADDITIONAL_PARAM, ANOTHER_ADDITIONAL_PARAM);

    expect(spy).toHaveBeenCalledWith(
      returnExpectedJsonStringWithParams(LEVELS.ERROR),
    );

    logger.error(MESSAGE);

    expect(spy).toHaveBeenCalledWith(
      returnExpectedJsonStringWithoutParams(LEVELS.ERROR),
    );
  });
});
