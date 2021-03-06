import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
// 导入组件库的样式
import 'semantic-ui-css/semantic.min.css'
// 导入外界字体图标
import './assets/fonts/iconfont.css';

import AuthCheck from './auth';
import Login from './login';
import Main from './module/main';


function Abc() {
  return <div>123456</div>;
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/home" component={Main}/>
          <AuthCheck path='/abc' component={Abc}/>
          <Route render={() => <div>default</div>}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
