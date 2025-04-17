import { Form, Button } from 'react-bootstrap';
import './LoginPage.scss';
import { useState } from 'react';

const LoginPage = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted', formData);
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
            Sign In
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