import { Stack, Tabs } from "expo-router";

const Layout = () => {
  // il faut retourner le type de navoigateur que vous voulez:
  // return <Tabs ></Tabs>
  // Ou
  // <Stack></Stack>
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

export default Layout;
