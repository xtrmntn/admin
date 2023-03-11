import { extendTheme, baseTheme, withDefaultColorScheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Montserrat, sans-serif',
  },
  components: {
    Spinner: {
      baseStyle: {
        display: 'flex',
        color: baseTheme.colors.whatsapp['500'],
        borderWidth: '4px',
        margin: '0 auto',
      },
      defaultProps: {
        size: 'xl',
      },
    },
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'gray.50',
      },
    },
  },
}, withDefaultColorScheme({
  colorScheme: 'whatsapp',
  components: ['Button', 'Checkbox'],
}));
