import React from 'react';
import {
  BrowserRouter,
  Router,
  Route,
} from 'react-router-dom';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import New from '.';

describe('New', () => {
  afterEach(cleanup);

  it('renders new page', () => {
    render(
      <BrowserRouter>
        <Route path="/" component={New} />
      </BrowserRouter>
    );

    const title = screen.getByText(/Is there anyone/);
    expect(title).toBeInTheDocument();
  });

  it('press enter room number', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Route path="/" component={New} />
      </Router>
    );
    const input = container.querySelector('input') || document.createElement('input');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(history.location.pathname).toBe('/test');
  });

  it('click knock button', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Route path="/" component={New} />
      </Router>
    );
    const input = container.querySelector('input') || document.createElement('input');
    const knock = container.querySelector('button') || document.createElement('button');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(knock, { button: 0 });

    expect(history.location.pathname).toBe('/test');
  });
});
