import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

export default class ListItem extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    const {data} = this.props;
    return (
      <View style={styles.item} key={data.id}>
        <View style={styles.itemImg}>
          <Image source={{uri: data.image}} style={{width: 120, height: 80}}/>
        </View>
        <View style={styles.itemTxt}>
          <Text style={styles.itemTit}>{data.title}</Text>
          <Text style={styles.itemSubTit}>{data.title}/{data.author}/{data.price}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ededed',
    borderStyle: 'solid'
  },
  itemImg: {
    padding: 10
  },
  itemTxt: {
    padding: 10
  },
  itemTit: {
    fontSize: 14,
    color: '#333',
    paddingBottom: 5
  },
  itemSubTit: {
    fontSize: 12,
    color: '#999'
  }
});
