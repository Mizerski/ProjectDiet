//TODO:Resolver tipagem dos parametros de rotas
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { userTable } from "../../../mock/db/user";
import { emailRegex } from "../../Constants/Regex";
import { useNavigation } from "@react-navigation/native";

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
    const emailExist = userTable.find((user) => {
      return user.email === email.toLowerCase();
    });
    if (emailExist && emailExist.password === password) {
      console.debug(password);
      setWrongPassword(false);
      navigation.navigate("Redirect");
    }
    setWrongPassword(true);
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
