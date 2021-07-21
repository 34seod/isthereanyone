import React, { ComponentProps } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';
import store from '../../store';
import Door from '.';

export default {
  title: 'Door',
  component: Door,
  decorators: [
    (story: () => JSX.Element) => (
      <Provider store={store}>
        <Router>
          <Route>{story()}</Route>
        </Router>
      </Provider>
    )
  ]
} as Meta;

const Template: Story<ComponentProps<typeof Door>> = () => <div className="new"><Door /></div>;

export const Default = Template.bind({});
