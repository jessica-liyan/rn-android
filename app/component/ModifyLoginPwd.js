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

export default class ModifyLoginPwd extends Component {
  constructor(props){
    super(props)
    this.state = {
      id:'',
      pwd: '',
      newPwd: '',
      newPwdTwice: ''
    }
    this.onModify = this.onModify.bind(this)
    store.get('userInfo').then(res => {
      if(res){
        console.log(res)
        this.setState({
          id: res.userId
        })
      }
    })
  }

  // 提交修改的资料（用户名，生日，性别）
  onModify(){
    const {id,pwdOrigin,pwd,newPwd,newPwdTwice} = this.state;
    if(!pwd){
      ToastAndroid.show(`请输入原密码！`, ToastAndroid.SHORT)
    }else if(!newPwd){
      ToastAndroid.show(`请输入新密码！`, ToastAndroid.SHORT)
    }else if(!newPwdTwice){
      ToastAndroid.show(`请再次输入新密码！`, ToastAndroid.SHORT)
    }else if(newPwd !== newPwdTwice){
      ToastAndroid.show(`两次新密码输入不一致！`, ToastAndroid.SHORT)
    }else{
      fetch('http://liuwbox.com/zzbao/app/user/editPwd.htm?userId='+id+'&oldPwd='+pwd+'&newPwd='+newPwd+'', {
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

  render() {
    return (
      <View style={styles.login}>
        <View style={styles.loginWrap}>
          <TextInput
            style={styles.loginInput}
            underlineColorAndroid="transparent"
            placeholder="请输入原密码"
            placeholderTextColor="#ddd"
            selectionColor="#5CACEE"
            secureTextEntry={true}
            keyboardType="numeric"
            onChangeText={(pwd) => this.setState({pwd})}
            value={this.state.pwd}
          />
          <Image source={require('../image/code1.png')} style={styles.loginIcon}/>
        </View>
        <View style={styles.loginWrap}>
          <TextInput
            style={styles.loginInput}
            underlineColorAndroid="transparent"
            placeholder="请输入新密码"
            placeholderTextColor="#ddd"
            selectionColor="#5CACEE"
            secureTextEntry={true}
            keyboardType="numeric"
            onChangeText={(newPwd) => this.setState({newPwd})}
            value={this.state.newPwd}
          />
          <Image source={require('../image/password.png')} style={styles.loginIcon}/>
        </View>
        <View style={styles.loginWrap}>
          <TextInput
            style={styles.loginInput}
            underlineColorAndroid="transparent"
            placeholder="请再次输入新密码"
            placeholderTextColor="#ddd"
            selectionColor="#5CACEE"
            secureTextEntry={true}
            keyboardType="numeric"
            onChangeText={(newPwdTwice) => this.setState({newPwdTwice})}
            value={this.state.newPwdTwice}
          />
          <Image source={require('../image/password.png')} style={styles.loginIcon}/>
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

