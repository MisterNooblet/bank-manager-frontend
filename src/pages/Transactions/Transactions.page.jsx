import Table from '../../components/Table';
import React, { useEffect, useState } from 'react';
import apiCaller from '../../utils/apiCaller';
import FilterForm from '../../components/FilterForm';

const Transactions = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [noResults, setNoResults] = useState('');

  const getData = async () => {
    const result = await apiCaller.getItems('transactions');
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
  }, []);

  return (
    <div>
      <FilterForm
        maxString={'amountMax'}
        minString={'amountMin'}
        target={'transactions'}
        setResults={setData}
        setNoResults={setNoResults}
      />
      {data.length > 0 && columns && rows ? (
        <Table headers={columns} data={rows} parent={'transactions'} />
      ) : (
        noResults
      )}
    </div>
  );
};

export default Transactions;
