import AuthContextProvider from "../context/AuthContext";
import RootNavigator from "..//navigation/RootNavigator";

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
};

export default RootLayout;
