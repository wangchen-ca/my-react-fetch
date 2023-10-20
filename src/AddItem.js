import React from 'react';

// AddItem component
export default function AddItem(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <label htmlFor="newName">Name: </label>
            <input type="text" id="newName" name="newName" />

            <label htmlFor="newEmail">Email:</label>
            <input type="text" id="newEmail" name="newEmail" />

            <input type="submit" value="Ok" />
        </form>
    );

};

