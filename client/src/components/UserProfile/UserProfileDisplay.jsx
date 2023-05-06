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
        <div style={{backgroundColor:"white",height:"700px",display:'flex',justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            {isEditing ? (
                <EditUser onEditToggle={handleEditToggle} />
            ) : (
                <UserInfo />
            )}
            {!isEditing && (
                <Button onClick={handleEditToggle} variant="contained"
                            sx={{ color: 'white', backgroundColor: "#9CCC65", borderColor: 'green', width: '35ch', padding: 1, margin: 3, fontWeight: "bold",'&:hover': {background: '#9CCC65'} }}
                    >
                    Edit
                </Button>
            )}
        </div>
    )
}

export default UserProfileDisplay