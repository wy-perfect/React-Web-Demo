import React from 'react';
import { Input } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './index.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
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
            items={this.state.images} />
        </div>
      </div>
    );
  }
}

export default Home;