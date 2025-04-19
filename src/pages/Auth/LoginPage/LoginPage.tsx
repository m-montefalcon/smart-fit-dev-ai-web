import { Form, Button } from 'react-bootstrap';
import './LoginPage.scss';
import { useState } from 'react';
import { loginUser } from '../../../redux/auth/authThunks';
import { useAppDispatch } from '../../../redux/hooks';
import handleError from '../../../utils/handlerError';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false); 

  const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  const handleSubmitLogin = async  (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);  

    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate('/home');  
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);  
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please sign in to continue</p>
        </div>
        
        <Form onSubmit={handleSubmitLogin}>
          <Form.Floating className="mb-3">
            <Form.Control
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChangeFormData}
              required
            />
            <label htmlFor="email">Email address</label>
          </Form.Floating>

          <Form.Floating>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChangeFormData}
              required
            />
            <label htmlFor="password">Password</label>
          </Form.Floating>

          <Button variant="primary" className="login-button" type='submit'>
            {isLoading ? 'Loading...' : 'Sign In'}
          </Button>

        </Form>

        <div className="login-footer">
          <p>Don't have an account? <a href="/register">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;