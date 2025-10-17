import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Typography } from '@alfalab/core-components/typography';
import sparkles from '../assets/sparkles.png';
import { appSt } from '../style.css';
import { thxSt } from './style.css';

const LINK = 'alfabank://longread?endpoint=v1/adviser/longreads/79127';

export const ThxLayout = () => {
  return (
    <>
      <div className={thxSt.container}>
        <img src={sparkles} width={80} height={80} className={thxSt.rocket} />
        <Typography.TitleResponsive style={{ margin: '24px 0 12px' }} font="system" tag="h1" view="small" weight="medium">
          Сервис пока недоступен
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          Вся команда очень старается — скоро всё заработает!
        </Typography.Text>
      </div>
      <div className={appSt.bottomBtn}>
        <ButtonMobile block view="secondary" href={LINK}>
          Спасибо, понятно!
        </ButtonMobile>
      </div>
    </>
  );
};
