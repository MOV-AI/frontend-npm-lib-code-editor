import { withAuthentication } from "@mov-ai/mov-fe-lib-react";
import React from "react";
import withMock from "storybook-addon-mock";
import MonacoCodeEditor from "../components/MonacoCodeEditor/MonacoCodeEditor.js";

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
        return {
          refresh_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSZWZyZXNoIiwiaXNzIjoiYmFja2VuZCIsImlhdCI6MTY2MTE3MzcyNywiZXhwIjoxNjYxNzc4NTI3LCJqdGkiOiJiZDU2MzY3OS0xNTkyLTQwZGMtYjg4OC05YjQ2NWQ0ZTE5YTciLCJyZWZyZXNoX2lkIjoiIiwiZG9tYWluX25hbWUiOiJpbnRlcm5hbCIsImFjY291bnRfbmFtZSI6InBlZHJvIiwiY29tbW9uX25hbWUiOiJQZWRybyIsInVzZXJfdHlwZSI6IklOVEVSTkFMIiwicm9sZXMiOlsiRGVmYXVsdFJvbGUiXSwiZW1haWwiOiIiLCJzdXBlcl91c2VyIjp0cnVlLCJyZWFkX29ubHkiOmZhbHNlLCJzZW5kX3JlcG9ydCI6ZmFsc2V9.sj7p0n81hHdQCxQtCwRJHzBPTJShG7JgSZJR6VkBSFs",
          access_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBY2Nlc3MiLCJpc3MiOiJiYWNrZW5kIiwiaWF0IjoxNjYxMTczNzI3LCJleHAiOjE2NjExNzczMjcsImp0aSI6ImJjNDFkYmI5LWU2ZTYtNDQ4NS04MTRlLTdjMWY0ZThmODdkNSIsInJlZnJlc2hfaWQiOiJiZDU2MzY3OS0xNTkyLTQwZGMtYjg4OC05YjQ2NWQ0ZTE5YTciLCJkb21haW5fbmFtZSI6ImludGVybmFsIiwiYWNjb3VudF9uYW1lIjoicGVkcm8iLCJjb21tb25fbmFtZSI6IlBlZHJvIiwidXNlcl90eXBlIjoiSU5URVJOQUwiLCJyb2xlcyI6WyJEZWZhdWx0Um9sZSJdLCJlbWFpbCI6IiIsInN1cGVyX3VzZXIiOnRydWUsInJlYWRfb25seSI6ZmFsc2UsInNlbmRfcmVwb3J0IjpmYWxzZX0.-lNF1og9lDjBulw2P_rXahHONN21DRVHBNzYMNIZZdA",
          error: false,
        };
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
