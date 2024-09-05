import "./App.css";
import { useEffect, useState } from "react";
import { requestFCMtoken, onMessageListener } from "./utils/firebaseUtils";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [fcmtoken, setfcmtoken] = useState(null);

  useEffect(() => {
    const getfcmtoken = async () => {
      try {
        const token = await requestFCMtoken();
        setfcmtoken(token);
        console.log("The token is:", token); // Changed fcmtoken to token
      } catch (error) {
        console.log("An error occurred while retrieving token.", error);
      }
    };

    getfcmtoken();
  }, []); // Added dependency array
  console.log("The token is:", fcmtoken);
  onMessageListener().then((payload) => {
    toast(
      <div>
        <strong style={{ display: 'block', marginBottom: '4px' }}>
          {payload.notification.title}
        </strong>
        <span>{payload.notification.body}</span>
      </div>,
      { position: "top-center" }
    );
  });
  
  return <>
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        <p>
        Hello World! this is your notification
        </p>
      </header>
    </div>
  </>;
}

export default App;
