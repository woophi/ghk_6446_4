import { AmountInput } from '@alfalab/core-components/amount-input';
import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Collapse } from '@alfalab/core-components/collapse';
import { Gap } from '@alfalab/core-components/gap';
import { Grid } from '@alfalab/core-components/grid';
import { PureCell } from '@alfalab/core-components/pure-cell';
import { Steps } from '@alfalab/core-components/steps';
import { Tag } from '@alfalab/core-components/tag';
import { Typography } from '@alfalab/core-components/typography';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronLeftMIcon } from '@alfalab/icons-glyph/ChevronLeftMIcon';
import { ChevronUpMIcon } from '@alfalab/icons-glyph/ChevronUpMIcon';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import fileImg from './assets/file.png';
import hbImg from './assets/hb.png';
import houseImg from './assets/house.png';
import percentImg from './assets/percent.png';
import rubIcon from './assets/rub.svg';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';
import { formatWord } from './utils/words';

const faqs = [
  {
    question: 'Есть ли комиссия?',
    answer: 'Нет, вы ничего дополнительно не платите.',
  },
  {
    question: 'Как выплачивается доход?',
    answer: 'Он начисляется на дебетовый или брокерский счёт.',
  },
  {
    question: 'Есть ли налог?',
    answer: 'Налоги как в облигациях',
  },
  {
    question: 'Можно ли вывести деньги до конца срока?',
    answer: 'Можно. Но тогда доход не начислится.',
  },
];

const chipsData = [10000, 36000, 50000, 72000];

const chipsPeriod = [6, 12, 24];

