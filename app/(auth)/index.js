import { useRouter } from "expo-router";
import { Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

import Logo from "../../components/Logo";
import Title from "../../components/Title";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import RedirectButton from "../../components/RedirectButton";

import { useEffect, useState } from "react";
import axios from "axios";

// Utilisation de context
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  // Destruction de Context
  const { userID, userToken, isLoading, login } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoading && userToken && userID) {
      router.replace("/(main)/home/rooms");
    }
  }, [isLoading, router, userID, userToken]);

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
      // Stockage du token et id
      const userToken = response.data.token;
      const userID = response.data.id;
      await login(userToken, userID);
      // alert("Login successful");
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Logo />
      <Title text={"Sign In"} />
      <Input placeholder="lassana@mail.com" state={email} setState={setEmail} />
      <Input
        placeholder="mot de passe"
        state={password}
        setState={setPassword}
        secure={true}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <MainButton text="Sign In" func={handleSignIn} />
      <RedirectButton
        text={"No account ? Sign Up here"}
        func={() => {
          router.navigate("/signup");
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
});
