import React,{useEffect,useRef,useState} from "react";
import { Text,View,StyleSheet, SafeAreaView,Dimensions, TouchableOpacity, Image, FlatList, Animated} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from '@react-native-community/slider';
import Songs from "../model/data";

const {height,width}  = Dimensions.get('window');
const MusicPlayer = () => {
    const scrollx = useRef (new Animated.Value(0)).current;
     const [songIndex,setSongIndex] = useState(0);
     const songSlider = useRef(null);
    useEffect (() => {
        scrollx.addListener(({value}) =>{
            // console.log('scrollx' ,scrollx);
            // console.log('Device Width' ,width);
            const index = Math.round (value/width);
            setSongIndex(index);
            // console.log('Indx:' , index)
        });

        return () => {
            scrollx.removeAllListeners();
        }
    }, [] );
    const skipToNext = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1 )*width,
        });
    }
    const skipToPrevious = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex- 1 )*width
        });
    }
    const rendersongs = ({index,item}) => {
        return (
            <Animated.View style={{alignItems:"center",justifyContent:"center",width:width}}>
        <View style={styles.artWorkWrapper}>
               <Image 
                  style={styles.artworkimage}
                  source={item.image}
                />
        </View>
        </Animated.View>
        )
    }
    return (
        <SafeAreaView style={styles.container}> 
       <View style={styles.maincontainer}>
           <View style={{width:width}}>
           <Animated.FlatList
           ref={songSlider}
           data={Songs}
           renderItem={rendersongs}
           keyExtractor={(item) => item.id}
           horizontal
           pagingEnabled
           showsHorizontalScrollIndicator={false}
           scrollEventThrottle={16}
         onScroll={Animated.event(
[{nativeEvent: {contentOffset: {x:scrollx}}}],
{useNativeDriver: true}

         )}
        
           />
           </View>
           <View>
               <Text style={styles.title}>{Songs[songIndex].title} </Text>
               <Text style={styles.artist}> {Songs[songIndex].artist} </Text>
           </View>
          
          <View>
            <Slider style={styles.progresscontainer} value={10} maximumTrackTintColor="#FFF" minimumTrackTintColor="#FFD369" maximumValue={100} minimumValue={0} thumbTintColor="#FFD369" onSlidingComplete={()=>{}}/>  
          </View>

          <View style={{flexDirection:"row",justifyContent:"space-between",width:310}}>
              <Text style={{color:"#ffff"}}>0:00</Text>
              <Text style={{color:"#ffff"}}>3:59</Text>
          </View>
          <View style={{flexDirection:"row",width:"60%",justifyContent:"space-between",marginTop:30,marginBottom:40}}>
        <TouchableOpacity onPress={skipToPrevious}>
        <Ionicons style={{marginTop:12}} name="play-skip-back-outline" size={30} color="#FFD369"/> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{}}>
        <Ionicons name="ios-pause-circle" size={55} color="#FFD369"/> 
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext}>
        <Ionicons style={{marginTop:12}} name="play-skip-forward-outline" size={30} color="#FFD369"/> 
        </TouchableOpacity>
          </View>
          </View>

       <View style={styles.bottomContainer}>
           <View style={styles.bottomcontrol}>
               <TouchableOpacity>
           <Ionicons name="heart-outline" size={30} color="#777777"/>
           </TouchableOpacity>
           <TouchableOpacity>
           <Ionicons name="repeat" size={30} color="#777777"/>
           </TouchableOpacity>
           <TouchableOpacity>
           <Ionicons name="share-outline" size={30} color="#777777"/>
           </TouchableOpacity>
           <TouchableOpacity>
           <Ionicons name="ellipsis-horizontal" size={30} color="#777777"/>
           </TouchableOpacity>
           </View>
       
       </View>

      </SafeAreaView>
);

};

export default MusicPlayer;

const styles = StyleSheet.create({
    container:{
       backgroundColor:"#222831",
       flex:1,
       
    },
    maincontainer:{
      justifyContent:'center',
      alignItems:'center',
    flex:1
    },

    bottomContainer:{
        borderTopColor:"#393E46",
        borderTopWidth:1,
        width:width,
        alignItems:"center",
        padding:15
    },
    bottomcontrol:{
          flexDirection:"row",
          justifyContent:"space-between",
          width:"90%"
    },
    artWorkWrapper:{
      width:300,
      height:340,
      marginBottom:25,
      elevation:5,
   
    },
    artworkimage:{
        width:"100%",
        height:"100%",
        borderRadius:15
    },
    title:{
        fontSize:16,
        fontWeight:"600",
        color:"#eeee",
        textAlign:"center"
    },
    artist:{
        fontSize:16,
        fontWeight:"100",
        color:"#eeee",
        textAlign:"center"
    },
    progresscontainer:{
        width:350,
        height:40,
        flexDirection:"row",
        marginTop:25
    }
});           