import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native';

export default class LoadingManage extends Component {
  constructor(props){
    super(props)
  }

  render(){
    switch (this.props.status) {
      case 'loading':
        return (
          <View style={styles.container}>
            <ActivityIndicator color={'#5CACEE'} size="large"/>
          </View>
        )
      case 'success':
        return (
          <View>
            <Text style={styles.text}>加载成功</Text>
          </View>
        )
      case 'failure':
        return (
          <View>
            <Text style={styles.text}>加载失败</Text>
          </View>
        )
      default:
        return (
          <View>
            <Text style={styles.text}>状态定义错误</Text>
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'red',
    fontSize: 16,
  }
});
