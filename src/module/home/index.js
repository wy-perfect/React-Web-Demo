import React from 'react';
import { Input, Grid, Icon } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './index.css';
import axios from 'axios';

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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipe: [], // 轮播图数据
      menu: []   // 菜单数据
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
        {/*菜单*/}
        <div>
          <Menu menuData={this.state.menu}/>
        </div>
      </div>
    );
  }
}

export default Home;