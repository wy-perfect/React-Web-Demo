import React from 'react';
import { Input, Grid, Icon, Item } from 'semantic-ui-react';
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
          <Icon name='home' size='big' />
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
    return (
      <li key={item.question_id}>
        <div>
          <Icon name='question circle outline' />
          <span>{item.question_name}</span>
        </div>
        <div>
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipe: [], // 轮播图数据
      menu: [],   // 菜单数据
      info: [],  // 资讯数据
      faq: [],  // 问答数据
    }
  }

  // 封装统一的数据加载功能
  loadData = (pathName, dataName) => {
    axios.post(pathName).then(res=>{
      // 对象属性的名称可以是动态的（可以是变量）
      this.setState({
        [dataName]: res.data.list
      });
    });
  }

  componentDidMount() {
    // 获取轮播图图片数据
    this.loadData('homes/swipe', 'swipe');
    // 获取菜单的图书
    this.loadData('homes/menu', 'menu');
    // 获取资讯数据
    this.loadData('homes/info', 'info');
    // 获取问答数据
    this.loadData('/homes/faq', 'faq');
  }

  render() {
    return (
      <div className='home-container'>
        {/*搜索条*/}
        <div className='home-topbar'>
          <Input fluid icon='search' placeholder='Search...' />
        </div>
        {/*轮播图*/}
        <div>
          <ImageGallery 
            showThumbnails={false} 
            showPlayButton={false}
            showFullscreenButton={false}
            items={this.state.swipe} />
        </div>
        <div className="home-content">
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
        </div>
      </div>
    );
  }
}

export default Home;