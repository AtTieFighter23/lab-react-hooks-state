import { test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { sampleProducts } from '../components/ProductList';
import '@testing-library/jest-dom';

test('toggles dark mode on button click', () => {
  render(<App />);
  const toggleBtn = screen.getByRole('button', { name: /Dark Mode|Light Mode/i });
  
  expect(toggleBtn).toBeInTheDocument();

  fireEvent.click(toggleBtn);
  expect(toggleBtn.textContent.toLowerCase()).toMatch(/light/i);

  fireEvent.click(toggleBtn);
  expect(toggleBtn.textContent.toLowerCase()).toMatch(/dark/i);
});

test('filters products by category', () => {
  render(<App />);
  const dropdown = screen.getByRole('combobox');

  fireEvent.change(dropdown, { target: { value: 'Fruits' } });
  expect(screen.getByText(/Apple/i)).toBeInTheDocument();
  expect(screen.queryByText(/Milk/i)).not.toBeInTheDocument();
});

test('displays message when no products match filter', () => {
  render(<App />);
  const dropdown = screen.getByRole('combobox');
  fireEvent.change(dropdown, { target: { value: 'NonExistent' } });

  expect(screen.getByText(/no products/i)).toBeInTheDocument();
});

test('adds items to cart', () => {
  render(<App />);

  const appleBtn = screen.getByTestId('product-1');
  fireEvent.click(appleBtn);

  expect(screen.getByText(/Apple is in your cart/i)).toBeInTheDocument();

  const milkBtn = screen.getByTestId('product-2');
  fireEvent.click(milkBtn);
});