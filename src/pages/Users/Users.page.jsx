import React, { useEffect, useState } from 'react';
import apiCaller from '../../utils/apiCaller';
import Table from '../../components/Table';
import { useParams } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const getUsers = async () => {
    const result = await apiCaller.getItems('users');
    setUsers((prev) => (prev = result.data));
    setColumns((prev) => (prev = Object.keys(result.data[0])));
    let rowMap = result.data
      .map((obj) => Object.values(obj))
      .map((array) => {
        let modifiedArray = [];
        array.forEach((item) => {
          if (typeof item !== 'object') {
            modifiedArray.push(item);
          } else {
            modifiedArray.push(item.length);
          }
        });

        return modifiedArray;
      });
    setRows((prev) => (prev = rowMap));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {users && columns && rows ? (
        <Table headers={columns} data={rows} parent={'users'} />
      ) : null}
    </div>
  );
};

export default Users;
