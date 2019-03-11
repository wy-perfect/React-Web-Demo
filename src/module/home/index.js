import React from 'react';
import { Input } from 'semantic-ui-react';
import './index.css';

class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <div className='home-searchbar'>
          <Input fluid icon='search' placeholder='Search...' />
        </div>
      </div>
    );
  }
}

export default Home;