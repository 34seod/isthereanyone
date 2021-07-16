import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import Door from '.';

export default {
  title: 'Door',
  component: Door,
} as Meta;

const Template: Story<ComponentProps<typeof Door>> = () => <div className="new"><Door /></div>;

export const Default = Template.bind({});
