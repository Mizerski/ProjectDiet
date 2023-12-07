//TODO:Resolver tipagem dos parametros de rotas
import { useRef, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { userTable } from "../../../mock/db/user";
// import { emailRegex } from "../../Constants/Regex";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginButton } from "../../Components/LoginButton";

type RootStackParamList = {
  Login: undefined;
  Redirect: undefined;
};

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
};

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const test = useRef(null)

  const noShowKeyBoard = () => Keyboard.dismiss()

  const verifyUser = () => {
    const emailExist = userTable.find((user) => {
      return user.email === email.toLowerCase();
    });
    if (emailExist && emailExist.password === password) {
      console.log(password);
      setWrongPassword(false);
      navigation.replace('Redirect');
    }
    setPassword("")
    setWrongPassword(true);
  };

  // const nextInputFocus = () => { }
  console.log(test);

  return (
    <TouchableWithoutFeedback onPress={noShowKeyBoard} >
      <SafeAreaView style={styles.container}>
        <View>
          <Text>Digite seu emaill</Text>
          <TextInput
            onChangeText={setEmail}
            value={email}
            autoComplete="email"
            autoFocus={true}
            style={[styles.emailInput]}
            ref={test}
          />
          <Text>Digite sua senha</Text>
          <LoginButton
            type="password"
            setText={setPassword}
            textValue={password} />
        </View>
        {wrongPassword ? <Text>Senha incorreta</Text> : <></>}
        <TouchableOpacity style={styles.btnLogin} onPress={verifyUser}>
          <Text style={styles.buttonLoginText}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  emailInput: {
    marginTop: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: 300,
  },
});
