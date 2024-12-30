import { Header } from "../../Components/Header/Header";
import { Footer } from "../../Components/Footer/Footer";
import { LoginWindow } from "./Components/LoginWindow/LoginWindow";
import { RegisterWindow } from "./Components/RegisterWindow/RegisterWindow";
import "./style.css";

export const LogReg = () => {
  return (
    <>
      <Header />

      <main className="df jcc">
        <div className="main-content pt50 pb30">
          <div className="logReg-title">Аккаунт</div>

          <div className="df w100p jcsb mt40">
            <LoginWindow />

            <RegisterWindow />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};
