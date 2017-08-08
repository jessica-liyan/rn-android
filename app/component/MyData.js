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

export default class MyData extends Component {
  constructor(props){
    super(props)
    this.state = {
      id:'',
      name: '',
      birthday: null,
      birthDate: '点击选择出生日期',
      selectedOption: '', // 性别中文
      selectedIndex: 0, // 性别key
      data: null
    }
    this.onModify = this.onModify.bind(this)
    store.get('userInfo').then(res => {
      if(res){
        console.log(res)
        this.setState({
          data: res,
          id:res.userId,
          name: res.userName,
          birthday: res.userBirthday,
          birthDate: new Date(res.userBirthday).toLocaleDateString().replace(/\//g, "-").substr(0,10),
          selectedIndex: res.userSex
        })
      }
    })
  }

  // 提交修改的资料（用户名，生日，性别）
  onModify(){
    const {id,name,birthday,birthDate,selectedIndex} = this.state;
    fetch('http://liuwbox.com/zzbao/app/user/edit.htm?userName='+name+'&userId='+id+'&birthday='+birthDate+'&userSex='+selectedIndex+'', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => {
      console.log(res,id,name,birthDate,selectedIndex)
      ToastAndroid.show(res.msg, ToastAndroid.SHORT)
      store.update('userInfo',{
        userName: name,
        userBirthday:birthday,
        userSex: selectedIndex
      })
    })
  }

  async showPicker(options) {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open(options);      
      if (action === DatePickerAndroid.dismissedAction) {
      } else {
        // 成功，处理年月日的参数
        var date = new Date(year, month, day);
        this.setState({
          birthday: date.valueOf(),
          birthDate: date.toLocaleDateString().replace(/\//g, "-").substr(0,10)
        })
      }
    } catch ({code, message}) {
      console.warn(`Cannot open date picker`, message);
    }
  }

  render() {
    const options =  ['保密','男','女']
    function setSelectedOption(option,index){
      this.setState({
        selectedOption: option,
        selectedIndex: index
      });
    }

    function renderOption(option, selected, onSelect, index){
      const styleLabel = selected ? [styles.radioLabel,styles.radioLabelActive]:[styles.radioLabel]
      const styleInput = selected ? [styles.radioInput,styles.radioInputActive]:[styles.radioInput]
      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
            <View style={styleInput}></View>
            <Text style={styleLabel}>{option}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    function renderContainer(optionNodes){
      return <View style={[styles.loginInput,styles.birthWrap,{flexDirection:'row',marginTop:20}]}>
        <Image source={require('../image/sex.png')} style={styles.loginIcon}/>
        {optionNodes}
      </View>;
    }

    return (
      <View style={styles.login}>
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
        <TouchableHighlight underlayColor="#f5f5f5" onPress={this.showPicker.bind(this,{date: new Date(this.state.birthday)})} style={{marginTop:20}}>
          <View style={[styles.loginInput,styles.birthWrap]} >
            <Image source={require('../image/birth.png')} style={styles.loginIcon}/>
            <Text style={styles.birthText}>{this.state.birthDate}</Text>
          </View>
        </TouchableHighlight>
        <RadioButtons
          options={options}
          selectedIndex={this.state.selectedIndex}
          onSelection={ setSelectedOption.bind(this) }
          selectedOption={this.state.selectedOption }
          renderOption={ renderOption }
          renderContainer={ renderContainer }
        />
        <Button style={styles.button} onPress={this.onModify}>
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

