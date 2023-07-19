import React, { useState } from 'react';
import { UrlEdit } from './pages/UrlEdit/UrlEdit';
import UrlEntry from './pages/UrlEntry/UrlEntry';
import UrlList from './pages/UrlList/UrlList';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const [currentPage, setCurrentPage] = useState('entry');

  const renderPage = () => {
    if (currentPage === 'entry') {
      return <UrlEntry/>;
    } else if (currentPage === 'list') {
      return <UrlList />;
    } else if (currentPage === 'edit') {
      return <UrlEdit />;
    }
  };

  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      {renderPage()}
    </div>
  );
};
export default App;
