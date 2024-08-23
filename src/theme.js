import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul principal
      contrastText: '#ffffff', // Texto em branco nos elementos primários
    },
    secondary: {
      main: '#dc004e', // Cor secundária (um tom de vermelho como acento)
      contrastText: '#ffffff', // Texto em branco nos elementos secundários
    },
    background: {
      default: '#f4f4f4', // Fundo padrão da aplicação
      paper: '#ffffff', // Fundo dos cartões e diálogos (branco)
    },
    text: {
      primary: '#333333', // Cor principal do texto
      secondary: '#666666', // Cor secundária do texto
      disabled: '#9e9e9e', // Texto desabilitado
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Fonte principal
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1976d2', // Títulos em azul
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1976d2',
    },
    body1: {
      fontSize: '1rem',
      color: '#333333', // Texto normal em cinza escuro
    },
    button: {
      fontWeight: 600,
      textTransform: 'none', // Botões sem transformar texto em maiúsculas
    },
  },
  spacing: 8, // Unidade de espaçamento (pode ser usada como multiplicador)
  shape: {
    borderRadius: 8, // Bordas arredondadas em componentes como botões e cartões
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Bordas arredondadas nos botões
          padding: '8px 16px', // Espaçamento interno nos botões
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '8px 0', // Margem vertical nos campos de texto
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px', // Espaçamento interno padrão nos cartões
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Sombra suave nos cartões
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2', // Cor de fundo do AppBar
          color: '#ffffff', // Cor do texto no AppBar
        },
      },
    },
  },
});

export default theme;