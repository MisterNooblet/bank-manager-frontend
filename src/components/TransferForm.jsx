import React, { useState } from 'react';
import apiCaller from '../utils/apiCaller';

function TransferForm({ id, setAccount }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let result = apiCaller.transfer(amount, recipient, id);
    setAccount((prev) => (prev = { ...prev, ...result.data }));
    setAmount((prev) => (prev = 0));
    // Perform your transfer logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Recipient:
        <input
          type="text"
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          min={0}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>
      <button type="submit">Transfer</button>
    </form>
  );
}

export default TransferForm;
