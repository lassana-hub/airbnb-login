import { AuthContextProvider } from "../context/AuthContext";
import RootNavigator from "../navigation/RootNavigation";

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
};

export default RootLayout;
