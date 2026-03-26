import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";
import axios from "axios";

import Logo from "../../components/Logo";
import Title from "../../components/Title";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";

import RedirectButton from "../../components/RedirectButton";
import { LargeInput } from "../../components/LargeInput";

import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

// Utilisation de context
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  // Destruction de Context
  const { userID, userToken, isLoading, login } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoading && userToken && userID) {
      router.replace("/(main)/home/rooms");
    }
  }, [isLoading, router, userID, userToken]);

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
      // console.log(response.data);
      setErrorMessage("");
      alert("Sign up successful");
      //  set token
      await login(response.data.token, response.data.id);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "Sign up failed");
      } else {
        setErrorMessage("An error occurred");
        // console.log(error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Logo />
      <Title text={"Sign Up"} />
      <Input
        state={email}
        setState={setEmail}
        placeholder={"lassana@gmail.com"}
      />
      <Input state={username} setState={setUsername} placeholder={"lassana"} />
      <LargeInput
        state={description}
        setState={setDescription}
        placeholder={"Rentrez ici votre description"}
      />
      <Input
        state={password}
        setState={setPassword}
        placeholder={"mot de passe"}
        secure={true}
      />
      <Input
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder={"confirmez votre mot de passe"}
        secure={true}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <MainButton text={"Sign Up"} func={handleSignUp} />
      <RedirectButton
        text={"Already have an account ? Sign in here !"}
        func={() => {
          router.back();
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default Signup;

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
