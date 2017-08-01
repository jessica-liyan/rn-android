/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {postFetch, getFetch} from '../api/index'
import {Actions} from 'react-native-router-flux';
import LoadingManage from './LoadingManage'

export default class MovieDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null,
      loadingStatus: 'loading',
      numberOfLines: 4,
      expandText: '展开'
    }
    console.log(this.props.id)
    this.FetchMovieDetail(this.props.id)
    this.FetchMovieDetail = this.FetchMovieDetail.bind(this)
  }

  componentDidMount () {
    this.FetchMovieDetail(this.props.id)
  }
  // 不用通过props传值的fetch，在render中可以直接获取数据
  // 通过props传值的fetch，需要有判断获取状态的参数
  // ?添加行数如果小于4行的判断
  FetchMovieDetail (id) {
    getFetch({
      path:  `movie/subject/${id}`,
      callback: (res) => {
        console.log(res)
        this.setState({
          data: res,
          loadingStatus: 'success'
        })
      }
    })
  }

  onExpand () {
    if(this.state.expandText == '展开'){
      this.setState({
        numberOfLines: null,
        expandText: '收起'
      })
    } else {
      this.setState({
        numberOfLines: 4,
        expandText: '展开'
      })
    }
  }

  render() {
    const {data, loadingStatus} = this.state;
    if(loadingStatus == 'success'){
      return (
        <ScrollView style={styles.main}>
          <View style={styles.header}>
            <Image source={{uri: data.images.large}} style={{width:140,height:200}} resizeMode="cover"/>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.tips}>{data.year}/{data.genres.join('/')}</Text>
            <Text style={styles.tips}>上映时间：{data.title}({data.countries.join(',')})</Text>
            <Text style={styles.tips}>片长：{data.title}</Text>
            <Text style={[styles.tips, styles.subPad]}>简介</Text>
            <View style={{position:'relative'}}>
              <Text style={styles.normal} numberOfLines={this.state.numberOfLines}>{data.summary}</Text>
              <Text style={styles.expandText} onPress={this.onExpand.bind(this)}>{this.state.expandText}</Text>
            </View>
            <Text style={[styles.tips, styles.subPad]}>影人</Text>
            <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
              {
                data.casts.map((item, index) => {
                  return (
                    <TouchableOpacity key={index}>
                      <Image source={{uri: item.avatars.large}} style={{width:120,height:160}} resizeMode="contain"/>
                      <Text style={styles.txt}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
        </ScrollView>
      );
    }else{
      return <LoadingManage status={loadingStatus}/>
    }
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  main:{
    backgroundColor:'#fff',
  },
  header:{
    height: 240,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content:{
    padding:15
  },
  title:{
    fontSize: 20,
    color: '#333',
    paddingVertical: 10
  },
  tips:{
    fontSize: 12,
    color: '#999',
    lineHeight: 18
  },
  subPad:{
    paddingTop:20,
    paddingBottom:10,
  },
  normal:{
    width: width - 30,
    fontSize: 14,
    color: '#666',
    lineHeight: 24
  },
  expandText:{
    fontSize: 14,
    lineHeight: 24,
    color: '#5CACEE',
    textAlign:'center'
  },
  scrollContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10
  },
  txt:{
    fontSize: 14,
    color: '#333',
    paddingVertical: 5,
    paddingLeft: 5
  }
});