const chipsPercentByPeriod: Record<number, number> = {
  6: 0.19,
  12: 0.175,
  24: 0.16,
};

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [collapsedItems, setCollapsedItem] = useState<string[]>([]);
  const [sum, setSum] = useState(2000);
  const [period, setPeriod] = useState(12);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'step1' | 'step2' | 'step3'>('step1');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const submit = () => {
    setLoading(true);

    sendDataToGA({
      sum: checked ? 'all' : sum.toString(),
      period,
      avto: 'none',
      var4: step === 'step2' ? 'Открыть' : 'Перевести со вклада',
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  const handleChangeInput = (_: React.ChangeEvent<HTMLInputElement>, { value }: { value: number | null }) => {
    if (error) {
      setError('');
    }

    setSum(value ?? 0);
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  if (step === 'step3') {
    return (
      <>
        <div className={appSt.container}>
          <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="medium" font="system" weight="bold">
            Гарантированный доход
          </Typography.TitleResponsive>
          <Typography.Text view="primary-medium">
            Ваши деньги приносят доход. Условия и ставка не меняется весь срок. Деньги зачислятся, когда вклад закроется
          </Typography.Text>

          <div style={{ marginTop: '12px' }}>
            <Typography.Text view="primary-small" color="secondary" tag="p" defaultMargins={false}>
              Откуда пополнить
            </Typography.Text>

            <div className={appSt.bannerAccount}>
              <img src={rubIcon} width={76} height={48} alt="rubIcon" />

              <Typography.Text view="primary-small">Альфа-Вклад</Typography.Text>
            </div>
          </div>

          <div>
            <AmountInput
              label="Сколько"
              labelView="outer"
              value={sum}
              error={error}
              onChange={handleChangeInput}
              block
              minority={1}
              bold={false}
              min={1000}
              max={1_000_000}
              disabled={checked}
              positiveOnly
              integersOnly
              onBlur={() => {
                if (sum < 1000) {
                  setSum(1000);
                } else if (sum > 1_000_000) {
                  setSum(1_000_000);
                }
              }}
            />
          </div>

          <div>
            <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
              <SwiperSlide style={{ maxWidth: 'min-content' }}>
                <Tag size={32} view="filled" shape="rectangular" checked={checked} onClick={() => setChecked(!checked)}>
                  <Typography.Text view="primary-small">Перевести всё</Typography.Text>
                </Tag>
              </SwiperSlide>
            </Swiper>
          </div>

          <div>
            <Typography.Text view="primary-small" color="secondary">
              На какой срок
            </Typography.Text>
            <Gap size={8} />
            <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
              {chipsPeriod.map(chip => (
                <SwiperSlide key={chip} style={{ maxWidth: 'min-content' }}>
                  <Tag size={40} view="filled" shape="rectangular" checked={chip === period} onClick={() => setPeriod(chip)}>
                    <Typography.Text view="primary-medium">
                      {formatWord(chip, ['месяц', 'месяца', 'месяцев'])}
                    </Typography.Text>
                  </Tag>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div>
            <Typography.Text view="primary-small" color="secondary">
              Ваша ставка
            </Typography.Text>
            <Gap size={8} />
            <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="medium">
              {(chipsPercentByPeriod[period] * 100).toLocaleString('ru')}%
            </Typography.TitleResponsive>
          </div>
        </div>
        <Gap size={96} />

        <div className={appSt.bottomBtn}>
          <ButtonMobile
            view="secondary"
            size={56}
            style={{ minWidth: 56, maxWidth: 56 }}
            onClick={() => {
              setStep('step1');
            }}
            disabled={loading}
          >
            <ChevronLeftMIcon />
          </ButtonMobile>
          <ButtonMobile loading={loading} block view="primary" size={56} onClick={submit}>
            Продолжить
          </ButtonMobile>
        </div>
      </>
    );
  }

  if (step === 'step2') {
    return (
      <>
        <div className={appSt.container}>
          <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="medium" font="system" weight="bold">
            Гарантированный доход
          </Typography.TitleResponsive>
          <Typography.Text view="primary-medium">
            Ваши деньги приносят доход. Условия и ставка не меняется весь срок
          </Typography.Text>

          <div style={{ marginTop: '12px' }}>
            <AmountInput
              label="Сколько"
              labelView="outer"
              value={sum}
              error={error}
              onChange={handleChangeInput}
              block
              minority={1}
              bold={false}
              min={1000}
              max={1_000_000}
              positiveOnly
              integersOnly
              onBlur={() => {
                if (sum < 1000) {
                  setSum(1000);
                } else if (sum > 1_000_000) {
                  setSum(1_000_000);
                }
              }}
            />
          </div>

          <div>
            <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
              {chipsData.map(chip => (
                <SwiperSlide key={chip} style={{ maxWidth: 'min-content' }}>
                  <Tag size={32} view="filled" shape="rectangular" checked={chip === sum} onClick={() => setSum(chip)}>
                    <Typography.Text view="primary-small">{chip.toLocaleString('ru')} ₽</Typography.Text>
                  </Tag>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <Typography.Text view="primary-small" color="secondary">
              На какой срок
            </Typography.Text>
            <Gap size={8} />
            <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
              {chipsPeriod.map(chip => (
                <SwiperSlide key={chip} style={{ maxWidth: 'min-content' }}>
                  <Tag size={40} view="filled" shape="rectangular" checked={chip === period} onClick={() => setPeriod(chip)}>
                    <Typography.Text view="primary-medium">
                      {formatWord(chip, ['месяц', 'месяца', 'месяцев'])}
                    </Typography.Text>
                  </Tag>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div>
            <Typography.Text view="primary-small" color="secondary">
              Ваша ставка
            </Typography.Text>
            <Gap size={8} />
            <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="medium">
              {(chipsPercentByPeriod[period] * 100).toLocaleString('ru')}%
            </Typography.TitleResponsive>
          </div>
        </div>
        <Gap size={96} />

        <div className={appSt.bottomBtn}>
          <ButtonMobile
            view="secondary"
            size={56}
            style={{ minWidth: 56, maxWidth: 56 }}
            onClick={() => {
              setStep('step1');
            }}
            disabled={loading}
          >
            <ChevronLeftMIcon />
          </ButtonMobile>
          <ButtonMobile loading={loading} block view="primary" size={56} onClick={submit}>
            Продолжить
          </ButtonMobile>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={appSt.container}>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Typography.TitleResponsive tag="h1" view="medium" font="system" weight="bold">
            Гарантированный доход
          </Typography.TitleResponsive>
          <Gap size={8} />
          <Typography.Text view="primary-small" color="secondary">
            Выпуск облигаций, платежи по которому обспечены платежами по потребительским кредитам Альфа-Банка
          </Typography.Text>
        </div>

        <div>
          <img src={hbImg} alt="preview" width="100%" height={163} style={{ objectFit: 'contain' }} />
          <div className={appSt.boxP}>
            <Typography.TitleResponsive tag="h3" view="small" font="system" weight="semibold">
              Условия
            </Typography.TitleResponsive>

            <Grid.Row gutter={{ mobile: 8, desktop: 16 }}>
              <Grid.Col width="6">
                <Typography.Text view="primary-small" color="secondary">
                  Cумма
                </Typography.Text>
                <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="semibold">
                  от 1000 ₽
                </Typography.TitleResponsive>
              </Grid.Col>
              <Grid.Col width="6">
                <Typography.Text view="primary-small" color="secondary">
                  Срок
                </Typography.Text>
                <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="semibold">
                  6-24 месяцев
                </Typography.TitleResponsive>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row gutter={{ mobile: 8, desktop: 16 }}>
              <Grid.Col width="6">
                <Typography.Text view="primary-small" color="secondary">
                  Доходность
                </Typography.Text>
                <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="semibold">
                  16-19%
                </Typography.TitleResponsive>
              </Grid.Col>
              <Grid.Col width="6">
                <Typography.Text view="primary-small" color="secondary">
                  Выплаты дохода
                </Typography.Text>
                <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="semibold">
                  в конце срока
                </Typography.TitleResponsive>
              </Grid.Col>
            </Grid.Row>
          </div>
        </div>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Преимущества
        </Typography.TitleResponsive>

        <PureCell>
          <PureCell.Graphics verticalAlign="center">
            <img src={houseImg} width={48} height={48} alt="house" />
          </PureCell.Graphics>
          <PureCell.Content>
            <PureCell.Main>
              <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="semibold">
                Высокая доходность
              </Typography.TitleResponsive>

              <Typography.Text view="primary-small" color="secondary">
                Ставка 16—19%
              </Typography.Text>
            </PureCell.Main>
          </PureCell.Content>
        </PureCell>
        <PureCell>
          <PureCell.Graphics verticalAlign="center">
            <img src={percentImg} width={48} height={48} alt="percent" />
          </PureCell.Graphics>
          <PureCell.Content>
            <PureCell.Main>
              <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="semibold">
                Гибкие сроки
              </Typography.TitleResponsive>

              <Typography.Text view="primary-small" color="secondary">
                От 6 до 24 месяцев — выбираете сами
              </Typography.Text>
            </PureCell.Main>
          </PureCell.Content>
        </PureCell>
        <PureCell>
          <PureCell.Graphics verticalAlign="center">
            <img src={fileImg} width={48} height={48} alt="file" />
          </PureCell.Graphics>
          <PureCell.Content>
            <PureCell.Main>
              <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="semibold">
                Лёгкий старт
              </Typography.TitleResponsive>

              <Typography.Text view="primary-small" color="secondary">
                Начать можно с 1000 ₽
              </Typography.Text>
            </PureCell.Main>
          </PureCell.Content>
        </PureCell>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Преимущества
        </Typography.TitleResponsive>
        <Steps isVerticalAlign={true} interactive={false} className={appSt.stepStyle}>
          <Typography.Text view="component-primary">Выберите сумму и срок</Typography.Text>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="component-primary">
              Подпишите в приложении
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              Оформить можно без похода в офис
            </Typography.Text>
          </span>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="component-primary">
              Храните деньги до конца срока
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              Счёт можно пополнять — доход будет выше
            </Typography.Text>
          </span>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="component-primary">
              Получите доход
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              В конце срока деньги и проценты вернутся на расчётный счёт
            </Typography.Text>
          </span>
        </Steps>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Ваши сбережения в безопасности
        </Typography.TitleResponsive>

        <div className={appSt.boxB}>
          <StarMIcon width={24} height={24} />

          <div>
            <Typography.Text view="primary-small" tag="p" defaultMargins={false}>
              Кредитный рейтинг А+(RU)
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              Шкала: национальная. Прогноз: стабильный.{' '}
              <a
                style={{ color: 'inherit' }}
                href="https://www.acra-ratings.ru/ratings/issuers/554/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Рейтинг от АКРА
              </a>
            </Typography.Text>
          </div>
        </div>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Дополнительные вопросы
        </Typography.TitleResponsive>

        {faqs.map((faq, index) => (
          <div key={index}>
            <div
              onClick={() => {
                window.gtag('event', '6446_card_faq', {
                  var: 'var4',
                  faq: String(index + 1),
                });

                setCollapsedItem(items =>
                  items.includes(String(index + 1))
                    ? items.filter(item => item !== String(index + 1))
                    : [...items, String(index + 1)],
                );
              }}
              className={appSt.row}
            >
              <Typography.Text view="primary-medium" weight="medium" color="primary">
                {faq.question}
              </Typography.Text>
              {collapsedItems.includes(String(index + 1)) ? (
                <div style={{ flexShrink: 0 }}>
                  <ChevronUpMIcon />
                </div>
              ) : (
                <div style={{ flexShrink: 0 }}>
                  <ChevronDownMIcon />
                </div>
              )}
            </div>
            <Collapse expanded={collapsedItems.includes(String(index + 1))}>
              <Typography.Text view="primary-medium" color="secondary">
                {faq.answer}
              </Typography.Text>
            </Collapse>
          </div>
        ))}
      </div>
      <div style={{ height: '150px' }} />

      <div className={appSt.bottomBtnStep1}>
        <ButtonMobile
          block
          view="primary"
          onClick={() => {
            window.gtag('event', '6446_card_active', { var: 'var4' });
            setStep('step2');
          }}
        >
          Открыть
        </ButtonMobile>
        <ButtonMobile
          block
          view="secondary"
          onClick={() => {
            window.gtag('event', '6446_card_transfer', { var: 'var4' });
            setStep('step3');
          }}
        >
          Перевести со вклада
        </ButtonMobile>
      </div>
    </>
  );
};
