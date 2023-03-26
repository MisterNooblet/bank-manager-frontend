import { Button, Container, List, ListItem, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiCaller from '../../utils/apiCaller';

const User = () => {
  const [user, setUser] = useState(null);
  const ref = useRef();
  const params = useParams();
  const navigate = useNavigate();

  const getUser = async () => {
    const results = await apiCaller.getUser(params.id);
    setUser((prev) => (prev = results.data));
    console.log(results.data);
  };

  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, []);

  const handleChangeName = async (e) => {
    e.preventDefault();
    const response = await apiCaller.updateUser(params.id, ref.current.value);
    setUser((prev) => (prev = response.data));
  };

  const handleUserDelete = async () => {
    const response = await apiCaller.deleteUser(params.id);
    if (response.success) {
      navigate('/users');
    }
  };

  const handleAddAccount = async () => {
    const response = await apiCaller.addAccount(params.id);
    setUser((prev) => (prev = response.data));
  };

  return (
    <Container>
      {user && (
        <>
          <Typography>Passport ID : {user.passportID}</Typography>

          <Typography>Name : {user.name}</Typography>
          <form onSubmit={(e) => handleChangeName(e)}>
            <input ref={ref} type={'text'} />
            <Button type="submit">Change Name</Button>
          </form>
          <Typography>Total Balance : {user.netWorth}</Typography>
          <Typography>Accounts:</Typography>
          <List>
            {user.accounts.map((account) => (
              <Link key={account} to={`/accounts/${account}`}>
                <ListItem>{account}</ListItem>
              </Link>
            ))}
            <Button
              onClick={() => {
                handleAddAccount();
              }}
            >
              Add account
            </Button>
          </List>
          <Button
            onClick={() => {
              handleUserDelete();
            }}
          >
            Delete User
          </Button>
        </>
      )}
    </Container>
  );
};

export default User;
