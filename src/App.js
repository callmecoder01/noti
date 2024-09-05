import { useEffect, useState } from "react";
import { requestFCMtoken, onMessageListener } from "./utils/firebaseUtils";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios"; // Import axios for making HTTP requests
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./App.css"; // Ensure this file does not override Tailwind styles

function App() {
  const [fcmtoken, setfcmtoken] = useState(null);

  useEffect(() => {
    const getfcmtoken = async () => {
      try {
        const token = await requestFCMtoken();
        setfcmtoken(token);
        console.log("The token is:", token);
      } catch (error) {
        console.log("An error occurred while retrieving token.", error);
      }
    };

    getfcmtoken();
  }, []);

  const sendTokenToBackend = async () => {
    if (fcmtoken) {
      try {
        await axios.post('https://noti-f847d-default-rtdb.firebaseio.com/tokens.json', { token: fcmtoken });
        toast.success("Token sent to the backend successfully!");
      } catch (error) {
        console.error("Error sending token to the backend:", error);
        toast.error("Failed to send token to the backend.");
      }
    } else {
      toast.warn("No token available to send.");
    }
  };

  useEffect(() => {
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
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <ToastContainer />
      <header className="text-center">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to Our Service!</h1>
        <p className="text-lg mb-8">
          We're glad you're here. Click the button below to send your FCM token to our backend.
        </p>
        <button
          onClick={sendTokenToBackend}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Send Token
        </button>
      </header>
    </div>
  );
}

export default App;
