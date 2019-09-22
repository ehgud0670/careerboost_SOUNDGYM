/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import TrackPlayer from 'react-native-track-player';
import {StyleSheet, View, Image,Text} from 'react-native';
import { Router } from 'react-native-router-flux';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./react/resources/coogie.png')}style={styles.elbum}/>
        <Text style={styles.title}>Blessed</Text>
        <Text style={styles.singer}>coogie</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#808080',
    alignItems:'center',
    top:0
  },
  title :{
    fontSize:30,
    fontWeight: 'bold',
    marginTop:20
  },
  elbum:{
    width:415, 
    height:415
  },
  singer :{
    fontSize:20,
  }
});