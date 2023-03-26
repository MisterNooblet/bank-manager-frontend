import { Button } from '@mui/material';
import React, { useState } from 'react';
import apiCaller from '../utils/apiCaller';

function DepositForm({ account, setAccount }) {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let result;
    if (amount > 0) {
      switch (type) {
        case 'deposit':
          result = await apiCaller.deposit(amount * 1, account);
          break;
        case 'withdraw':
          result = await apiCaller.deposit(amount * -1, account);
          break;
        default:
          break;
      }
    }
    setAccount((prev) => (prev = { ...prev, ...result.data }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          min={0}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>
      <Button
        type="submit"
        onClick={() => setType((prev) => (prev = 'deposit'))}
      >
        Deposit
      </Button>
      <Button
        type="submit"
        onClick={() => setType((prev) => (prev = 'withdraw'))}
      >
        Withdraw
      </Button>
    </form>
  );
}

export default DepositForm;
