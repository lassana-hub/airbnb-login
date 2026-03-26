import { Stack } from "expo-router";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function RootNavigator() {
  const { userID, userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!userToken && !userID}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={userToken && userID}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>
    </Stack>
  );
}
