import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";

import logo from "../assets/logo-airbnb.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        },
      );

      setErrorMessage("");

      alert("Login successful");

      // accès au token (pour plus tard)
      // const token = response.data.token;
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>Sign in</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="email"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <View style={styles.footer}>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
            <Text style={styles.btnText}>Sign in</Text>
          </TouchableOpacity>
          <Link href="/signup">No account ? Register</Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  form: {
    width: "80%",
  },
  footer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    height: 44,
    borderColor: "gray",
    borderBottomWidth: 0.8,
    borderBottomColor: "red",
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  logo: {
    height: 90,
    width: 90,
    marginBottom: 10,
  },
  btn: {
    width: 160,
    height: 48,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EB5A62",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  btnText: {
    color: "#8F8F8F",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
});
