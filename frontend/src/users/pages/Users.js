import React from 'react';

import UsersList from "../components/UsersList.js";
 
function Users() {
    const USERS = [
        {
            id: 'u1', 
            name: 'john',
            image: 'https://drinkstraightup.files.wordpress.com/2013/05/a-gentlemans-friend-2-feature-e1368290909533.jpg?w=297&h=196',
            places: 123
        }
    ];

    return <UsersList items={USERS}/>
}

export default Users;