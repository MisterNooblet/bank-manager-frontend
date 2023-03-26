import React, { useState } from 'react';
import apiCaller from '../utils/apiCaller';

function FilterForm({
  maxString,
  minString,
  target,
  setResults,
  setNoResults,
}) {
  const [maxrange, setMaxrange] = useState('');
  const [minrange, setMinrange] = useState('');
  const [boolean, setBoolean] = useState('');

  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypeChange(event) {
    setTransactionType(event.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    let response;
    let query = '?';

    if (maxrange.length > 0) {
      query += `${maxString}=${maxrange}&`;
    }

    if (minrange.length > 0) {
      query += `${minString}=${minrange}&`;
    }
    if (transactionType.length > 0) {
      query += `type=${transactionType}&`;
    }
    if (typeof boolean !== 'string') {
      query += `isActive=${boolean}&`;
    }

    switch (target) {
      case 'users':
        response = await apiCaller.getItems('users', query);
        setResults((prev) => (prev = response.data));
        setNoResults((prev) => (prev = response.message));
        break;
      case 'transactions':
        response = await apiCaller.getItems('transactions', query);
        setResults((prev) => (prev = response.data));
        setNoResults((prev) => (prev = response.message));
        break;
      case 'accounts':
        response = await apiCaller.getItems('accounts', query);
        setResults((prev) => (prev = response.data));
        setNoResults((prev) => (prev = response.message));
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {maxString}:
        <input
          type="text"
          value={maxrange}
          onChange={(event) => setMaxrange(event.target.value)}
        />
      </label>
      <br />
      <label>
        {minString}:
        <input
          type="text"
          value={minrange}
          onChange={(event) => setMinrange(event.target.value)}
        />
      </label>
      <br />
      {target === 'accounts' && (
        <label>
          isActive:
          <input
            type="checkbox"
            checked={boolean}
            onChange={(event) => setBoolean(event.target.checked)}
          />
        </label>
      )}
      {target === 'transactions' && (
        <div>
          <label htmlFor="transactionType">Transaction type:</label>
          <select
            id="transactionType"
            value={transactionType}
            onChange={handleTransactionTypeChange}
          >
            <option value="">-- Please choose a transaction type --</option>
            <option value="withdraw">Withdraw</option>
            <option value="deposit">Deposit</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>
      )}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default FilterForm;
