import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useAppDispatch } from '../../redux/hooks';
import { logoutUser } from '../../redux/auth/authThunks';
import handleError from '../../utils/handlerError';
const HomePage = () => {

const [isLoading, setIsLoading] = useState(false); 
const dispatch = useAppDispatch();
const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);  
    try {
        await dispatch(logoutUser()).unwrap();
      } catch (err) {
        handleError(err);
      } finally {
      setIsLoading(false);  
    }
}
  return (
    <>
    <Button variant="primary" onClick={handleLogout}>
        {isLoading ? 'Logging out...' : 'Logout'}
    </Button>
    </>    
  )
}

export default HomePage