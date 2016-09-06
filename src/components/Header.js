import React from 'react';

export default ({title}) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">{title}</a>
      </div>
    </div>
  </nav>
);

