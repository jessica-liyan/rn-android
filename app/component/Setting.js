import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import store from 'react-native-simple-store';

export default class Setting extends Component {
  constructor(props){
    super(props)
    this.state = {
      tel: ''
    };
    store.get('userInfo').then(res => {
      if(res){
        console.log(res)
        this.setState({
          tel: res.userTel
        })
      }
    })
    this.showText = this.showText.bind(this)
  }

  onLoginOut(){
    Alert.alert(
      '温馨提示',
      '确定退出吗？',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '确定', onPress: () => {
          console.log('OK Pressed')
          store.delete('userInfo')
          Actions.Home()
        }},
      ],
      { cancelable: false }
    )
  }

  showText(item){
    console.log(item.telephone)
    if(item.telephone){
      return (
        <Text style={{fontSize:14,color:'#999'}}>{item.telephone}</Text>
      ) 
    }else{
      return null
    }
  }

  render() {
    let data = [{
      key: 0,
      txt: '我的资料',
      onPress: () => Actions.MyData()
    },{
      key: 1,
      txt: '修改支付密码',
      onPress: () => Actions.ModifyPayPwd()
    },{
      key: 2,
      txt: '修改登录密码',
      onPress: () => Actions.ModifyLoginPwd()
    },{
      key: 3,
      txt: '更换绑定手机号',
      telephone: this.state.tel,
      onPress: () => Actions.ModifyTel()
    },{
      key: 4,
      txt: '客服热线',
      telephone: '400-606-5500',
      onPress: () => Actions.MyData()
    },{
      key: 5,
      txt: '常见问题',
      onPress: () => Actions.MyData()
    },{
      key: 6,
      txt: '意见反馈',
      onPress: () => Actions.MyData()
    },{
      key: 7,
      txt: '关于我们',
      onPress: () => Actions.MyData()
    }]
    return (
      <View style={styles.wrapper}>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <TouchableHighlight underlayColor="#f5f5f5" onPress={item.onPress}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item.txt}</Text>
                  <View style={{flexDirection:'row'}}>
                    {this.showText(item)}        
                    <Image source={require('../image/right.png')} style={styles.itemRight}/>
                  </View>
                </View>
              </TouchableHighlight>
            )
          }}
        />
        <Button style={[styles.button,styles.margin]} onPress={this.onLoginOut.bind(this)}>
          退出登录
        </Button>  
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
    fontSize: 16,
    color:'#666'
  },
  itemRight:{
    width: 20,
    height: 20
  },
  button:{
    backgroundColor:'#5CACEE',
    fontSize: 16,
    color: '#fff',
    borderRadius: 6,
    paddingVertical:15,
    marginTop:30,
    fontWeight: 'normal'
  },
  margin:{
    marginHorizontal:10
  }
});
