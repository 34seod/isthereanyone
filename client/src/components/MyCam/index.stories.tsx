import React, { useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MyCam from '.';

export default {
  title: 'MyCam',
  component: MyCam,
} as Meta;



const Template: Story<React.ComponentProps<typeof MyCam>> = (args) => {
  const videoRef = useRef(document.createElement('video'));
  const [showFlashMessage, setShowFlashMessage] = useState<boolean>(false);
  const myCamArgs = { ...args, videoRef, setShowFlashMessage };

  return <MyCam {...myCamArgs} />;
};

export const Default = Template.bind({});
Default.args = {
  nickname: 'nickname',
  isScreenShare: true,
  roomId: 'test',
};


// export const Default = Template.bind({});
// Default.args = {
//   task: {
//     id: '1',
//     title: 'Test Task',
//     state: 'TASK_INBOX',
//     updatedAt: new Date(2018, 0, 1, 9, 0),
//   },
// };

// export const Pinned = Template.bind({});
// Pinned.args = {
//   task: {
//     ...Default.args.task,
//     state: 'TASK_PINNED',
//   },
// };

// export const Archived = Template.bind({});
// Archived.args = {
//   task: {
//     ...Default.args.task,
//     state: 'TASK_ARCHIVED',
//   },
// };