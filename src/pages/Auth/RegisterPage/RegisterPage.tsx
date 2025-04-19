import { Form, Button } from 'react-bootstrap';
import './RegisterPage.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../../../redux/auth/authThunks';
import { useAppDispatch } from '../../../redux/hooks';


interface FormDataInterface {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const RegisterPage = () => {

    const [formData, setFormData] = useState<FormDataInterface>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string>(''); // Error state for showing error messages
    const [isLoading, setIsLoading] = useState(false); // Loading state for the button
    const dispatch = useAppDispatch();

    const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    }
    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);  // Start loading state
        setError('');  // Reset error
    
        // Simple client-side validation (password confirmation)
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);  // Stop loading state
          return;
        }
    
        try {
          // Dispatch the registerUser thunk action
          await dispatch(registerUser(formData)).unwrap();  // .unwrap() to get the result or throw error
    
          // You can handle success here, e.g., redirecting or updating state if needed
    
        } catch (error: any) {
          // Handle error from the thunk (which comes from the rejectWithValue in the thunk)
          setError(error || 'An error occurred during registration');
        } finally {
          setIsLoading(false);  // Stop loading state
        }
      };

    return (
        <div className="register-container">
        <div className="register-card">
            <div className="register-header">
            <h1>Create Account</h1>
            <p>Please fill in your details to register</p>
            </div>
            
            <Form onSubmit={handleRegisterSubmit}>
            {error && <div className="alert alert-danger">{error}</div>} {/* Show error message */}

            <Form.Floating className="mb-3">
                <Form.Control
                id="fullName"
                type="text"
                placeholder="Full Name"
                required
                value={formData.fullName}
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

            <Button variant="primary" className="register-button" type="submit" disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Create Account'}
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