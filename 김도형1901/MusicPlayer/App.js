/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import TrackPlayer from 'react-native-track-player';
import React, {Fragment} from 'react';
import { StyleSheet, View,Text, Image } from 'react-native';
import { Router } from 'react-native-router-flux';
export default class App extends React.Component {
  render(){
    return (
      <View>
        <Text>
          Hello
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems : 'center',
    justifyContent : 'center' 
  }
});

// export default App;
