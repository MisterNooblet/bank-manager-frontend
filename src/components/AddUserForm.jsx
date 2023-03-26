import { Button } from '@mui/material';
import { useState } from 'react';
import apiCaller from '../utils/apiCaller';

const AddUserForm = ({ setData }) => {
  const [passportID, setPassportID] = useState('');
  const [name, setName] = useState('');

  const addNewUser = async () => {
    const result = await apiCaller.addNewUser({
      passportID: passportID,
      name: name,
    });
    setData((prev) => (prev = result));
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (passportID.length > 0 && name.length > 0) {
      addNewUser();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="passportID">Passport ID:</label>
        <input
          type="text"
          id="passportID"
          value={passportID}
          onChange={(event) => setPassportID(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <Button type="submit">Add new user</Button>
    </form>
  );
};
export default AddUserForm;
