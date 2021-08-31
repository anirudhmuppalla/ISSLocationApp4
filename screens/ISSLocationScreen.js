
import React,{Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, StatusBar, Platform, Alert,} from 'react-native';
import MapView, {Marker} from 'react-native-maps'
import axios from 'axios';
import { object } from 'prop-types';

export default class ISSLocationScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      location:{}

    }
  }
  componentDidMount(){
    this.getISSLoaction()
  }
  getISSLoaction=()=>{
    axios
    .get("https://api.wheretheiss.at/v1/satellites/25544")
    .then(Response=>{
      this.setState({location:response.data})
    })
    .catch(error=>{
      Alert.alert(error.message)
    })
  }
    render(){
      if(Object.keys(this.state.location).length===0){
        return(
          <View style={styles.container}>
            <Text>loading...</Text>
          </View>
        )
      }else{
    
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea}/>
      <ImageBackground source={require('../assets/iss_bg.jpg')} style={styles.backgroundImage}>
        <View style={styles.titleContainer}>
        <Text style={styles.titleText}>ISS Location Screen</Text>
        </View>
        <View style={styles.mapContainer}>
          <MapView styles={styles.map}
          region={{
            latitude:this.state.location.latitude,
            longitude:this.state.location.longitude,
            latitudeDelta:100,
            longitudeDelta:100
          }}>
              <Marker coordinate={{
                latitude:this.state.location.latitude,
                longitude:this.state.location.longitude
              }}>
                <Image source={require('../assets/iss_icon.png')}
                style={{height:50,width:50}}/>
              </Marker>
          </MapView>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Latitude:{this.state.location.latitude}</Text>
          <Text style={styles.infoText}>Longitude:{this.state.location.longitude}</Text>
          <Text style={styles.infoText}>Altitude:{this.state.location.altitude}</Text>
          <Text style={styles.infoText}>Velocity:{this.state.location.velocity}</Text>
        </View>
      </ImageBackground>
      
    </View>
  )
}}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  droidSafeArea:{
    marginTop:Platform.OS==="android"?StatusBar.currentHeight:0
  },
  backgroundImage:{
    flex:1,
    resizeMode:'cover'
  },
  titleContainer:{
    flex:0.15,
    justifyContent:'center',
    allignItems:'center'
  },
  titleText:{
    fontSize:30,
    fontWeight:'bold',
    color:'cyan',
  },
  mapContainer:{
    flex:0.7
  },
  map:{
    width:'100%',
    height:'100%'
},
infoContainer:{
  flex:0.2,
  backgroundColor:'white',
  marginTop:-10,
  borderTopLeftRadius:30,
  borderTopRightRadius:30,
  padding:30
},
infoText:{
  fontSize:15,
  color:'black',
  fontWeight:'bold'
}
});