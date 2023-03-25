import Table from '../../components/Table';
import React, { useEffect, useState } from 'react';
import apiCaller from '../../utils/apiCaller';

const Accounts = () => {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const getUsers = async () => {
    const result = await apiCaller.getItems('accounts');
    setUsers((prev) => (prev = result.data));
    setColumns((prev) => (prev = Object.keys(result.data[0])));
    let rowMap = result.data
      .map((obj) => Object.values(obj))
      .map((array) => {
        let modifiedArray = [];
        array.forEach((item) => {
          console.log(typeof item);
          if (typeof item !== 'object') {
            modifiedArray.push(item);
          } else {
            modifiedArray.push(item.length);
          }
        });

        return modifiedArray;
      });
    console.log(rowMap);
    setRows((prev) => (prev = rowMap));
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

export default Accounts;
