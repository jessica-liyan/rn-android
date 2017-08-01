import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from 'react-native';
import {postFetch, getFetch} from '../api/index'
import {Actions} from 'react-native-router-flux';
import LoadingManage from '../component/LoadingManage'

export default class MoviePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      type: 'movie',
      city: '武汉',
      newMovie: [], // 院线热映
      comingMovie: [], // 即将上映
      topMovie:[], // top250
      usMovie:[], //北美票房榜
      loadingNew: 'loading',
      loadingComing: 'loading',
      loadingTop:'loading',
      loadingUs:'loading'
    }
    this.FetchNewMovie = this.FetchNewMovie.bind(this)
    this.FetchNewMovie()
    this.getTopMovie = this.getTopMovie.bind(this)
    this.getUsMovie = this.getUsMovie.bind(this)
  }

  FetchNewMovie () {
    postFetch({
      path: 'movie/in_theaters',
      params: {
        city: this.state.city,
        count: 5
      },
      callback: res => {
        console.log(res.subjects)
        this.setState({
          newMovie: res.subjects,
          loadingNew:'success'
        })
      }
    })
    postFetch({
      path: 'movie/coming_soon',
      params: {
        count: 5
      },
      callback: res => {
        this.setState({
          comingMovie: res.subjects,
          loadingComing:'success'
        })
      }
    })
    postFetch({
      path: 'movie/top250',
      params: {
        count: 3
      },
      callback: res => {
        this.setState({
          topMovie: res.subjects,
          loadingTop:'success'
        })
      }
    })
    getFetch({
      path: 'movie/us_box',
      callback: res => {
        console.log(res.subjects)
        this.setState({
          usMovie: res.subjects.filter((item) => item.rank == 1|| item.rank == 2||item.rank == 3),
          loadingUs:'success'
        })
        console.log(this.state.usMovie)
      }
    })
  }

  getTopMovie () {
    const {topMovie,loadingTop} = this.state;
    console.log(loadingTop)
    if(loadingTop == 'success'){
      return (
        <View style={styles.centerContainer}>
          <Image source={{uri: topMovie[1].images.small}} style={styles.minImg} resizeMode="contain"/>
          <Image source={{uri: topMovie[0].images.small}} style={styles.maxImg} resizeMode="contain"/>
          <Image source={{uri: topMovie[2].images.small}} style={styles.minImg} resizeMode="contain"/>
        </View>
      )
    }else{
      return <Text>失败</Text>
    }
  }

  getUsMovie () {
    const {usMovie,loadingUs} = this.state;
    console.log(usMovie[0])
    if(loadingUs == 'success'){
      return (
        <View style={styles.centerContainer}>
          <Image source={{uri: usMovie[1].subject.images.small}} style={styles.minImg} resizeMode="contain"/>
          <Image source={{uri: usMovie[0].subject.images.small}} style={styles.maxImg} resizeMode="contain"/>
          <Image source={{uri: usMovie[2].subject.images.small}} style={styles.minImg} resizeMode="contain"/>
        </View>
      )
    }else{
      return <Text>失败</Text>
    }
  }

  render() {
    const {newMovie,comingMovie,loadingNew,loadingComing} = this.state
    return (
      <ScrollView style={styles.main}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>院线热映</Text>
          <TouchableOpacity  style={styles.more} onPress={() => Actions.MovieListTab({category:'new'})}>
            <Text style={styles.moreTxt}>更多></Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
          {
            newMovie.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => Actions.MovieDetail({id:item.id})}>
                  <Image source={{uri: item.images.large}} style={{width:120,height:160}} resizeMode="contain"/>
                  <Text style={styles.nameTxt} numberOfLines={1}>{item.title}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
        <View style={styles.titleBar}>
          <Text style={styles.title}>即将上映</Text>
          <TouchableOpacity style={styles.more} onPress={() => Actions.MovieListTab({category:'coming'})}>
            <Text style={styles.moreTxt}>更多></Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
          {
            comingMovie.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => Actions.MovieDetail({id:item.id})}>
                  <Image source={{uri: item.images.large}} style={{width:120,height:160}} resizeMode="contain"/>
                  <Text style={styles.nameTxt} numberOfLines={1}>{item.title}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
        <View style={styles.titleBar}>
          <Text style={styles.title}>精选榜单</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.selectedBox} onPress={() => Actions.MovieTopTab()}>
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedTitle}>Top250</Text>
              {this.getTopMovie()}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectedBox} onPress={() => Actions.MovieTopBook()}>
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedTitle}>北美票房榜</Text>
              {this.getUsMovie()}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10
  },
  container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  centerContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  titleBar:{
    marginTop: 10,
    backgroundColor: '#fff',
    position: 'relative'
  },
  title:{
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  more:{
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  moreTxt:{
    fontSize: 14,
    color: '#5CACEE',
  },
  nameTxt:{
    fontSize: 14,
    color: '#333',
    padding: 5,
    width: 110
  },
  selectedBox:{
    flex:1,
    margin:5,
    elevation:45,
    shadowOffset:{  
      width: 0,  
      height: 2,  
    },  
    shadowColor: '#ccc',  
    shadowOpacity: 0.5, 
  },
  selectedInfo:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius: 6,
    paddingVertical:15,
  },
  selectedTitle:{
    fontSize: 14,
    color:'#666',
    paddingBottom: 15,
  },
  minImg:{
    width: 40,
    height: 50
  },
  maxImg:{
    width: 50,
    height: 70
  },
  row:{
    flex:1
  },
  title:{
    fontSize: 16,
    color: '#333',
    padding: 10
  },
  txt: {
    fontSize: 12,
    color: '#333',
    paddingTop: 10,
    paddingLeft:10
  }
});
