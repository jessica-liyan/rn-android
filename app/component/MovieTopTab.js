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

export default class MovieTopTab extends Component {
  constructor (props) {
    super(props)
    console.log('tab',props)
    this.state = {
      data: [],
      loadingStatus: 'loading'
    }
    this.FetchTopMovie = this.FetchTopMovie.bind(this)
    this.FetchTopMovie(0)
  }

  FetchTopMovie(i){
    this.setState({
      data: [],
      loadingStatus: 'loading'
    })
    postFetch({
      path: 'movie/top250',

      params: {
        start: i * 50,
        count: 50
      },
      callback: res => {
        console.log(res.subjects)
        this.setState({
          data: res.subjects,
          loadingStatus: 'success'
        })
      }
    })
  }

  onChangeTab(index,ref){
    console.log(index.i)
    this.FetchTopMovie(index.i)
    console.log(this.state.data)
  }

  render () {
    const {data, loadingStatus} = this.state;
    return (
      <ScrollableTabView
        initialPage={0}
        tabBarBackgroundColor ='#fff'
        tabBarUnderlineStyle={styles.line}
        tabBarInactiveTextColor='#666'
        tabBarActiveTextColor='#5CACEE'
        onChangeTab={this.onChangeTab.bind(this)}
        renderTabBar={() => <DefaultTabBar style={{height: 45}} tabStyle={{paddingBottom:0}} />}
      >
        <MovieTopDetail tabLabel='1-50' data={data} idx={0} loadingStatus={loadingStatus}/>
        <MovieTopDetail tabLabel='51-100' data={data} idx={1} loadingStatus={loadingStatus}/>
        <MovieTopDetail tabLabel='101-150' data={data} idx={2} loadingStatus={loadingStatus}/>
        <MovieTopDetail tabLabel='151-200' data={data} idx={3} loadingStatus={loadingStatus}/>
        <MovieTopDetail tabLabel='201-250' data={data} idx={4} loadingStatus={loadingStatus}/>
      </ScrollableTabView>
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
