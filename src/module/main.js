import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import './main.css';

class Main extends React.Component {
  render() {
    return (
      <div className='main-container'>
        <div className="main-content">
          内容
        </div>
        <div className="main-menu">
          <Grid columns={4} divided>
            <Grid.Row>
              <Grid.Column>
                <div className='menu-icon'>
                  <Icon name='home' size='small' />
                </div>
                <div className='menu-name'>
                  菜单
                </div>
              </Grid.Column>
              <Grid.Column>
                菜单
              </Grid.Column>
              <Grid.Column>
                菜单
              </Grid.Column>
              <Grid.Column>
                菜单
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Main;
