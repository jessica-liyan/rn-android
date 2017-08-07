import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  Platform
} from 'react-native';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
} from 'react-native-router-flux';
import Home from './page/Home'
import ReadPage from './page/ReadPage'
import MoviePage from './page/MoviePage'
import MusicPage from './page/MusicPage'
import MyPage from './page/MyPage'
import Login from './component/Login'
import Register from './component/Register'
import Setting from './component/Setting'
import MyData from './component/MyData'
import MovieDetail from './component/MovieDetail'
import MovieListTab from './component/MovieListTab'
import MovieTopTab from './component/MovieTopTab'
import MovieTopBook from './component/MovieTopBook'
import SearchItem from './component/SearchItem'
import TabBarItem from './component/TabBarItem'

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
        <StatusBar
         animated={true}
         backgroundColor='rgba(0,0,0,0)'
         barStyle="default"
         barStyle="light-content"
         translucent={Platform.Version <= 21 ? false :true}
        />
        <Router>
          <Scene key="root">
            <Scene key="tab" 
              title="tab" 
              tabs 
              hideNavBar 
              showIcon
              showLabel={true}
              titleStyle={styles.titleStyle}
              tabBarStyle={[styles.tabBarStyle]} 
              tabBarPosition="bottom" 
              activeTintColor="#5CACEE"
              inactiveTintColor="#999"
              >
              <Scene 
                key="Home" 
                component={Home} 
                title="首页" 
                tabBarLabel="首页" 
                tabBarIcon={({focused}) => {
                  return (
                    <TabBarItem 
                      focused={focused}
                      selectedImage={require('./image/home_active.png')}
                      normalImage={require('./image/home.png')}
                    />
                  )
                }}
                hideNavBar
              />
              <Scene 
                key="ReadPage" 
                component={ReadPage} 
                title="阅读" 
                tabBarLabel="阅读" 
                tabBarIcon={({focused}) => {
                  return (
                    <TabBarItem 
                      focused={focused}
                      selectedImage={require('./image/read_active.png')}
                      normalImage={require('./image/read.png')}
                    />
                  )
                }}
                navigationBarStyle={[styles.navigationBarStyle,{paddingLeft:30}]}
                onRight={() => Actions.search({type: 'read'})} 
                rightButtonImage={require('./image/search.png')}  
                rightButtonIconStyle={styles.rightButton}
              >
              </Scene>
              <Scene 
                key="MoviePage" 
                component={MoviePage} 
                title="电影" 
                tabBarLabel="电影" 
                tabBarIcon={({focused}) => {
                  return (
                    <TabBarItem 
                      focused={focused}
                      selectedImage={require('./image/movie_active.png')}
                      normalImage={require('./image/movie.png')}
                    />
                  )
                }}
                navigationBarStyle={[styles.navigationBarStyle,{paddingLeft:30}]}
                onRight={() => Actions.search({type: 'movie'})} 
                rightButtonImage={require('./image/search.png')}  
                rightButtonIconStyle={styles.rightButton} 
              />
              <Scene 
                key="MusicPage" 
                component={MusicPage} 
                title="音乐" 
                tabBarLabel="音乐" 
                tabBarIcon={({focused}) => {
                  return (
                    <TabBarItem 
                      focused={focused}
                      selectedImage={require('./image/music_active.png')}
                      normalImage={require('./image/music.png')}
                    />
                  )
                }}
                navigationBarStyle={[styles.navigationBarStyle,{paddingLeft:30}]}
                onRight={() => Actions.search({type: 'music'})} 
                rightButtonImage={require('./image/search.png')}  
                rightButtonIconStyle={styles.rightButton} 
              />
              <Scene 
                key="MyPage" 
                component={MyPage} 
                title="我的" 
                tabBarLabel="我的" 
                tabBarIcon={({focused}) => {
                  return (
                    <TabBarItem 
                      focused={focused}
                      selectedImage={require('./image/music_active.png')}
                      normalImage={require('./image/music.png')}
                    />
                  )
                }}
                navigationBarStyle={[styles.navigationBarStyle,{paddingLeft:30}]}
                onRight={() => Actions.Setting()} 
                rightButtonImage={require('./image/setting.png')}  
                rightButtonIconStyle={styles.rightButton} 
              />
            </Scene>
            <Scene key="search" component={SearchItem} title="search" hideNavBar>
            </Scene>
            <Scene 
              key="MovieDetail" 
              title="电影"
              component={MovieDetail}
              backButtonImage={require('./image/back.png')} 
              navigationBarStyle={{backgroundColor: '#333'}} 
              titleStyle={{color:'#fff',alignSelf:'center'}} 
              onRight={() => Actions.search({type: 'music'})} 
              rightButtonImage={require('./image/share.png')}  
              rightButtonIconStyle={styles.rightButton} 
            >
            </Scene>
            <Scene 
              key="MovieListTab" 
              title="电影"
              backButtonImage={require('./image/back.png')} 
              navigationBarStyle={{backgroundColor: '#333'}} 
              titleStyle={{color:'#fff'}} 
              component={MovieListTab}>
            </Scene>
            <Scene 
              key="MovieTopTab" 
              title="电影"
              backButtonImage={require('./image/back.png')} 
              navigationBarStyle={{backgroundColor: '#333'}} 
              titleStyle={{color:'#fff'}} 
              component={MovieTopTab}>
            </Scene>
            <Scene 
              key="MovieTopBook" 
              title="北美票房榜"
              backButtonImage={require('./image/back.png')} 
              navigationBarStyle={{backgroundColor: '#333'}} 
              titleStyle={{color:'#fff'}} 
              component={MovieTopBook}>
            </Scene>
            <Scene 
              key="Login" 
              title=""
              backButtonImage={require('./image/back1.png')} 
              component={Login}>
            </Scene>
            <Scene 
              key="Register" 
              title=""
              backButtonImage={require('./image/back1.png')} 
              component={Register}>
            </Scene>
            <Scene 
              key="Setting" 
              title="设置"
              navigationBarStyle={[styles.navigationBarStyle,{paddingRight:30}]}
              titleStyle={styles.titleStyle}
              backButtonImage={require('./image/back.png')} 
              component={Setting}>
            </Scene> 
            <Scene 
              key="MyData" 
              title="我的资料"
              navigationBarStyle={[styles.navigationBarStyle,{paddingRight:30}]}
              titleStyle={styles.titleStyle}
              backButtonImage={require('./image/back.png')} 
              component={MyData}>
            </Scene> 
          </Scene>
        </Router>
      </View>
    )
  }
};

   /* 
      同层级的Scene试图是互相覆盖的关系
      左侧按钮是back onBack  backTitle  backButtonImage  backButtonTextStyle
      右侧按钮       onRight  rightTitle  返回没有文字？

       leftButton leftButtonImage  onLeft  leftButtonIconStyle   
       leftTitle  leftButtonTextStyle  leftButtonTintColor
      titleStyle  navigationBarStyle

      navigationBarTitleImage  navigationBarTitleImageStyle
      navigationBarStyle(高度，背景色)

      tabs  hideNavBar(顶部导航)  hideTabBar(标签页)
      tabBarLabel  tabBarIcon  tabBarStyle

      问题：navi的背景色如果是rgba的话，跟header同样的rgba有色差
      navigation的左右按钮是怎么布局的
      tabBar的图片导不进去
   */ 

const height = StatusBar.currentHeight;
const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#FBFBFB',
    borderTopWidth:.5,
    borderColor:'#ddd',
    height: 60,
  },
  navigationBarStyle:{
    backgroundColor: '#5CACEE',
    paddingTop: Platform.Version <= 21 ? 0 : height,
    height: 50,
  },
  titleStyle:{
    color:'#fff',
    fontSize:16,
    alignSelf:'center',
    fontWeight: 'normal'
  },
  rightButton:{
    width:20,
    height:20,
    justifyContent:'center',
    alignSelf:'center',
    marginLeft:10
  }
});