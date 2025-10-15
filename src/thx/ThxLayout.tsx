import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Typography } from '@alfalab/core-components/typography';
import sparkles from '../assets/sparkles.png';
import { appSt } from '../style.css';
import { thxSt } from './style.css';

const link =
  'alfabank://investments/market_asset_card?title=%D0%9D%D0%9E%D0%92%D0%90%D0%A2%D0%AD%D0%9A&id=RU000A0DKVS5&subtitle=NVTK&url=v1%2Fscreen-details-prefiller%2Fproducts%2Fbrokerage%2FSTOCK%2FRU000A0DKVS5&type=STOCK';

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
        <ButtonMobile block view="secondary" href={link}>
          Спасибо, понятно!
        </ButtonMobile>
      </div>
    </>
  );
};
