import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
/* import { ReactQueryDevtools } from 'react-query/devtools' */
import { ToastContainer } from 'react-toastify';

/* contexto */
import { AuthProvider } from './ui/context/Auth';
import Manutencao from "./ui/pages/Manutencao";

import Routes from './ui/routes';

const client = new QueryClient();

function App() {

  if (process.env.REACT_APP_MANUTENCAO === 'true') {
    return <Manutencao />
  }

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <ToastContainer />

    </QueryClientProvider>
  );
}

export default App;
