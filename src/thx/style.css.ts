import { style } from '@vanilla-extract/css';

const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 1rem',
  textAlign: 'center',
  minHeight: '100vh',
});

const rocket = style({
  marginTop: '9rem',
});

export const thxSt = {
  container,
  rocket,
};
