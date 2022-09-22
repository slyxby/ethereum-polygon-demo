import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NftTable from './components/NftTable';

function App() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);

  const btnHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert('Install metamask extension!');
    }
  };

  const getBalance = (address) => {
    window.ethereum
      .request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      })
      .then((balance) => {
        setBalance(ethers.utils.formatEther(balance));
      });
  };

  const accountChangeHandler = (account) => {
    setAddress(account);

    getBalance(account);
  };

  return (
    <div className="App">
      <Card className="text-center">
        {address !== '' && (
          <Card.Header>
            <strong>Address: </strong>
            {address}
          </Card.Header>
        )}

        {address !== '' && (
          <Card.Body>
            <Card.Text>
              <strong>Balance: </strong>
              {balance}
            </Card.Text>
          </Card.Body>
        )}

        {address !== '' && (
          <>
            <h2>Ethereum NFTs</h2>
            <NftTable chain="eth" address={address} />
            <h2>Polygon NFTs</h2>
            <NftTable chain="polygon" address={address} />
          </>
        )}

        {address === '' && (
          <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <Button onClick={btnHandler} variant="primary">
              Connect to wallet
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default App;
