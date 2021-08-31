import React,{Component} from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
export default class MeteorScreen extends Component{
  constructor(props){
    super(props);
    this.state={meteors:{}}
  }
  getMeteors=()=>{
    axios
    .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=qRAUWzD1TSGljwH9QH9Ee8VydrohJ0gtm6xbmUYg")
    .then(response=>{
      this.setState({meteors:response.data.near_earth_objects})
    })
    .catch(error=>{
      Alert.alert(error.message)
    })
  }
  componentDidMount(){
    this.getMeteors
  }
    render(){
      if(Object.keys(this.state.meteors).length===0){
        return(
          <View style={styles.container}>
            <Text>loading...</Text>
          </View>
        )
      }else{
    let meteor_arr=Object.keys(this.state.meteors).map(meteor_date=>{
      return this.state.meteors[meteor_date]
    })
    let meteors=[].concat.apply([],meteor_arr);
    meteors.forEach(function(element) {
      let diameter=(element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
      let threatScore=(diameter/element.close_aproach_data[0].miss_distance.kilometers)*1000000000
      element.threat_score=threatScore
    });
  return (
    <View style={styles.container}>
      <Text>Meteor Screen</Text>
    </View>
  );
}}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});