import { getBackgroundColor } from '../backgroundHelper';

describe('getBackgroundColor', () => {
  it('returns sunny color for "Clear"', () => {
    expect(getBackgroundColor('Clear')).toBe('#fef3c7');
  });

  it('returns cloudy color for "Clouds"', () => {
    expect(getBackgroundColor('Clouds')).toBe('#d1d5db');
  });

  it('returns rainy color for "Rain"', () => {
    expect(getBackgroundColor('Rain')).toBe('#a5b4fc');
  });

  it('returns storm color for "Thunderstorm"', () => {
    expect(getBackgroundColor('Thunderstorm')).toBe('#818cf8');
  });

  it('returns snowy color for "Snow"', () => {
    expect(getBackgroundColor('Snow')).toBe('#e0f2fe');
  });

  it('returns foggy color for "Mist"', () => {
    expect(getBackgroundColor('Mist')).toBe('#cbd5e1');
  });

  it('returns default color for unknown weather', () => {
    expect(getBackgroundColor('Alien')).toBe('#f3f4f6');
  });
});