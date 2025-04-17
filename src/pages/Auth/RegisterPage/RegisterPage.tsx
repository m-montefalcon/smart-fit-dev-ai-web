import { Form, Button } from 'react-bootstrap';
import './RegisterPage.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const RegisterPage = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    }
    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register form submitted', formData);
    }

    return (
        <div className="register-container">
        <div className="register-card">
            <div className="register-header">
            <h1>Create Account</h1>
            <p>Please fill in your details to register</p>
            </div>
            
            <Form onSubmit={handleRegisterSubmit}>
            <Form.Floating className="mb-3">
                <Form.Control
                id="name"
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChangeFormData}
                />
                <label htmlFor="name">Full Name</label>
            </Form.Floating>

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

            <Form.Floating className="mb-3">
                <Form.Control
                id="password"
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChangeFormData}
                />
                <label htmlFor="password">Password</label>
            </Form.Floating>

            <Form.Floating>
                <Form.Control
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={handleChangeFormData}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
            </Form.Floating>

            <Button variant="primary" className="register-button" type="submit">
                Create Account
            </Button>
            </Form>

            <div className="register-footer">
            <p>Already have an account? <a href="/login"><Link to="/">Sign In</Link></a></p>
            </div>
        </div>
        </div>
    );
};

export default RegisterPage;