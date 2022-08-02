import React from 'react';
import Navbar from './Navbar';

import './styles.css';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  );
}

export default Layout;