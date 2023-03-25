import Table from '../../components/Table';
import React, { useEffect, useState } from 'react';
import apiCaller from '../../utils/apiCaller';

const Transactions = () => {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const getUsers = async () => {
    const result = await apiCaller.getItems('transactions');
    setUsers((prev) => (prev = result.data));
    setColumns((prev) => (prev = Object.keys(result.data[0])));
    setRows((prev) => (prev = result.data.map((obj) => Object.values(obj))));
    console.log(rows);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {users && columns && rows ? (
        <Table headers={columns} data={rows} />
      ) : null}
    </div>
  );
};

export default Transactions;
