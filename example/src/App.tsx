import { connect, signMessage } from "solib";
import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [address, setAddress] = useState<string | undefined>("");
  const [signature, setSignature] = useState<string | undefined>("");
  const [message, setMessage] = useState<string | undefined>("");
  const onClick = useCallback(() => {
    connect().then((connectResp) =>
      setAddress(connectResp?.publicKey.toString())
    );
  }, []);

  const onSign = useCallback((message: string | undefined) => {
    if (message) {
      signMessage(message).then((signature) => {
        setSignature(signature);
      });
    }
  }, []);

  return (
    <div className="App">
      <button onClick={onClick}>Connect</button>
      <address>{address}</address>
      {address && (
        <div>
          <input
            type="text"
            onChange={({ target }) => setMessage(target.value)}
          ></input>
          <button onClick={() => onSign(message)}>Sign Message</button>
          <address>{signature}</address>
        </div>
      )}
    </div>
  );
}

export default App;
