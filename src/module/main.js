import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Link, Route, Switch } from "react-router-dom";

import './main.css';

// 引入子组件
import Home from './home/index';
import Info from './info/index';
import Chat from './chat/index';
import My from './my/index';
import Hlist from './home/hlist';
import Calc from './home/calculator';
import Map from './home/map';

// 自定义链接样式
function Menu(props) {
  // 组件传递过来的属性
  let {to, mname, icon} = props;
  return (
    <Route path={to} children={({match})=>{
      // 控制链接图标动态高亮
      let iconClass = 'iconfont icon-' + icon;
      iconClass = match? iconClass + ' active': iconClass;
      return (
        <Link to={to}>
          <div className={'placeholder'}>
            <i className={iconClass}></i>
            <div className={match?'active':''}>{mname}</div>
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
            <Route path='/home/main' component={Home}/>
            <Route path='/home/info' component={Info}/>
            <Route path='/home/chat' component={Chat}/>
            <Route path='/home/my' component={My}/>
            <Route path='/home/list' component={Hlist}/>
            <Route path='/home/calc' component={Calc}/>
            <Route path='/home/map' component={Map}/>
          </Switch>
        </div>
        <div className="main-menu">
          <Grid columns={4} divided>
            <Grid.Row>
              <Grid.Column>
                <Menu to='/home/main' mname='主页' icon='all'/>
              </Grid.Column>
              <Grid.Column>
                <Menu to='/home/info' mname='资讯' icon='search'/>
              </Grid.Column>
              <Grid.Column>
                <Menu to='/home/chat' mname='微聊' icon='atm'/>
              </Grid.Column>
              <Grid.Column>
                <Menu to='/home/my' mname='我的' icon='account'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Main;
