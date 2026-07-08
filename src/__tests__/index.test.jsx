import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import '@testing-library/jest-dom';

test('renders shopping app', () => {
  render(<App />);
  expect(screen.getByText(/Shopping App/i)).toBeInTheDocument();
});

test('toggles dark mode on button click', () => {
  render(<App />);
  const toggleBtn = screen.getByRole('button', { name: /Dark Mode|Light Mode/i });
  
  expect(toggleBtn).toBeInTheDocument();

  fireEvent.click(toggleBtn);
  expect(toggleBtn).toHaveTextContent(/Light Mode/i);

  fireEvent.click(toggleBtn);
  expect(toggleBtn).toHaveTextContent(/Dark Mode/i);
});

test('filters products by category', () => {
  render(<App />);
  const dropdown = screen.getByRole('combobox');

  fireEvent.change(dropdown, { target: { value: 'Fruits' } });
  expect(screen.getByText(/Apple/i)).toBeInTheDocument();
  expect(screen.queryByText(/Milk/i)).not.toBeInTheDocument();
});

test('shows "No products available" when filtering removes all products', () => {
  render(<App />);
  const dropdown = screen.getByRole('combobox');
  
  // Use a category that doesn't exist
  fireEvent.change(dropdown, { target: { value: 'Veggies' } });
  
  expect(screen.getByText(/no products/i)).toBeInTheDocument();
});