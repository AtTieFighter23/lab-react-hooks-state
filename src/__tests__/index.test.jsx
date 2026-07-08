import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
  expect(toggleBtn).toHaveTextContent('Light Mode');

  fireEvent.click(toggleBtn);
  expect(toggleBtn).toHaveTextContent('Dark Mode');
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
  fireEvent.change(dropdown, { target: { value: 'Veggies' } }); // non-existent
  expect(screen.getByText(/no products available/i)).toBeInTheDocument();
});