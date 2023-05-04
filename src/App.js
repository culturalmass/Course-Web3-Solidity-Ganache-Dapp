import { Provider } from "react-redux";
import { store } from "./store";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main";
import ParticlesBG from "./components/particlesBG";
import styles from "./components/styles";

export default function Home() {
  return (
    <Provider store={store}>
      <div className={styles.pageWrapper}>
        <Navbar />
        <Main />
        <Footer />
      </div>
      <div className="">
        <ParticlesBG />
      </div>
    </Provider>
  );
}
