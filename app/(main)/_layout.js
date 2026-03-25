import { Stack, Tabs } from "expo-router";

const Layout = () => {
  // il faut retourner le type de navoigateur que vous voulez:
  // return <Tabs ></Tabs>
  // Ou
  // <Stack></Stack>
  return <Tabs screenOptions={{ headerShown: false }}></Tabs>;
};

export default Layout;
