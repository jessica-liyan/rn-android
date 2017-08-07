import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  DatePickerAndroid
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import store from 'react-native-simple-store';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class MyData extends Component {
  constructor(props){
    super(props)
    this.state = {
      tel: '',
      birthDate: '点击选择出生日期',
      sex: 0
    }
    this.radio_props = [
      {label: '男', value: 0 },
      {label: '女', value: 1 }
    ]
  }

  async showPicker(options) {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open(options);      
      if (action === DatePickerAndroid.dismissedAction) {
      } else {
        // 成功，处理年月日的参数
        var date = new Date(year, month, day);
        this.setState({
          birthDate: date.toLocaleDateString()
        })
      }
    } catch ({code, message}) {
      console.warn(`Cannot open date picker`, message);
    }
  }

  render() {
    return (
      <View style={styles.login}>
        <View style={styles.loginWrap}>
          <TextInput
            style={styles.loginInput}
            underlineColorAndroid="transparent"
            placeholder="手机号码"
            placeholderTextColor="#ddd"
            selectionColor="#5CACEE"
            keyboardType="numeric"
            onChangeText={(tel) => this.setState({tel})}
            value={this.state.tel}
          />
          <Image source={require('../image/user.png')} style={styles.loginIcon}/>
        </View>
        <TouchableHighlight underlayColor="#f5f5f5" onPress={this.showPicker.bind(this,{date: new Date(2020, 4, 25)})} style={{marginTop:20}}>
          <View style={[styles.loginInput,styles.birthWrap]} >
            <Image source={require('../image/birth.png')} style={styles.loginIcon}/>
            <Text style={styles.birthText}>{this.state.birthDate}</Text>
          </View>
        </TouchableHighlight>
        <RadioForm
          radio_props={this.radio_props}
          initial={0}
          formHorizontal={true}
          animation={true}
          onPress={(value) => {this.setState({value:value})}}
        >
          <RadioButton labelHorizontal={true}>
            <RadioButtonInput
              borderWidth={1}
              buttonInnerColor={'#e74c3c'}
              buttonSize={20}
              buttonOuterSize={60}
              buttonStyle={{}}
              buttonWrapStyle={{marginLeft: 10}}
            />
            <RadioButtonLabel
              labelHorizontal={true}
              labelStyle={{fontSize: 20, color: '#2ecc71'}}
              labelWrapStyle={{}}
            />
          </RadioButton>
        </RadioForm>
        <Button style={styles.button} onPress={this.onLogin}>
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
    color: '#ddd',
    lineHeight:26,
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

