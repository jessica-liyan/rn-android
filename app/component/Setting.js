import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import store from 'react-native-simple-store';

export default class Setting extends Component {
  constructor(props){
    super(props)
    this.data = [{
      key: 0,
      txt: '我的资料'
    },{
      key: 1,
      txt: '修改支付密码'
    },{
      key: 2,
      txt: '修改登录密码'
    },{
      key: 3,
      txt: '更换绑定手机号'
    },{
      key: 4,
      txt: '客服热线'
    },{
      key: 5,
      txt: '常见问题'
    },{
      key: 6,
      txt: '意见反馈'
    },{
      key: 7,
      txt: '关于我们'
    }]
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <FlatList
          data={this.data}
          renderItem={({item}) => {
            return (
              <TouchableHighlight underlayColor="#f5f5f5" onPress={()=>Actions.MyData()}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item.txt}</Text>
                  <Image source={require('../image/right.png')} style={styles.itemRight}/>
                </View>
              </TouchableHighlight>
            )
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item:{
    backgroundColor:'#fff',
    padding: 15,
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomWidth: 1,
    borderColor:'#ededed'
  },
  itemText:{
    flex:1,
    fontSize: 16,
    color:'#666'
  },
  itemRight:{
    width: 20,
    height: 20
  }
});
