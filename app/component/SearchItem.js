import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import BookItem from './BookItem'
import fetchItem from '../api/index'

export default class SearchItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      type: '',
      list: []
    }
    this.fetchBook = this.fetchBook.bind(this)
    const a = () => console.log('test')
    console.log(typeof a)
  }

  componentDidMount () {
    this.setState({
      type: this.props.type
    })
    this.checkType = this.checkType.bind(this)
  }

  fetchBook () {
    switch (this.props.type) {
      case 'read':
        return fetchItem({
          type: 'book',
          q: this.state.text,
          count:15,
          callback: (res) => {
            console.log(res)
            this.setState({
              list: res.books,
              q: ''
            })
          }
        })
      case 'music':
        return fetchItem({
          type: 'music',
          q: this.state.text,
          count:15,
          callback: (res) => {
            console.log(res)
            this.setState({
              list: res.musics,
              q: ''
            })
          }
        })
      case 'movie':
        return fetchItem({
          type: 'movie',
          q: this.state.text,
          count:15,
          callback: (res) => {
            console.log(res)
            this.setState({
              list: res.subjects,
              q: ''
            })
          }
        })
    }
  }

  listStructure () {
    switch (this.props.type) {
      case 'read':
        return  (
          ({item}) => (
            <ListItem data={item}/>
          )
        )
      case 'movie':
        return  (
          ({item}) => (
            <ListItem data={item}/>
          )
        )
    }
  }

  checkType () {
    switch (this.props.type) {
      case 'read': 
        return '搜索图书';
      case 'music': 
        return '搜索音乐';
      case 'movie': 
        return '搜索电影';
      default:
        return '搜索点啥吧'
    }
  }

  /*
  statusBar
  animated(true,存在动画效果)  hidden(true,隐藏任务栏)
  安卓---backgroundColor  translucent(true,透明,会沉浸)
  ios---barStyle(default,light-content,dark-content)
        showHideTransition(fade,slide,显示或隐藏的动画效果,这个与hidden属性结合使用)
  
  icon
  属性---size color name
  style---backgroundColor borderWidth borderStyle borderRadius
         padding margin fontSize color
  
  */
  render() {
    const {title} = this.props;
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.searchBar}>
            <TextInput 
              style={styles.searchInput}
              autoCapitalize={'none'}
              inlineImageLeft="ic_menu_black_24dp"
              placeholder={this.checkType()}
              placeholderTextColor={'#999'}
              selectionColor={'#5CACEE'}
              autoFocus={true}
              onChangeText={(text)=>this.setState({text:text})}
              onSubmitEditing={this.fetchBook}
            />
          </View>
          <View style={styles.cancel}>
            <Text onPress={() => Actions.pop()} style={styles.cancelText}>取消</Text>
          </View>
        </View>
        <FlatList
          style={styles.section}
          data={this.state.list}
          renderItem={this.listStructure}
        />
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width;
const inputWidth = windowWidth - 50 
const headerHeight = 64
const statusBarHeight = 20
const inputHeight = 40

const styles = StyleSheet.create({
  container: {
    height: headerHeight,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  searchBar:{
    position: 'relative',
  },
  searchInput: {
    width: inputWidth,
    height: inputHeight,
    backgroundColor: '#ddd',
    borderRadius: 6,
    paddingLeft: 30,
    fontSize:16,
    color: '#333'
  },
  searchIcon:{
    position: 'absolute',
    left: 0,
    top: 0,
    width: 30,
    height: headerHeight-statusBarHeight,
    justifyContent:'center',
    alignItems:'center'
  },
  cancel: {
    width: 50,
    height: headerHeight-statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelText: {
    fontSize: 16,
    color: '#999'
  }
});
