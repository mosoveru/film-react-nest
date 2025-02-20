import { TskvLogger } from './tskv.logger';

describe('Тестирование TSKVLogger', () => {
  let logger: TskvLogger;
  const MESSAGE = 'Hello World!';
  const ADDITIONAL_PARAM = 'Additional Param';
  const ANOTHER_ADDITIONAL_PARAM = 'Another Param';

  enum LEVELS {
    LOG = 'log',
    ERROR = 'error',
    INFO = 'info',
    WARN = 'warn',
  }

  const returnExpectedStringWithParams = (level: LEVELS) =>
    `level=${level}\tmessage=${MESSAGE}\toptionalParam-1=${ADDITIONAL_PARAM}\toptionalParam-2=${ANOTHER_ADDITIONAL_PARAM}\n`;
  const returnExpectedStringWithoutParams = (level: string) =>
    `level=${level}\tmessage=${MESSAGE}\n`;

  beforeEach(() => {
    logger = new TskvLogger();
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
      returnExpectedStringWithParams(LEVELS.INFO),
    );
    expect(receivedStrWithoutParams).toEqual(
      returnExpectedStringWithoutParams(LEVELS.INFO),
    );
  });

  it('Проверка работы метода log', () => {
    const spy = jest.spyOn(console, 'log');

    logger.log(MESSAGE, ADDITIONAL_PARAM, ANOTHER_ADDITIONAL_PARAM);

    expect(spy).toHaveBeenCalledWith(
      returnExpectedStringWithParams(LEVELS.LOG),
    );

    logger.log(MESSAGE);

    expect(spy).toHaveBeenCalledWith(
      returnExpectedStringWithoutParams(LEVELS.LOG),
    );
  });

  it('Проверка работы метода warn', () => {
    const spy = jest.spyOn(console, 'log');

    logger.warn(MESSAGE, ADDITIONAL_PARAM, ANOTHER_ADDITIONAL_PARAM);

    expect(spy).toHaveBeenCalledWith(
      returnExpectedStringWithParams(LEVELS.WARN),
    );

    logger.warn(MESSAGE);

    expect(spy).toHaveBeenCalledWith(
      returnExpectedStringWithoutParams(LEVELS.WARN),
    );
  });

  it('Проверка работы метода error', () => {
    const spy = jest.spyOn(console, 'log');

    logger.error(MESSAGE, ADDITIONAL_PARAM, ANOTHER_ADDITIONAL_PARAM);

    expect(spy).toHaveBeenCalledWith(
      returnExpectedStringWithParams(LEVELS.ERROR),
    );

    logger.error(MESSAGE);

    expect(spy).toHaveBeenCalledWith(
      returnExpectedStringWithoutParams(LEVELS.ERROR),
    );
  });
});
