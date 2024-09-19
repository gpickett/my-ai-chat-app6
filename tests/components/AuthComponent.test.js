```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthComponent from './AuthComponent';

describe('AuthComponent', () => {
    it('renders correctly', and authenticates user successfully', () => {
        const userCredentials = { username: 'testuser', password: 'password' };
        const mockAuthFunction = jest.fn().mockResolvedValue({ success: true });

        render(<AuthComponent authenticate={mockAuthFunction} />);
        
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: userCredentials.username } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: userCredentials.password } });
        
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        
        expect(mockAuthFunction).toHaveBeenCalledWith(userCredentials);
    });

    it('shows validation errors if fields are empty', () => {
        render(<AuthComponent authenticate={() => {}} />);
        
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        
        expect(screen.getByText(/username is required/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });

    it('displays an error message if authentication fails', async () => {
        const mockAuthFunction = jest.fn().mockResolvedValue({ success: false, message: 'Invalid credentials' });

        render(<AuthComponent authenticate={mockAuthFunction} />);
        
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
        
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        
        expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
    });
});
```