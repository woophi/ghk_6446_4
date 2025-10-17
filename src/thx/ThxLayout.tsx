import { Spinner } from '@alfalab/core-components/spinner';
import { useTimeout } from '../hooks/useTimeout';
import { thxSt } from './style.css';

const LINK = 'alfabank://longread?endpoint=v1/adviser/longreads/79127';

export const ThxLayout = () => {
  useTimeout(() => {
    window.location.replace(LINK);
  }, 2500);
  return (
    <>
      <div className={thxSt.container}>
        <Spinner style={{ margin: 'auto' }} visible preset={48} />
      </div>
    </>
  );
};
