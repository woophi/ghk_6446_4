import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#FFFFFF',
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const boxP = style({
  display: 'flex',
  padding: '20px 16px',
  flexDirection: 'column',
  gap: '12px',
  borderRadius: '12px',
  backgroundColor: '#EEEDFF',
  marginTop: '-60px',
  position: 'relative',
  zIndex: 1,
});
const boxB = style({
  display: 'flex',
  padding: '16px',
  gap: '12px',
  borderRadius: '12px',
  backgroundColor: '#F3F4F5',
});

const stepStyle = style({});

globalStyle(`${stepStyle} > div > div > div:first-child`, {
  backgroundColor: 'var(--color-light-neutral-translucent-1300)',
  color: 'var(--color-light-text-primary-inverted)',
});

const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const percentBox = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    border: '2px solid transparent',
    backgroundColor: '#2637580F',
    transition: 'border 0.2s ease-in-out',
    width: '120px',
    padding: '1rem',
    borderRadius: '12px',
  },

  variants: {
    active: {
      true: {
        border: '2px solid #000000',
      },
    },
  },
});

export const appSt = {
  bottomBtn,
  container,
  boxP,
  stepStyle,
  boxB,
  row,
  percentBox,
};
