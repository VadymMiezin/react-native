import "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Main from "./src/components/Main/Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./src/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./src/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
      <Toast topOffset={40} />
    </Provider>
  );
}
