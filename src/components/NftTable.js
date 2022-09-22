import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import PropTypes from 'prop-types';

function NftTable({ chain, address }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let ignore = false;

    (async () => {
      const nftData = await axios
        .request({
          method: 'GET',
          url: `https://deep-index.moralis.io/api/v2/${address}/nft`,
          params: { chain: chain, format: 'decimal' },
          headers: {
            'accept': 'application/json',
            'X-API-Key': 'ecBU5fxvkfjukFKtkh6rWytc9CjmPpLjczuHpQC3id0mehhfP59XqHUhUBIUmZrM',
          },
        })
        .then((response) => {
          let result = [];

          for (const element of response.data.result) {
            result.push({
              id: element.token_address,
              contract: element.contract_type,
              uri: element.token_uri,
            });
          }

          return result;
        })
        .catch((error) => {
          console.error(error);
        });

      if (!ignore) {
        setData(nftData);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [address, chain]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Contract</th>
          <th>Token URI</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id + index}>
            <td>{item.id}</td>
            <td>{item.contract}</td>
            <td>{item.uri}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

NftTable.propTypes = {
  chain: PropTypes.string,
  address: PropTypes.string,
};

export default NftTable;
