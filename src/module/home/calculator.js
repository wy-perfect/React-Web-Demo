import React from 'react';
import { Icon, Tab, Grid, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: ''
    }
  }

  handle = () => {
    // 跳回到原来位置：主页
    let {history} = this.props;
    history.goBack();
  }

  // handleChange = (e, { value }) => this.setState({ value })
  // 绑定付款方式的值
  handleType = (e, {value}) => {
    // 注意：这里值的获取必须通过value的结构赋值进行操作
    // 不可以采用e.target.value方式获取值
    this.setState({ 
      type: value
    });
  }

  render() {
    // 贷款方式下拉选项数据
    const types = [
      { key: 1, text: '按房间总额', value: 1 },
      { key: 2, text: '按贷款总额', value: 2 },
    ];
    // 公积金贷款信息模板
    let first = (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={6}>
            贷款方式
          </Grid.Column>
          <Grid.Column width={10}>
            <Dropdown
              options={types}
              placeholder='选择贷款方式'
              selection
              onChange={this.handleType}
              value={this.state.type}
              />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
    const panes = [
      { menuItem: '公积金贷款', render: () => <Tab.Pane>{first}</Tab.Pane> },
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
