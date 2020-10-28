import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';

export default class BookTransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal',
        scannedStuId: '',
        scannedboId:''
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState}=this.state ;
      if (buttonState==="BookId"){
        this.setState({
          scanned: true,
          scannedboId: data,
          buttonState: 'normal' });
      }
      else if(buttonState==="StudentId"){
        this.setState({
          scanned: true,
          scannedStuId: data,
          buttonState: 'normal' });
      }
     
     
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
             <View>
             <Image source={require("./assets/booklogo.jpg") } style={{Width:200 , height:200}} />
             <Text style={{textAlign:'center' , fontSize:30}}>WILY</Text>
             </View>
             <View style={styles.inputView}>
                   <TextInput style={styles.inputBox} placeholder="bookId" value={this.state.scannedboId} />
                   <TouchableOpacity 
                   style={styles.scanButton}
                   onPress={()=>{this.getCameraPermissions("BookId")}}>
                     <Text style={styles.buttonText}>Scan</Text>
                   </TouchableOpacity>
              </View>
              <View style={styles.inputView}>
                   <TextInput style={styles.inputBox} placeholder="studentId" value={this.state.scannedStuId} />
                   <TouchableOpacity
                     style={styles.scanButton}
                     onPress={()=>{this.getCameraPermissions("StudentId")}}>
                     <Text style={styles.buttonText}>Scan</Text>
                   </TouchableOpacity>
              </View>
          
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });