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
      swipe: [],
      menu: []
    }
  }

  componentDidMount() {
    // 获取轮播图图片数据
    axios.post('homes/swipe').then(res=>{
      this.setState({
        swipe: res.data.data.list
      });
    });
    // 获取菜单的图书
    axios.post('/homes/menu').then(res=>{
      this.setState({
        menu: res.data.data.list
      });
    });
  }

  render() {
    
    return (
      <div className='home-container'>
        <div className='home-topbar'>
          <Input fluid icon='search' placeholder='Search...' />
        </div>
        <div>
          <ImageGallery 
            showThumbnails={false} 
            showPlayButton={false}
            showFullscreenButton={false}
            items={this.state.swipe} />
        </div>
        <div>
          <Menu menuData={this.state.menu}/>
        </div>
      </div>
    );
  }
}

export default Home;