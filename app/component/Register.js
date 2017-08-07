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
import {postFetch, getFetch} from '../api/index';
import store from 'react-native-simple-store';

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      tel: '',
      name: '',
      code: '',
      pwd: '',
      pwdTwice: '',
      secureEntry: true,
      timer: 60,
      timerTxt: '获取验证码',
      gettingCode: false,
    }
    store.get('userD').then((res)=>{
      localData = res[res.length - 1]
      this.setState({
        tel:localData.tel,
        name:localData.name,
        pwd:localData.pwd,
        pwdTwice:localData.pwd
      })
      console.log(res,localData,tel,name,pwd)
    })
    this.changeSecureEntry = this.changeSecureEntry.bind(this)
    this.setSecureEntry = this.setSecureEntry.bind(this)
    this.onRegister = this.onRegister.bind(this)
    this.timeOut = this.timeOut.bind(this)
    this.setCode = this.setCode.bind(this)
  }
  // 手机号码的格式验证  问题：input聚焦的时候底部的数据顶到输入框的上面  
  // 注册之后跳转到登录？
  changeSecureEntry(){
    this.setState({
      secureEntry: !this.state.secureEntry
    })
    console.log(this.state.secureEntry)
  }

  // 安全密码输入
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

  // 获取验证码倒计时
  timeOut(){
    const {tel, gettingCode} = this.state;
    if(!tel){
      ToastAndroid.show('请输入手机号！', ToastAndroid.SHORT)
    }else if(!gettingCode){
      fetch('http://liuwbox.com/zzbao/app/user/sms.htm?tel='+ tel +'&type=2', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(res => {
        console.log(res)
        ToastAndroid.show(res.msg, ToastAndroid.SHORT)
        if(res.status == 1){
          this.setState({
            gettingCode: true,
            timer: 60
          })
          let timer = setInterval(()=>{
            this.setState({
              timer: this.state.timer - 1
            })
            let txt = this.state.timer > 0 ?  this.state.timer + 's后重新获取' : '获取验证码'
            if(this.state.timer == 0){
              clearInterval(timer)
              this.setState({
                gettingCode: false
              })
            }
            this.setState({
              timerTxt: txt
            })
          },1000)  
        }
      })
    } else {
      ToastAndroid.show('验证码已发送至手机！', ToastAndroid.SHORT)
    }
  }

  // 获取验证码
  setCode(){
    return (
      <TouchableOpacity 
        style={styles.loginRight} 
        onPress={this.timeOut}>
        <Text style={styles.loginRightTxt}>{this.state.timerTxt}</Text>
      </TouchableOpacity>
    )
  }

  // 注册表单
  onRegister(){
    const {tel, name, code, pwd, pwdTwice} = this.state;
    if(!tel){
      ToastAndroid.show('请输入手机号！', ToastAndroid.SHORT)
    }else if(!name){
      ToastAndroid.show('请输入姓名！', ToastAndroid.SHORT)
    }else if(!code){
      ToastAndroid.show('请输入手机验证码！', ToastAndroid.SHORT)
    }else if(!pwd){
      ToastAndroid.show('请设置密码！', ToastAndroid.SHORT)
    }else if(pwd !== pwdTwice){
      ToastAndroid.show('两次密码输入不一致！', ToastAndroid.SHORT)
    }else{
       fetch('http://liuwbox.com/zzbao/app/user/regist.htm?tel='+tel+'&name='+name+'&captcha='+code+'&pwd='+pwd+'', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(res => {
        console.log(res)
        // 本地存储用户信息
        ToastAndroid.show(res.msg, ToastAndroid.SHORT)
        if(res.status == 1){
          store.push('userD',{
            tel: tel,
            name: name,
            pwd: pwd
          })
          // 跳转到登录页面
          Actions.Login()
        }
      })
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
            placeholder="手机号"
            placeholderTextColor="#ddd"
            selectionColor="#5CACEE"
            keyboardType="numeric"
            onChangeText={(tel) => this.setState({tel})}
            value={this.state.tel}
          />
          <Image source={require('../image/tel.png')} style={styles.loginIcon}/>
        </View>
        <View style={styles.loginWrap}>
          <TextInput
            style={styles.loginInput}
            underlineColorAndroid="transparent"
            placeholder="真实姓名"
            placeholderTextColor="#ddd"
            selectionColor="#5CACEE"
            keyboardType="default"
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
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
            onChangeText={(pwd) => this.setState({pwd})}
            value={this.state.pwd}
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
            onChangeText={(pwdTwice) => this.setState({pwdTwice})}
            value={this.state.pwdTwice}
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
