import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { Link, Route, Switch } from "react-router-dom";

import './main.css';

// 自定义链接样式
function Menu(props) {
  let {to, mname, isExact, icon} = props;
  return (
    <Route path={to} exact={isExact} children={({match})=>{
      return (
        <Link to={to}>
          <div className={'placeholder'}>
            <i className={'iconfont icon-all'}></i>
            <div className={"active"}>{mname}</div>
          </div>
        </Link>
      );
    }}/>
  );
}

class Main extends React.Component {
  render() {
    return (
      <div className='main-container'>
        <div className="main-content">
          <Switch>
            <Route path='/home/main' render={()=><div>main</div>}/>
            <Route path='/home/info' render={()=><div>info</div>}/>
            <Route path='/home/chat' render={()=><div>chat</div>}/>
            <Route path='/home/my' render={()=><div>my</div>}/>
          </Switch>
        </div>
        <div className="main-menu">
          <Grid columns={4} divided>
            <Grid.Row>
              <Grid.Column>
                <Menu to='/home/main' isExact={true} icon='all' mname='主页'/>
              </Grid.Column>
              <Grid.Column>
                <Menu to='/home/info' icon='all' mname='资讯'/>
              </Grid.Column>
              <Grid.Column>
                <Menu to='/home/chat' icon='all' mname='微聊'/>
              </Grid.Column>
              <Grid.Column>
                <Menu to='/home/my' icon='all' mname='我的'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Main;
