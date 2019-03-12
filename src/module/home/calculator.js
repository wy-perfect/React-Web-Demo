import React from 'react';
import { Icon, Tab } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Calculator extends React.Component {

  handle = () => {
    // 跳回到原来位置：主页
    let {history} = this.props;
    history.goBack();
  }

  render() {
    const panes = [
      { menuItem: '公积金贷款', render: () => <Tab.Pane>公积金贷款</Tab.Pane> },
      { menuItem: '商业贷款', render: () => <Tab.Pane>商业贷款</Tab.Pane> },
      { menuItem: '组合贷款', render: () => <Tab.Pane>组合贷款</Tab.Pane> },
    ];
    return (
      <div className='home-calc'>
        <div className = "home-calc-title">
          <Icon onClick={this.handle} name = 'angle left' size = 'large'/>贷款利率计算 
        </div> 
        <div className = "map-calc-content">
          <Tab panes={panes} />
        </div>
      </div>
    );
  }
}

export default withRouter(Calculator);
