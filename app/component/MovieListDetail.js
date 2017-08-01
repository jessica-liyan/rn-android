import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LoadingManage from './LoadingManage'

export default class MovieListDetail extends Component {
  constructor (props) {
    super(props)
  }

  getName (arr) {
    let str = ''
    for(let item of arr){
      str += item.name + '/'
    }
    return str.substring(0, str.length - 1)
  }

  render () {
    const {data, loadingStatus} =  this.props
    if(loadingStatus === 'success'){
      return (
        <FlatList
          data={data}
          extraData={this.state}
          renderItem={({item, index}) => (
            <TouchableOpacity key={index} style={styles.row} onPress={() => Actions.MovieDetail({id:item.id})}>
              <View style={{flex:0.25}}><Image source={{uri: item.images.large}} style={{width:80,height:100}} resizeMode="cover"/></View>
              <View style={[styles.txtWrap,{flex:0.75}]}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.tips}>导演：{this.getName(item.directors)}</Text>
                <Text style={styles.tips}>主演：{this.getName(item.casts)}</Text>
                <Text style={styles.tips}>{item.collect_count}人看过</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )
    } else {
      return <LoadingManage status={loadingStatus}/>
    }
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 10,
    backgroundColor:'#fff',
    borderBottomWidth: 1,
    borderColor: '#ededed',
    borderStyle: 'solid',
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  txtWrap:{
    paddingLeft: 20
  },
  title:{
    fontSize: 16,
    color: '#333',
    paddingBottom: 10
  },
  tips:{
    fontSize: 12,
    color: '#999'
  },
});
