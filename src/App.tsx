import React, { useState } from 'react';
import { UrlEdit } from './pages/UrlEdit/UrlEdit';
import UrlEntry from './pages/UrlEntry/UrlEntry';
import UrlList from './pages/UrlList/UrlList';

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
      <nav>
        <button onClick={() => setCurrentPage('entry')}>Entry</button>
        <button onClick={() => setCurrentPage('list')}>List</button>
        <button onClick={() => setCurrentPage('edit')}>Edit</button>
      </nav>
      {renderPage()}
    </div>
  );
};
export default App;
