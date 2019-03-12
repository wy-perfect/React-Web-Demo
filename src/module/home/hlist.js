import React from 'react';
import { Icon, Item } from 'semantic-ui-react';

class HouseList extends React.Component {

  render() {
    // 通过location.state可以获取编程式路由push方法传递过来的数据
    let param = this.props.location.state.query;
    return (
      <div className = 'house-list'>
        <div className = "house-list-title">
          <Icon name = 'angle left' size = 'large'/>
          {param.mname}
        </div> 
        <div className = "house-list-content">
          <Item.Group divided unstackable>
            列表内容
          </Item.Group>
        </div>
      </div>
    );
  }
}

export default HouseList;