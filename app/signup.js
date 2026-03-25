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

import logo from "../assets/logo-airbnb.png";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    if (
      !email.trim() ||
      !username.trim() ||
      !description.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setErrorMessage("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
          password: password,
        },
      );
      console.log(response.data);
      setErrorMessage("");
      alert("Sign up successful");

      // Plus tard :
      // const token = response.data.token;
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "Sign up failed");
      } else {
        setErrorMessage("An error occurred");
      }
    }
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>Sign up</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your self in a few words..."
            onChangeText={setDescription}
            value={description}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </View>

        <View style={styles.footer}>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
            <Text style={styles.btnText}>Sign up</Text>
          </TouchableOpacity>

          <Link href="/login">Already have an account ? Sign in</Link>
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
    paddingVertical: 20,
  },
  header: {
    alignItems: "center",
  },
  form: {
    width: "80%",
    gap: 20,
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
    borderBottomWidth: 0.8,
    borderBottomColor: "#EB5A62",
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  textArea: { borderWidth: 0.8, borderColor: "#EB5A62", height: 120 },
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
