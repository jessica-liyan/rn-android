import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  View
} from 'react-native';
import BookItem from '../component/BookItem'
import {Actions} from 'react-native-router-flux';

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: '',
      bookList: []
    }
    this.fetchData()
    console.log(StatusBar.currentHeight)
  }

  fetchData () {
    var bookPromise = fetch('https://api.douban.com/v2/book/search', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: 'java',
        count: 15
      })
    }).then(res => res.json()).then(res => {
      this.setState({
        bookList: res.books
      })
    })
  }

  render() {
    return (
      <View>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder='搜啊搜'
            onChangeText={(text) => this.setState({text})}
            onFocus={()=>Actions.search()}
          />
          <TouchableOpacity style={styles.text}>
            <Image source={require('../image/search.png')} style={{width:20,height:20}}/>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.section}
          data={this.state.bookList}
          renderItem={({item}) => (
            <BookItem data={item}/>
          )}
        />
      </View>
    );
  }
}
const windowWidth = Dimensions.get('window').width;
const inputWidth = windowWidth - 50
const headerHeight = 64
const inputHeight = 30

const styles = StyleSheet.create({
  searchBar: {
    height: headerHeight,
    paddingHorizontal: 10,
    backgroundColor: '#5CACEE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: inputWidth,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingLeft: 10,
    fontSize:16,
    color: '#333'
  },
  text: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
