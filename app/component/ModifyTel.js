import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList,
  DatePickerAndroid,
  ToastAndroid
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import store from 'react-native-simple-store';
import { RadioButtons } from 'react-native-radio-buttons'

export default class ModifyTel extends Component {
  constructor(props){
    super(props)
    this.state = {
      id:'',
      tel:'',
      telOrigin: '',
      code:'',
      timer: 60,
      timerTxt: '获取验证码',
      gettingCode: false,
    }
    this.onModify = this.onModify.bind(this)
    this.setCode = this.setCode.bind(this)
    store.get('userInfo').then(res => {
      if(res){
        console.log(res)
        this.setState({
          id: res.userId,
          telOrigin: res.userTel
        })
      }
    })
  }

  // 提交修改的资料（用户名，生日，性别）
  onModify(){
    const {id,tel,telOrigin,code} = this.state;
    if(!tel){
      ToastAndroid.show(`请输入新的手机号码！`, ToastAndroid.SHORT)
    }else if(!code){
      ToastAndroid.show(`请输入验证码！`, ToastAndroid.SHORT)
    }else{
      fetch('http://liuwbox.com/zzbao/app/user/resetPhone.htm?userId='+id+'&phone='+tel+'&captcha='+code+'', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(res => {
        console.log(res)
        ToastAndroid.show(res.msg, ToastAndroid.SHORT)
        if(res.status == 1 ){
          Actions.Login()
        }
      })
    }
  }
  // 获取验证码倒计时
  timeOut(){
    const {tel, telOrigin, gettingCode} = this.state;
    if(!tel){
      ToastAndroid.show('请输入新的手机号码！', ToastAndroid.SHORT)
    }else if(tel == telOrigin){
      ToastAndroid.show(`新手机号与原手机号一致！`, ToastAndroid.SHORT)
    }else if(!gettingCode){
      fetch('http://liuwbox.com/zzbao/app/user/sms.htm?tel='+ tel +'&type=3', {
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
        onPress={this.timeOut.bind(this)}>
        <Text style={styles.loginRightTxt}>{this.state.timerTxt}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.login}>
        <View style={styles.loginWrap}>
          <TextInput
            style={styles.loginInput}
            underlineColorAndroid="transparent"
            placeholder="请输入新手机号"
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
        <Button style={styles.button} onPress={this.onModify.bind(this)}>
          确认修改
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
  birthWrap:{
    position:'relative',
    marginTop: 0
  },
  birthText:{
    fontSize: 14,
    color: '#333',
    lineHeight:28,
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
  },
  radioInput:{
    width:14,
    height:14,
    marginRight:10,
    borderRadius:10,
    borderColor:'#ddd',
    borderWidth:3
  },
  radioInputActive:{
    borderColor:'#5CACEE',
  },
  radioLabel:{
    fontSize:14,
    color:'#666',
  },
  radioLabelActive:{
    color:'#5CACEE',
  }
});

