import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google'
import *  as WebBrowser from 'expo-web-browser'


// web client id: 379843320383-ev51pleuh3gmfde1mjkmvigd96vfkt3l.apps.googleusercontent.com
// ios: 379843320383-28rqiip4guvhk09ei6fjo5jub80j9ao2.apps.googleusercontent.com
// android: 379843320383-tpipjmu29504hka0j2g5qlkka59v8j5c.apps.googleusercontent.com
WebBrowser.maybeCompleteAuthSession();


export default function App() {

  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "379843320383-ev51pleuh3gmfde1mjkmvigd96vfkt3l.apps.googleusercontent.com",
    iosClientId: "379843320383-28rqiip4guvhk09ei6fjo5jub80j9ao2.apps.googleusercontent.com",
    androidClientId: "379843320383-tpipjmu29504hka0j2g5qlkka59v8j5c.apps.googleusercontent.com"
  });
React.useEffect(()=>{
  if(response?.type = "succes"){
    setAccessToken(response.authentication.accessToken)
  }
})

async function fetchUserInfo(){
  let response = fetch("https://www.googleapis.com/userinfo/v2/me")
}

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
