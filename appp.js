import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Touchable } from 'react-native';
import * as Google from 'expo-auth-session/providers/google'
import *  as WebBrowser from 'expo-web-browser'
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


// web client id: 379843320383-ev51pleuh3gmfde1mjkmvigd96vfkt3l.apps.googleusercontent.com
// ios: 379843320383-28rqiip4guvhk09ei6fjo5jub80j9ao2.apps.googleusercontent.com
// android: 379843320383-tpipjmu29504hka0j2g5qlkka59v8j5c.apps.googleusercontent.com
WebBrowser.maybeCompleteAuthSession();


export default function App() {

  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "379843320383-ev51pleuh3gmfde1mjkmvigd96vfkt3l.apps.googleusercontent.com",
    iosClientId: "379843320383-28rqiip4guvhk09ei6fjo5jub80j9ao2.apps.googleusercontent.com",
    androidClientId: "379843320383-tpipjmu29504hka0j2g5qlkka59v8j5c.apps.googleusercontent.com"
  });

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };
     
  

  React.useEffect(() => {
    if (response?.type = "succes") {
      setAccessToken(response.authentication.accessToken)
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken])

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
Authorization: `Bearer${accessToken}`
      }
    })
    const useInfo = await response.json();
    setUser(useInfo);
  }

  const ShowUserInfo = ( ) =>{
  if(user)

  return (
    <View style= {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom: 20}}>
            Welcome
        </Text>
        <Image source={{uri: user.picture}} style={{width: 100, height: 100, borderRadius: 50}} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
    </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

