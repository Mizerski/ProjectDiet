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
import LoginButton from "../../Components/LoginButton";
import { emailRegex } from "../../Constants/Regex";
import { useNavigation } from "@react-navigation/native";


export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoginActive, setbtnLoginActive] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const testPassword = useRef<TextInput>(null)

  const navigation = useNavigation();
  const noShowKeyBoard = () => Keyboard.dismiss()
  const formatValid = () => {
    email.length && !emailRegex.test(email) ? setErrorInput(true) : setErrorInput(false)
    emailRegex.test(email) && password.length > 4 ? setbtnLoginActive(true) : setbtnLoginActive(false)
  }
  const moveFocusForNextInput = () => testPassword.current?.focus()
  const verifyUser = () => {
    if (btnLoginActive) {
      const emailExist = userTable.find((user) => {
        return user.email === email.toLowerCase();
      });
      if (!emailExist) {
        return setErrorMessage("Usuario não encotrado")
      }

      if (emailExist.password !== password) {
        console.debug(password);
        return setErrorMessage("Senha incorreta")
      }
      setErrorMessage("")
      navigation.navigate("Redirect");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={noShowKeyBoard} >
      <SafeAreaView style={styles.container}>
        <View>
          <Text>Digite seu emaill</Text>
          <LoginButton
            type="email"
            setText={setEmail}
            textValue={email}
            onSubmitEditing={moveFocusForNextInput}
            onBlur={formatValid}
            newStyle={[errorInput ? styles.errorInput : undefined]}
          />
          <Text>Digite sua senha</Text>
          <LoginButton
            type="password"
            setText={setPassword}
            onBlur={formatValid}
            textValue={password}
            ref={testPassword}
          />
        </View>
        {errorMessage !== "" && <Text>{errorMessage}</Text>}
        <TouchableOpacity
          style={[styles.button, btnLoginActive ? styles.activeButton : styles.inactiveButton]}
          onPress={verifyUser}
          disabled={!btnLoginActive}>
          <Text style={styles.buttonLoginText}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  activeButton: {
    backgroundColor: '#3498db',
  },
  inactiveButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 2,
  },
});