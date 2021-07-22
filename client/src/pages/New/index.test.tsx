import React from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import store from '../../store';
import New from '.';

describe('New', () => {
  afterEach(cleanup);

  it('renders new page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" component={New} />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText(/Is there anyone/)).toBeInTheDocument();
  });

  it('press enter room number', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={New} />
        </Router>
      </Provider>
    );
    const input = container.querySelector('input') || document.createElement('input');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(history.location.pathname).toBe('/test');
  });

  it('click knock button', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={New} />
        </Router>
      </Provider>
    );
    const input = container.querySelector('input') || document.createElement('input');
    const knock = container.querySelector('#knock-btn') || document.createElement('button');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(knock, { button: 0 });

    expect(history.location.pathname).toBe('/test');
  });
});
