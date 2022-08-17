import React, { useEffect, useState } from "react";
import withMock from "storybook-addon-mock";
import MonacoCodeEditor from "../components/MonacoCodeEditor/MonacoCodeEditor.js";
import mockBuiltins from "./builtinData.mock";

export default {
  title: "Monaco Code Editor",
  component: MonacoCodeEditor,
  decorators: [withMock],
  argTypes: {
    theme: {
      options: ["vs-dark", "light"],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => {
  return (
    <div style={{ height: "90vh" }}>
      <MonacoCodeEditor {...args} useLanguageServer />
    </div>
  );
};

export const Python = Template.bind({});
Python.parameters = {
  mockData: [
    {
      url: "/api/v1/callback-builtins/",
      method: "GET",
      status: 200,
      response: (request) => {
        const { url, method, body, searchParams } = request;
        console.log(
          "debug mock api storybook",
          url,
          method,
          body,
          searchParams
        );
        return mockBuiltins;
      },
    },
  ],
};
Python.args = {
  style: { minHeight: "90vh" },
  language: "python",
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
