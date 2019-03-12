import React from 'react';
import { Icon, Tab, Grid, Dropdown, Input, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';

// 封装图表组件
class MyChart extends React.Component {
  getOptions = () => {
    // 该选项来自于百度echarts官方的案例中option
    let option = {
      title : {
        text: '贷款数据统计',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{c}"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['贷款总额','支付利息']
      },
      series : [{
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'贷款总额'},
          {value:310, name:'支付利息'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    return option;
  }

  render() {
    return (
      <ReactEcharts option={this.getOptions()}/>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      year: 0,
      rate: 0,
      total: 0
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

  handleYear = (e, {value}) => {
    this.setState({ 
      year: value
    });
  }

  handleRate = (e, {value}) => {
    this.setState({ 
      rate: value
    });
  }

  hadleTotal = (e) => {
    // Input组件数据的绑定方式和原始方式一致
    this.setState({ 
      total: e.target.value
    });
  }
  // 处理计算功能
  handleCalc = () => {
    console.log(this.state.total)
    console.log(this.state.type)
    console.log(this.state.rate)
    console.log(this.state.year)
  }

  render() {
    // 贷款方式下拉选项数据
    const types = [
      { key: 1, text: '按房间总额', value: 1 },
      { key: 2, text: '按贷款总额', value: 2 },
    ];
    // 贷款年限的选项数据
    const generateYears = (n) => {
      let arr = [];
      for(let i=1;i<=n;i++) {
        arr.push({
          key : i,
          text: i,
          value: i
        });
      }
      return arr;
    }
    // 贷款利率选项数据
    const rates = [
      {key: 1,text: '基准利率(3.25%)',value: 1},
      {key: 2,text: '基准利率9.5折',value: 2},
      {key: 3,text: '基准利率9折',value: 3},
      {key: 4,text: '基准利率8.5折',value: 4}
    ]
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
        <Grid.Row>
          <Grid.Column width={6}>
            贷款总额
          </Grid.Column>
          <Grid.Column width={10}>
            <Input value={this.state.total} onChange={this.hadleTotal} className='calc-first-total' placeholder='贷款总额' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            贷款年限
          </Grid.Column>
          <Grid.Column width={10}>
            <Dropdown
              onChange={this.handleYear}
              options={generateYears(25)}
              placeholder='请选择年限'
              selection
              value={this.state.year}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            贷款利率
          </Grid.Column>
          <Grid.Column width={10}>
            <Dropdown
              onChange={this.handleRate}
              options={rates}
              placeholder='请选择利率'
              selection
              value={this.state.rate}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Button onClick={this.handleCalc} fluid color='green'>计算</Button>
          </Grid.Column>
        </Grid.Row>
        <div className="calc-chart">
          <MyChart/>
        </div>
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
