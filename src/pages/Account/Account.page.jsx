import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DepositForm from '../../components/DepositForm';
import TransferForm from '../../components/TransferForm';
import apiCaller from '../../utils/apiCaller';

const Account = () => {
  const [account, setAccount] = useState(null);

  const params = useParams();
  const getAccount = async () => {
    const result = await apiCaller.getAccout(params.id);
    const ownerName = await apiCaller.getUser(result.data.owner);
    setAccount(
      (prev) => (prev = { ...result.data, ownerName: ownerName.data.name })
    );
  };

  useEffect(() => {
    getAccount();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {account && (
        <Container>
          <Typography>Account ID : {account._id}</Typography>
          <Typography>Account Owner : {account.ownerName}</Typography>
          <Typography>Balance : {account.balance}</Typography>
          <DepositForm account={params.id} setAccount={setAccount} />
          <Typography>Credit : {account.credit}</Typography>
          <TransferForm setAccount={setAccount} id={params.id} />
          <Typography>Transactions:</Typography>
        </Container>
      )}
    </>
  );
};

export default Account;
