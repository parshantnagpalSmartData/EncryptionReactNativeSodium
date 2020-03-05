

/**
 * React Native test Task using Recat-native-sodium
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Base64 from 'base64-js'
import Sodium from 'react-native-sodium'


export default class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        encrypted : "",
        decrypted: "",
        stringData: "Hello World",
        publickeyData: "/AllqhynaA/pvvdMhoILo2YNxQ1MnxtQlOKTR1jZV0I="
      }
    }
    componentDidMount(){
      this.encryptData()
    }
 /*
   Function that is used to covert string to Byte Array  
   */ 
    convertStringToByteArray=(str)=>{
        String.prototype.encodeHex = function () {
        var bytes = [];
        for (var i = 0; i < this.length; ++i) {
        bytes.push(this.charCodeAt(i));
        }
        return bytes;
        };
      
        var byteArray = str.encodeHex();
        return byteArray
    }

   /*
   Function that is used for Encypt and Dycrypt the data 
   */  
  encryptData = () => {

    let context = this, {stringData} = this.state,

     {publickeyData} = this.state,
     str = this.convertStringToByteArray(stringData),
     stringDataV = Base64.fromByteArray(str),
     nonce = Base64.fromByteArray(new Uint8Array([
      0x69, 0x69, 0x6e, 0xe9, 0x55, 0xb6, 0x2b, 0x73, 0xcd, 0x62, 0xbd, 0xa8,
      0x75, 0xfc, 0x73, 0xd6, 0x82, 0x19, 0xe0, 0x03, 0x6b, 0x7a, 0x0b, 0x37]));

    
   
    const handleError = (e) => {console.log(e)}
 

    Sodium.crypto_secretbox_easy(stringDataV, nonce, publickeyData)
     .then((c) => {
      console.log("Encrypted",c) 
      context.setState({encrypted: c})
      Sodium.crypto_secretbox_open_easy(c,nonce,publickeyData)
     .then((mm) => {
      context.setState({decrypted: mm})
       console.log("Decrypted",mm,stringDataV)
      //  this.setState({crypto_secretbox1:(m === mm)})
    } ,handleError)
  })
  }
  render() {
    let {encrypted,decrypted,stringData} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Text: {stringData}</Text>
        <Text style={styles.instructions}>Encrypted : {encrypted}</Text>
        <Text style={styles.instructions}>Decrypted : {decrypted}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

