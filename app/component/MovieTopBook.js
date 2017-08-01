import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar,DefaultTabBar} from 'react-native-scrollable-tab-view';
import {Actions} from 'react-native-router-flux';
import MovieTopDetail from './MovieTopDetail'
import {getFetch, postFetch} from '../api/index'

export default class MovieTopBook extends Component {
  constructor (props) {
    super(props)
    console.log('tab',props)
    this.state = {
      data: [],
      loadingStatus: 'loading'
    }
    this.FetchTopMovie = this.FetchTopMovie.bind(this)
    this.FetchTopMovie()
  }

  FetchTopMovie(){
    getFetch({
      path: 'movie/us_box',
      callback: res => {
        console.log(res.subjects)
        this.setState({
          data: res.subjects,
          loadingStatus: 'success'
        })
      }
    })
  }

  render () {
    const {data, loadingStatus} = this.state;
    return (
      <View>
        <MovieTopDetail data={data} idx={0} loadingStatus={loadingStatus}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  line:{
    height: 2,
    bottom: -1,
    backgroundColor:'#5CACEE'
  }
});
