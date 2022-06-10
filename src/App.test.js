import { render, screen } from '@testing-library/react';

import App from './App';

test('shows adding a match form page', () => {
  render(<App />);
  const linkElement = screen.getBy("Add A Match");
  expect(linkElement).toBeInTheDocument();
});

// const server = setupServer(
//   rest.get('/matches', (req, res, ctx) => {
//     return res(ctx.json({greeting: 'hello there'}))
//   }),
// )