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

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Проверка корректного форматирования строки', () => {
    const receivedStr = logger.formatMessage(
      LEVELS.INFO,
      MESSAGE,
      ADDITIONAL_PARAM,
      ANOTHER_ADDITIONAL_PARAM,
    );

    const expectedJsonStr = JSON.stringify({
      level: LEVELS.INFO,
      message: MESSAGE,
      optionalParams: [ADDITIONAL_PARAM, ANOTHER_ADDITIONAL_PARAM],
    });

    expect(receivedStr).toEqual(expectedJsonStr);
  });

  it('Проверка работы метода log', () => {
    const spy = jest.spyOn(console, 'log');

    logger.log(MESSAGE, ADDITIONAL_PARAM, ANOTHER_ADDITIONAL_PARAM);
    const expectedJsonStr = logger.formatMessage(
      LEVELS.LOG,
      MESSAGE,
      ADDITIONAL_PARAM,
      ANOTHER_ADDITIONAL_PARAM,
    );

    expect(spy).toHaveBeenCalledWith(expectedJsonStr);
  });

  it('Проверка работы метода warn', () => {
    const spy = jest.spyOn(console, 'log');

    logger.warn(MESSAGE, ADDITIONAL_PARAM, ANOTHER_ADDITIONAL_PARAM);
    const expectedJsonStr = logger.formatMessage(
      LEVELS.WARN,
      MESSAGE,
      ADDITIONAL_PARAM,
      ANOTHER_ADDITIONAL_PARAM,
    );

    expect(spy).toHaveBeenCalledWith(expectedJsonStr);
  });

  it('Проверка работы метода error', () => {
    const spy = jest.spyOn(console, 'log');

    logger.error(MESSAGE, ADDITIONAL_PARAM, ANOTHER_ADDITIONAL_PARAM);
    const expectedJsonStr = logger.formatMessage(
      LEVELS.ERROR,
      MESSAGE,
      ADDITIONAL_PARAM,
      ANOTHER_ADDITIONAL_PARAM,
    );

    expect(spy).toHaveBeenCalledWith(expectedJsonStr);
  });
});
