import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import {
  ConnectorEvent,
  requestRoninWalletConnector,
} from "@sky-mavis/tanto-connect";

export function SiwerRequest() {
  const [connector, setConnector] = useState<any>(null);
  const [signature, setSignature] = useState<string | undefined>();
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // Nuevo estado para almacenar la dirección de la wallet

  useEffect(() => {
    requestRoninWalletConnector().then((connector) => {
      setConnector(connector);
    });
  }, []);

  async function onClickSignIn() {
    if (!connector) {
      return;
    }

    const accounts = await connector.requestAccounts();

    if (!accounts || accounts.length === 0) {
      return;
    }

    const currentAccount = accounts[0];
    setWalletAddress(currentAccount); // Guardamos la dirección de la wallet

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    const siweMessage = new SiweMessage({
      domain: window.location.hostname,
      address: currentAccount,
      uri: window.location.origin,
      version: "1",
      chainId: 2020,
      nonce: "12345678",
      statement:
        "I accept the dApp's Terms of Service: https://example-dapp.com/terms-of-use",
      expirationTime: currentDate.toISOString(),
    });

    const provider = await connector.getProvider();
    const sig = await provider.request({
      method: "personal_sign",
      params: [siweMessage.toMessage(), currentAccount],
    });
    setSignature(sig);
  }

  if (signature) {
    return (
      <div>
        <div>🎉 Congratulations! You are signed in.</div>
        {walletAddress && <div>Wallet Address: {walletAddress}</div>} {/* Mostramos la dirección de la wallet */}
        <button onClick={() => setSignature(undefined)}>Reload</button>
      </div>
    );
  }

  return <button onClick={onClickSignIn}>Sign in with Ronin</button>;
}
