import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import store from 'react-native-simple-store';

export default class MyPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null
    }
    store.get('userInfo').then(res => {
      console.log(res)
      this.setState({
        data: res
      })
    })
    this.showName = this.showName.bind(this)
  }

  showName(){
    const {data} = this.state
    if(data){
      return <Text style={styles.userName}>{data.userName}</Text>
    }else{
      return (
        <Button
          style={styles.button}
          onPress={() => Actions.Login()}
        >
          登录/注册
        </Button>
      )
    }
  }

  render() {
    const {data} = this.state
    return (
      <View style={styles.wrapper}>
        <View style={styles.headWrap}>
          <Image source={ data? {uri: data.headPic} : require('../image/head.png')} style={styles.headImg}/>
        </View>
        {this.showName()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
    backgroundColor: '#5CACEE',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  headWrap:{
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headImg:{
    width: 60,
    height: 60
  },
  userName:{
    fontSize: 16,
    color:'#fff',
    marginLeft:40
  },
  button:{
    borderWidth:1,
    borderColor:'#fff',
    borderRadius:4,
    padding:10,
    marginLeft: 40,
    width: 120,
    fontSize:14,
    color:'#fff'
  }
});
