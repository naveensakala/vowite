export const THEME_STYLES = {
  sindoor: {
    heroBg: 'linear-gradient(160deg,#2C1A0E 0%,#8B1A1A 50%,#C9422A 100%)',
    accentColor: '#C9A84C',
    sectionBg: '#2C1A0E',
    countdownBg: '#8B1A1A',
    footerBg: '#1a0a04',
    musicBg: 'rgba(201,168,76,0.08)',
    dark: true,
  },
  maangalyam: {
    heroBg: 'linear-gradient(160deg,#1A3A2A 0%,#2D6A4F 100%)',
    accentColor: '#C9A84C',
    sectionBg: '#1A3A2A',
    countdownBg: '#0d2018',
    footerBg: '#0d2018',
    musicBg: 'rgba(201,168,76,0.08)',
    dark: true,
  },
  midnight: {
    heroBg: 'linear-gradient(160deg,#0a0a1a 0%,#1A1A2E 50%,#16213E 100%)',
    accentColor: '#C9A84C',
    sectionBg: '#0f0f1f',
    countdownBg: '#1A1A2E',
    footerBg: '#0a0a1a',
    musicBg: 'rgba(201,168,76,0.08)',
    dark: true,
  },
  gulabi: {
    heroBg: 'linear-gradient(160deg,#3D0C11 0%,#8B1A4A 100%)',
    accentColor: '#F2C4CE',
    sectionBg: '#3D0C11',
    countdownBg: '#2a0808',
    footerBg: '#2a0808',
    musicBg: 'rgba(242,196,206,0.08)',
    dark: true,
  },
  keerthana: {
    heroBg: 'linear-gradient(180deg,#FDF6EC,#F5ECD7)',
    accentColor: '#C9A84C',
    sectionBg: '#FDF6EC',
    countdownBg: '#1A3A1A',
    footerBg: '#1A3A1A',
    musicBg: 'rgba(201,168,76,0.08)',
    dark: false,
  },
}

export const DEFAULT_EVENTS = [
  { icon: '🌿', name: 'Haldi Ceremony', time: 'Fri, 14 Feb · 10:00 AM', venue: 'Taj Garden', map: '', on: true },
  { icon: '🎶', name: 'Sangeet Night', time: 'Fri, 14 Feb · 7:00 PM', venue: 'Grand Ballroom', map: '', on: true },
  { icon: '💍', name: 'Wedding', time: 'Sat, 15 Feb · 9:00 AM', venue: 'Sri Kapali Temple', map: '', on: true },
  { icon: '🥂', name: 'Reception', time: 'Sat, 15 Feb · 7:00 PM', venue: 'ITC Grand Chola', map: '', on: true },
]

export const BLESSING_DEFAULTS = {
  sindoor: 'शुभ विवाह',
  maangalyam: 'శుభ వివాహం',
  midnight: 'A Night to Remember',
  gulabi: 'With Love & Flowers',
  keerthana: 'शुभ विवाह',
}
