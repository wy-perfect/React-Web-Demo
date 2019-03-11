import React from 'react';
import { Input } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './index.css';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipe: [
        {
          original: 'http://lorempixel.com/1000/600/nature/1/',
          thumbnail: 'http://lorempixel.com/250/150/nature/1/',
        },
        {
          original: 'http://lorempixel.com/1000/600/nature/2/',
          thumbnail: 'http://lorempixel.com/250/150/nature/2/'
        },
        {
          original: 'http://lorempixel.com/1000/600/nature/3/',
          thumbnail: 'http://lorempixel.com/250/150/nature/3/'
        }
      ]
    }
  }

  componentDidMount() {
    // 获取轮播图图片数据
    axios.post('http://47.96.21.88:8086/homes/swipe').then(res=>{
      this.setState({
        swipe: res.data.data.list
      });
    });
  }

  render() {
    return (
      <div className='home-container'>
        <div className='home-searchbar'>
          <Input fluid icon='search' placeholder='Search...' />
        </div>
        <div>
          <ImageGallery 
            showThumbnails={false} 
            showPlayButton={false}
            showFullscreenButton={false}
            items={this.state.swipe} />
        </div>
      </div>
    );
  }
}

export default Home;