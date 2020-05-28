import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList.js";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
 
function Users() {
    const [isLoading, setIsLoading] = useState(false);
    
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

    //fetch user information when certain dependencies change
    useEffect(() => {//useEffect doesnt like a async function
        const sendRequest = async () => { //but can wrap an async function inside
            setIsLoading(true);
            try {
                //default fetch() request is GET, so no need to configure
                const response = await fetch("http://localhost:5000/api/users");

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setLoadedUsers(responseData.users);
            } catch (err) {
                console.log(err);
                setError(err.message);
            }
            setIsLoading(false);
        };
        sendRequest();        
    }, []);
    
    const errorHandler = () => {
        setError(null);
    }

    /*
    const USERS = [
        {
            id: 'u1', 
            name: 'john',
            image: 'https://drinkstraightup.files.wordpress.com/2013/05/a-gentlemans-friend-2-feature-e1368290909533.jpg?w=297&h=196',
            places: 123
        }
    ];
    */

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                    {/*render a loading spinner*/}
                 </div>
            )}
            {/* ensure that everything is loaded before trying to render the element */}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers}/>}
        </>
    );
}

export default Users;