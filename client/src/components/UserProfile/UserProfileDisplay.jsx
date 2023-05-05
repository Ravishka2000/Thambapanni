import React, { useState } from 'react'
import Button from '@mui/material/Button';
import EditUser from './EditUserProfile';
import UserInfo from './UserProfile';

const UserProfileDisplay = () => {

    const [isEditing, setIsEditing] = useState(false);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div style={{backgroundColor:"white",height:"800px",display:'flex',justifyContent:"left",flexDirection:"column"}}>
            {isEditing ? (
                <EditUser onEditToggle={handleEditToggle} />
            ) : (
                <UserInfo />
            )}
            {!isEditing && (
                <Button onClick={handleEditToggle} variant="contained"
                            sx={{ color: 'white', backgroundColor: "#3498DB", borderColor: 'green', width: '35ch', padding: 2, margin: 2, fontWeight: "bold",'&:hover': {background: '#3498DB'} }}
                    >
                    Edit
                </Button>
            )}
        </div>
    )
}

export default UserProfileDisplay