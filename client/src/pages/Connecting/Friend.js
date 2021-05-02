import React from 'react';

const Friend = ({ name, email, id }) => {
    return (
        <div className="friend_Contact">
            <div>
                <h2>
                    {name}
                </h2>
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Friend;