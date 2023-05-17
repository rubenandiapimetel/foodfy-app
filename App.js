import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import *  as WebBrowser from 'expo-web-browser';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


// web client id: 379843320383-ev51pleuh3gmfde1mjkmvigd96vfkt3l.apps.googleusercontent.com
// ios: 379843320383-28rqiip4guvhk09ei6fjo5jub80j9ao2.apps.googleusercontent.com
// android: 379843320383-tpipjmu29504hka0j2g5qlkka59v8j5c.apps.googleusercontent.com
WebBrowser.maybeCompleteAuthSession();


export default function App() {
  
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "379843320383-ev51pleuh3gmfde1mjkmvigd96vfkt3l.apps.googleusercontent.com",
    iosClientId: "379843320383-28rqiip4guvhk09ei6fjo5jub80j9ao2.apps.googleusercontent.com",
    androidClientId: "379843320383-tpipjmu29504hka0j2g5qlkka59v8j5c.apps.googleusercontent.com"
  });
  
  React.useEffect(() => {
    handleSignWhitGoogle();
  }, [response])
  
  async function handleSignWhitGoogle() {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        getUserInfo(response.authentication.accessToken)
      }
    } else {
      setUser(user);
    }
  }
  
  
  
  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };
  
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const respose = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer${token}` }
        });
        const user = await response.json();
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUser(user);
      } catch (e) { console.log(e) };
    }
    
    
    return (
      <View style={styles.container}>
      {!user ? (
        <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
        />
        ) : (
          <View style={styles.card} >
          {user?.picture && (
            <Image source={{ uri: user?.picture }} style={styles.image} />
            )}
            <Text style={styles.text}>Email: {user.email}</Text>
            <Text style={styles.text}>
            Verified: {user.verified_email ? "yes" : "no"}
            </Text>
              <Text style={styles.text}>Name: {user.name}</Text>
            </View>
            )
          }
          <Button
          title=" remove local store"
          onPress={async () => await AsyncStorage.removeItem("@user")}
          />
          </View >
          );
}
        
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }
});