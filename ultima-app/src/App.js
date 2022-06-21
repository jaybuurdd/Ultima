import React from "react";
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Contract from "./components/Contract"
import { Display } from "./components/Display";
import { WagmiConfig, createClient, defaultChains, configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { render, screen } from '@testing-library/react'


const alchemyId = process.env.ALCHEMY_ID

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId }),
  publicProvider(),
])

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),

  ],
  provider,
  webSocketProvider,
})



function App() {
  return (
    <WagmiConfig client={client}>
    <BrowserRouter>

    <Navbar />

      <Routes>
        {/* <Route path="/" element={<Navbar />}> */}
          <Route index element={<Home />} />
          <Route path="/myWallet" element={<><Create /><Display /></> } />
          <Route path="/transactions" element={<BlogDetails />} />
          <Route path="*" element={<NotFound />} />
        {/* </Route> */}
        
      </Routes>
      

      
    </BrowserRouter>
    </WagmiConfig>
  

  );
}


export default App;