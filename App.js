import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import BookTransactionsScreen from './screens/BookTransactionScreen';
import SearchScreen from './screens/SearchScreen';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';


export default class App extends React.Component {
  render(){
    return ( 
      <AppContainer/>
    
  )
}}

const TabNavigator = createBottomTabNavigator({
  BookTransactionsScreen: {screen:BookTransactionsScreen },
  SearchScreen:{screen:SearchScreen}
},
{
  defaultNavigationOptions:({navigation})=>({
     tabBarIcon:({})=>{
       const routeName = navigation.state.routeName
       if (routeName==="BookTransactionsScreen"){
         return(
          <Image source={require("./assets/book.png") } style={{Width:40 , height:40}} />
         )
         
       }
       else if(routeName==="SearchScreen"){
        return(
          <Image source={require("./assets/searchingbook.png") } style={{Width:40 , height:40}} />
         )
       }
     }
     
  })

})
const AppContainer = createAppContainer(TabNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
