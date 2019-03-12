import React from 'react';
import { Input, Grid, Icon, Item, Button, Dimmer, Loader } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './index.css';
import axios from 'axios';
import { baseURL } from '../../common';

// 菜单组件
function Menu(props) {
  
  let {menuData} = props;
  let menuInfo = menuData.map(item=>{
    return (
      <Grid.Column key={item.id}>
        <div className='home-menu-item'>
          <Icon name='home  ' size='big' />
        </div>
        <div>{item.menu_name}</div>
      </Grid.Column>
    );
  });
  return (
    <Grid padded divided >
      <Grid.Row columns={4}>
        {menuInfo}
      </Grid.Row>
    </Grid>
  );
}

// 资讯组件
function Info(props) {
  let {infoData} = props;
  let infoContent = infoData.map(item=>{
    return (
      <Item.Header key={item.id}>
        <span>限购 ●</span>
        <span>{item.info_title}</span>
      </Item.Header>
    );
  });
  return (
    <div className='home-msg'>
      <Item.Group unstackable>
        <Item className='home-msg-img' >
          <Item.Image size='tiny' src={baseURL+'public/zixun.png'} />
          <Item.Content verticalAlign='top'>
            {infoContent}
            <div className="home-msg-more">
              <Icon name='angle right' size='big' />
            </div>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  );
}

// 问答组件
function Faq(props) {
  let {faqData} = props;
  let faqContent = faqData.map(item=>{
    let arr = item.question_tag.split(',');
    let btns = arr.map((item,index)=>{
      return <Button key={index} basic color='green' size='mini'>{item}</Button>
    });
    return (
      <li key={item.question_id}>
        <div>
          <Icon name='question circle outline' />
          <span>{item.question_name}</span>
        </div>
        <div>
          {btns}
          <div>{item.atime} ● <Icon name='comment alternate outline' /> {item.qnum}</div>
        </div>
      </li>
    );
  });
  return (
    <div className='home-ask'>
      <div className='home-ask-title'>好客问答</div>
      <ul>
        {faqContent}
      </ul>
    </div>
  );
}

// 房源组件
function House(props) {
  console.log(props);
  
  let {houseData} = props;
  let newHouse = [];
  let oldHouse = [];
  let hireHouse = [];
  houseData.forEach(item=>{
    let itemContent = (
      <Item key={item.id}>
        <Item.Image src={baseURL+'public/home.png'}/>
        <Item.Content>
          <Item.Header>{item.home_name}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{item.home_desc}</span>
          </Item.Meta>
          <Item.Description>
            {item.home_tags.split(',').map((tag,index)=>{return <Button key={index} basic color='green' size='mini'>{tag}</Button>})}
          </Item.Description>
          <Item.Description>{item.home_price}</Item.Description>
        </Item.Content>
      </Item>
    );
    // 根据item.home_type区分是那种房源信息
    if(item.home_type === 1) {
      // 新房
      newHouse.push(itemContent);
    }else if(item.home_type === 2) {
      // 二手房
      oldHouse.push(itemContent);
    }else{
      // 租房
      hireHouse.push(itemContent);
    }
  });
  return (
    <div>
      <div>
        <div className='home-hire-title'>最新开盘</div>
        <Item.Group divided unstackable>
          {newHouse}
        </Item.Group>
      </div>
      <div>
        <div className='home-hire-title'>二手精选</div>
        <Item.Group divided unstackable>
          {oldHouse}
        </Item.Group>
      </div>
      <div>
        <div className='home-hire-title'>组一个家</div>
        <Item.Group divided unstackable>
          {hireHouse}
        </Item.Group>
      </div>
    </div>
  );
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipe: [], // 轮播图数据
      menu: [],   // 菜单数据
      info: [],  // 资讯数据
      faq: [],  // 问答数据
      house: [],  // 房源数据,
      loadFlag: true // 数据加载状态位
    }
  }

  // 封装统一的数据加载功能
  loadData = (pathName, dataName) => {
    // 这里的return是loadData的返回值，实际上就是Promise实例对象
    return axios.post(pathName).then(res=>{
      // 对象属性的名称可以是动态的（可以是变量）
      // this.setState({
      //   [dataName]: res.data.list
      // });
      // 这个返回值是实际的数据，该数据传递给下一个then
      // 如果在then中返回具体的数据，那么在下一个then中可以获取该数据
      return res.data.list;
    });
  }

  componentDidMount() {
    // 获取轮播图图片数据
    let swipe = this.loadData('homes/swipe', 'swipe');
    // 获取菜单的图书
    let menu = this.loadData('homes/menu', 'menu');
    // 获取资讯数据
    let info = this.loadData('homes/info', 'info');
    // 获取问答数据
    let faq = this.loadData('/homes/faq', 'faq');
    // 获取房源数据
    let house = this.loadData('/homes/house', 'house');
    // 设置加载状态位，控制遮罩效果
    // Promise.all的作用，发送所有的异步请求，并且所有的结果返回之后触发then
    Promise.all([swipe, menu, info, faq, house]).then(ret=>{
      // 统一更新数据
      this.setState({
        swipe: ret[0],
        menu: ret[1],
        info: ret[2],
        faq: ret[3],
        house: ret[4],
      }, () => {
        // 所有的数据已经返回，隐藏遮罩效果
        this.setState({
          loadFlag: false
        });
      });
    });
  }

  render() {
    return (
      <div className='home-container'>
        {/*搜索条*/}
        <div className='home-topbar'>
          <Input fluid icon='search' placeholder='Search...' />
        </div>
        {/*遮罩效果*/}
        <Dimmer inverted active={this.state.loadFlag} page>
          <Loader>Loading</Loader>
        </Dimmer>
        <div className="home-content">
          {/*轮播图*/}
          <div>
            <ImageGallery 
              showThumbnails={false} 
              showPlayButton={false}
              showFullscreenButton={false}
              items={this.state.swipe} />
          </div>
          {/*菜单*/}
          <div>
            <Menu menuData={this.state.menu}/>
          </div>
          {/*资讯*/}
          <div>
            <Info infoData={this.state.info}/>
          </div>
          {/*问答*/}
          <div>
            <Faq faqData={this.state.faq}/>
          </div>
          {/*房源*/}
          <div>
            <House houseData={this.state.house}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;