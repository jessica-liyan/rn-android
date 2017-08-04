import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      code: '',
      password: '',
      passwordTwice: '',
      secureEntry: true,
      timer: 60,
      timerTxt: '获取验证码'
    }
    this.changeSecureEntry = this.changeSecureEntry.bind(this)
    this.setSecureEntry = this.setSecureEntry.bind(this)
    this.onRegister = this.onRegister.bind(this)
    this.timeOut = this.timeOut.bind(this)
    this.setCode = this.setCode.bind(this)
  }
  // 手机号码的格式验证  给手机号发送验证码  验证码的匹配是否一致  问题：input聚焦的时候底部的数据顶到输入框的上面  
  // 注册之后跳转到登录？
  changeSecureEntry(){
    this.setState({
      secureEntry: !this.state.secureEntry
    })
    console.log(this.state.secureEntry)
  }
  setSecureEntry(){
    let eye = [require('../image/eye.png'),require('../image/eye1.png')]
    let chosenEye = this.state.secureEntry ? eye[0] : eye[1]
    return (
      <TouchableOpacity 
        style={styles.loginRight} 
        onPress={this.changeSecureEntry}>
        <Image source={chosenEye} style={styles.loginRightIcon}/>
      </TouchableOpacity>
    )
  }

  timeOut(){
    ToastAndroid.show('验证码已经发送至手机', ToastAndroid.SHORT)
    setInterval(()=>{
      this.setState({
        timer: this.state.timer - 1
      })
      let txt = this.state.timer >= 0 ?  this.state.timer + 's后重新获取' : '获取验证码'
      this.setState({
        timerTxt: txt
      })
    },1000)
  }
  
  setCode(){
    return (
      <TouchableOpacity 
        style={styles.loginRight} 
        onPress={this.timeOut}>
        <Text style={styles.loginRightTxt}>{this.state.timerTxt}</Text>
      </TouchableOpacity>
    )
  }

  // 提交表单
  onRegister(){
    const {username, code, password, passwordTwice} = this.state;
    if(!username){
      ToastAndroid.show('请输入手机号或邮箱！', ToastAndroid.SHORT)
    }else if(!code){
      ToastAndroid.show('请输入手机验证码！', ToastAndroid.SHORT)
    }else if(!password){
      ToastAndroid.show('请设置密码！', ToastAndroid.SHORT)
    }else if(password !== passwordTwice){
      ToastAndroid.show('两次密码输入不一致！', ToastAndroid.SHORT)
    }
  }

  render() {
    const {secureEntry} = this.state;
    return (
      <View style={styles.login}>
        <Text style={styles.loginTitle}>欢迎加入豆瓣</Text>
        <View style={styles.loginWrap}>
          <TextInput
            style={styles.loginInput}
            underlineColorAndroid="transparent"
            placeholder="手机号/邮箱"
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
            placeholder="手机验证码"
            placeholderTextColor="#ddd"
            selectionColor="#5CACEE"
            keyboardType="numeric"
            onChangeText={(code) => this.setState({code})}
            value={this.state.code}
          />
          <Image source={require('../image/code1.png')} style={styles.loginIcon}/>
          {this.setCode()}
        </View>
        <View style={styles.loginWrap}>
          <TextInput
            style={styles.loginInput}
            underlineColorAndroid="transparent"
            placeholder="密码"
            placeholderTextColor="#ddd"
            selectionColor="#5CACEE"
            keyboardType="numeric"
            secureTextEntry={secureEntry}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <Image source={require('../image/password.png')} style={styles.loginIcon}/>
          {this.setSecureEntry()}
        </View>
        <View style={styles.loginWrap}>
          <TextInput
            style={styles.loginInput}
            underlineColorAndroid="transparent"
            placeholder="再次输入密码"
            placeholderTextColor="#ddd"
            selectionColor="#5CACEE"
            keyboardType="numeric"
            secureTextEntry={true}
            onChangeText={(passwordTwice) => this.setState({passwordTwice})}
            value={this.state.passwordTwice}
          />
          <Image source={require('../image/password.png')} style={styles.loginIcon}/>
        </View>
        <Button style={styles.button} onPress={this.onRegister}>
          注册
        </Button>
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
    paddingVertical: 20,
    textAlign: 'center'
  },
  loginWrap:{
    position:'relative',
  },
  loginInput:{
    borderWidth: 1,
    borderColor:'#ddd',
    padding: 0,
    height: 40,
    paddingLeft: 40,
    marginTop: 20,
  },
  loginIcon:{
    width:20,
    height:20,
    position:'absolute',
    left:10,
    bottom:10
  },
  loginRight:{
    position:'absolute',
    right:10,
    bottom:10
  },
  loginRightIcon:{
    width:20,
    height:20,
  },
  loginRightTxt:{
    fontSize: 14,
    color: '#5CACEE'
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
