import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <View style={styles.login}>
        <Text style={styles.loginTitle}>欢迎来到豆瓣</Text>
        <View style={styles.loginWrap}>
          <TextInput
            style={styles.loginInput}
            underlineColorAndroid="transparent"
            placeholder="请输入用户名"
            placeholderTextColor="#ddd"
            selectionColor="#5CACEE"
            keyboardType="default"
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
          />
          <Image source={require('../image/user.png')} style={styles.loginIcon}/>
        </View>
        <View style={styles.loginWrap}>
          <TextInput
            style={styles.loginInput}
            underlineColorAndroid="transparent"
            placeholder="请输入密码"
            placeholderTextColor="#ddd"
            selectionColor="#5CACEE"
            keyboardType="numeric"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <Image source={require('../image/password.png')} style={styles.loginIcon}/>
        </View>
        <Button style={styles.button} onPress={() => Actions.Login()}>
          登录
        </Button>
        <View style={styles.row}>
          <Button style={[styles.buttonText,{borderLeftWidth:0}]} onPress={() => Actions.Login()}>注册账号</Button>
          <Button style={styles.buttonText} onPress={() => Actions.Login()}>忘记密码</Button>
        </View>
        <View style={styles.loginEntry}>
          <TouchableOpacity style={styles.loginEntryTxt} onPress={() => Actions.Login()}>
            <Image source={require('../image/qq.png')} style={styles.loginEntryImg}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.loginEntryTxt]} onPress={() => Actions.Login()}>
            <Image source={require('../image/wechat.png')} style={styles.loginEntryImg}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginEntryTxt} onPress={() => Actions.Login()}>
            <Image source={require('../image/weibo.png')} style={styles.loginEntryImg}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login:{
    flex:1,
    backgroundColor:'#fff',
    paddingHorizontal: 20
  },
  loginTitle:{
    fontSize: 30,
    color:'#5CACEE',
    paddingVertical: 40,
    textAlign: 'center'
  },
  loginWrap:{
    position:'relative',
  },
  loginInput:{
    borderBottomWidth: 1,
    borderColor:'#ddd',
    padding: 0,
    height: 40,
    paddingLeft: 30,
    marginTop: 30,
  },
  loginIcon:{
    width:20,
    height:20,
    position:'absolute',
    left:0,
    bottom:10
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
  row:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText:{
    fontSize: 14,
    color:'#5CACEE',
    fontWeight: 'normal',
    paddingHorizontal: 20,
    borderLeftWidth: 1,
    borderColor: '#ddd'
  },
  loginEntry:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    margin: 30,
    position:'absolute',
    left:0,
    right:0,
    bottom:0
  },
  loginEntryTxt:{
    width:40,
    height:40,
    justifyContent: 'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:20,
    marginHorizontal:20
  },
  loginEntryImg:{
    width: 20,
    height: 20,
  }
});
