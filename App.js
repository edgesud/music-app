import React from "react";
import { Text,View,Stylesheet,Button,StatusBar } from "react-native";

import MusicPlayer from "./screen/MusicPlayer";

const App = () =>{
  return (
    <View style={{flex:1}}>
      <StatusBar barStyle="light-content"/>
      <MusicPlayer/>
    </View>
  )
}
export default App;
