import { createTheme } from '@shopify/restyle';

const palette = {
  black: '#000000',
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
};

const theme = createTheme({
  colors: {
    background: palette.white,
    foreground: palette.gray900,
    primary: palette.gray900,
    primaryForeground: palette.gray50,
    secondary: palette.gray100,
    secondaryForeground: palette.gray900,
    muted: palette.gray100,
    mutedForeground: palette.gray500,
    accent: palette.gray100,
    accentForeground: palette.gray900,
    destructive: '#EF4444',
    destructiveForeground: palette.white,
    border: palette.gray200,
    input: palette.gray200,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadii: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  textVariants: {
    defaults: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: 'foreground',
    },
    h1: {
      fontFamily: 'Inter-Bold',
      fontSize: 32,
      color: 'foreground',
    },
    h2: {
      fontFamily: 'Inter-Bold',
      fontSize: 28,
      color: 'foreground',
    },
    h3: {
      fontFamily: 'Inter-Bold',
      fontSize: 24,
      color: 'foreground',
    },
    body: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: 'foreground',
    },
    caption: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: 'mutedForeground',
    },
  },
});

export type Theme = typeof theme;
export default theme;