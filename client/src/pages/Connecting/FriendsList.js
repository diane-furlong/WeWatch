import React from 'react';
import Friend from './Friend';

const FriendsList = ({ contacts }) => {
    return (
        <div>
            {
                contacts.map((user, i) => {
                    return <Friend
                        key={i}
                        id={contacts[i].id}
                        name={contacts[i].name}
                        email={contacts[i].email}
                    />
                })
            }
        </div>
    );
}

export default FriendsList;