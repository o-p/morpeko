import { render, screen } from '@testing-library/react';
import App from './App.tsx';

test('renders learn react link', () => {
  render(<App />);
  const myName = screen.getByText(/CHRIS CHU/i);
  expect(myName).toBeInTheDocument();
});
