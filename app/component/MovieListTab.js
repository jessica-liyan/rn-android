import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar,DefaultTabBar} from 'react-native-scrollable-tab-view';
import {Actions} from 'react-native-router-flux';
import MovieListDetail from './MovieListDetail'
import {getFetch, postFetch} from '../api/index'

export default class MovieListTab extends Component {
  constructor (props) {
    super(props)
    console.log('tab',props)
    this.state = {
      newMovieList: [],
      comingMovieList: [],
      city: '武汉',
      newLoadingStatus: 'loading',
      comingLoadingStatus: 'loading'
    }
    console.log(this.props.category)
    this.state.initialPage = this.props.category == 'new'? 0 : 1
    this.FetchMovieList = this.FetchMovieList.bind(this)
  }

  componentDidMount () {
    this.FetchMovieList(this.props.category)
  }

  FetchMovieList(category){
    switch (category){
      case 'new':
        postFetch({
          path: 'movie/in_theaters',
          params: {
            city: this.state.city
          },
          callback: res => {
            console.log(res.subjects)
            this.setState({
              newMovieList: res.subjects,
              newLoadingStatus: 'success'
            })
          }
        })
      case 'coming':
        getFetch({
          path: 'movie/coming_soon',
          callback: res => {
            console.log(res.subjects)
            this.setState({
              comingMovieList: res.subjects,
              comingLoadingStatus: 'success'
            })
          }
        })
    }
  }

  render () {
    const {initialPage, newMovieList ,comingMovieList, newLoadingStatus, comingLoadingStatus} =  this.state
    return (
      <ScrollableTabView
        initialPage={initialPage}
        tabBarBackgroundColor ='#fff'
        tabBarUnderlineStyle={styles.line}
        tabBarInactiveTextColor='#666'
        tabBarActiveTextColor='#5CACEE'
        renderTabBar={() => <DefaultTabBar style={{height: 45}} tabStyle={{paddingBottom:0}} />}
      >
        <MovieListDetail tabLabel='院线热映' data={newMovieList} loadingStatus={newLoadingStatus}/>
        <MovieListDetail tabLabel='即将上映' data={comingMovieList} loadingStatus={comingLoadingStatus}/>
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
