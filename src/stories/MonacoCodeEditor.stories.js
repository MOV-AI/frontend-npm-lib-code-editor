import React from 'react';
import MonacoCodeEditor from '../components/MonacoCodeEditor/MonacoCodeEditor.js';

export default {
  title: 'Monaco Code Editor',
  component: MonacoCodeEditor,
  argTypes: {
    theme: {
      options: ['vs-dark', 'light'],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => (
  <div style={{ height: '90vh' }}>
    <MonacoCodeEditor {...args} />
  </div>
);

export const Python = Template.bind({});
Python.args = {
  style: { minHeight: '90vh' },
  language: 'python',
  value: `class LightSwitch:
	
	def __init__(self):
		""" Declares all necessary variables including list of states, histories etc. 
		"""
		self.user = LightSwitch.User(self)
		self.light = LightSwitch.Light(self)
		...
		# for timed statechart:
		self.timer_service = None
		...
	
	def enter(self):
		...
	
	def exit(self):
		...
	
	def run_cycle(self):
		...`,
};
