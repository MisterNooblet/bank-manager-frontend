import { Typography } from '@mui/material';
import Table from '../../components/Table';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DepositForm from '../../components/DepositForm';
import TransferForm from '../../components/TransferForm';
import apiCaller from '../../utils/apiCaller';

const Account = () => {
  const [account, setAccount] = useState(null);

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const params = useParams();
  const getAccount = async () => {
    const result = await apiCaller.getAccout(params.id);
    const ownerName = await apiCaller.getUser(result.data.owner);
    setAccount(
      (prev) => (prev = { ...result.data, ownerName: ownerName.data.name })
    );
  };
  const getData = async () => {
    const result = await apiCaller.getAccountTransactions(params.id);
    setData((prev) => (prev = result.data));
  };

  useEffect(() => {
    if (data.length > 0) {
      setColumns((prev) => (prev = Object.keys(data[0])));
      let rowMap = data
        .map((obj) => Object.values(obj))
        .map((array) => {
          let modifiedArray = [];
          array.forEach((item) => {
            if (typeof item !== 'object') {
              modifiedArray.push(item);
            } else if (item === null) {
              modifiedArray.push(item);
            } else {
              modifiedArray.push(item.length);
            }
          });

          return modifiedArray;
        });
      setRows((prev) => (prev = rowMap));
    }
  }, [data]);

  useEffect(() => {
    getData();
    getAccount();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {account && (
        <>
          <Container>
            <Typography>Account ID : {account._id}</Typography>
            <Typography>Account Owner : {account.ownerName}</Typography>
            <Typography>Balance : {account.balance}</Typography>
            <DepositForm account={params.id} setAccount={setAccount} />
            <Typography>Credit : {account.credit}</Typography>
            <TransferForm setAccount={setAccount} id={params.id} />
            <Typography>Transactions:</Typography>
          </Container>
          <Table headers={columns} data={rows} parent={'transactions'} />
        </>
      )}
    </>
  );
};

export default Account;
