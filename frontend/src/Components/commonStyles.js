import chroma from 'chroma-js';

export const COLORS = {
  SELECT_COLOR: '#ED1E79',
  BACKGROUND_COLOR: '#F0F0F0',
};

export const getAgeColor = age => {
  switch (true) {
    case age < 5:
      return '#f8bdc4';
    case age < 6:
      return '#e01a4f';
    case age < 7:
      return '#f6511d';
    case age < 8:
      return '#ffb400';
    case age < 9:
      return '#daff7d';
    case age < 10:
      return '#419d78';
    case age < 11:
      return '#15e6cd';
    case age < 12:
      return '#5fbff9';
    case age < 13:
      return '#016fb9';
    case age < 19:
      return '#631d76';
    case age < 25:
      return '#b288c0';
    case age < 37:
      return '#7c606b';
    default:
      return '#ccc';
  }
};

export const getTextColor = color => {
  return chroma(color || '#ccc').luminance() > 0.7 ? '#2e315c' : '#fff';
};
