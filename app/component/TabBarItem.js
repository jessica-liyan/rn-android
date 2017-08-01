import React,{Component} from 'react';  
import {Image, Text, StyleSheet} from 'react-native';  
 
export default class TabBarItem extends Component {  
 
    render() {  
        return(  
            this.props.focused ? <Image style={[styles.item]} source={this.props.selectedImage}></Image> : <Image style={[styles.item]} source={this.props.normalImage}></Image>
        )  
    }  
 
}
const styles = StyleSheet.create({
  item: {
    width:28,
    height:28
  }
});