import { withAuthentication } from "@mov-ai/mov-fe-lib-react";
import React from "react";
import withMock from "storybook-addon-mock";
import MonacoCodeEditor from "../components/MonacoCodeEditor/MonacoCodeEditor.js";
import { token } from "./tokens";

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
  const C = (_) => (
    <div style={{ height: "90vh" }}>
      <MonacoCodeEditor {...args} useLanguageServer />
    </div>
  );
  const A = withAuthentication(C);
  return <A></A>;
};

export const Python = Template.bind({});
// We need to mock authentication in storybook because proxying requests to BE is not enough (storybook sends requests through iframes, which are blocked in BE)
Python.parameters = {
  mockData: [
    {
      url: "/token-auth/",
      method: "POST",
      status: 200,
      response: (_) => {
        // MUST BE A REAL TOKEN FROM MOVAI BE
        return token;
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
  builtins: ["batata", "ervilha"],
};
