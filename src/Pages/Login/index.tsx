import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { emailRegex } from "@src/Constants/Regex";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const navigation = useNavigation();

  const handleEmailInput = (props: string) => {
    console.debug(props);

    if (!emailRegex.test(email)) {
      console.debug("Email inválido");
    }
    setEmail(props);
  };

  const verifyUser = () => {
    axios
      .post("http://10.0.2.2:5000/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          setWrongPassword(false);
          console.debug(response.data.message);
          navigation.navigate("Redirect");
        } else {
          setWrongPassword(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Data:", error.response.data);
          console.error("Status:", error.response.status);
          console.error("Headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request:", error.request);
        } else {
          console.error("Message:", error.message);
        }
        console.error("Config:", error.config);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Digite seu emaill</Text>
        <TextInput
          style={styles.emailInput}
          onChangeText={handleEmailInput}
          value={email}
        />
        <Text>Digite sua senha</Text>
        <TextInput
          style={styles.emailInput}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
      </View>
      {wrongPassword ? <Text>Senha incorreta</Text> : <></>}
      <TouchableOpacity style={styles.btnLogin} onPress={verifyUser}>
        <Text style={styles.buttonLoginText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emailInput: {
    marginTop: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: 300,
  },
  btnLogin: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f333",
    borderRadius: 5,
    alignItems: "center",
    width: 100,
  },
  buttonLoginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
