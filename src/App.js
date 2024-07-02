import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { io } from "socket.io-client"

// Components
import Navigation from './components/Navigation'
import Servers from './components/Servers'
import Channels from './components/Channels'
import Messages from './components/Messages'

// ABIs
import Dappcord from './abis/Dappcord.json'

// Config
import config from './config.json';

// Socket
const socket = io('ws://localhost:3030');

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const [dappcord, setDappcord] = useState(null);

  const loadBlockchainData = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);


    const network = await provider.getNetwork();
    const dappcord = new ethers.Contract(config[network.chainId].Dappcord.address, Dappcord, provider);
    setDappcord(dappcord);

    const totalChannels = await dappcord.totalChannels();
    const channels = [];

    for (let i = 1; i <= totalChannels; i++) {
      const channel = await dappcord.getChannel(i);
      channels.push(channel);
    }

    window.ethereum.on('accountsChanged', async () => {
      window.location.reload();
    })
  }

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <main>
        <Servers />
        <Channels />
        <Messages />
      </main>
    </div>
  );
}

export default App;
