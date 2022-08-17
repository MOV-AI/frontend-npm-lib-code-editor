import React from "react";
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
    {
      url: "/token-verify/",
      method: "POST",
      status: 200,
      response: (_) => {
        return {
          result: true,
        };
      },
    },
    {
      url: "/token-auth/",
      method: "POST",
      status: 200,
      response: (_) => {
        return {
          refresh_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSZWZyZXNoIiwiaXNzIjoiYmFja2VuZCIsImlhdCI6MTY2MDc0NzIxMSwiZXhwIjoxNjYxMzUyMDExLCJqdGkiOiIxNzExNDE4MS1mMmNmLTRlNGUtOTdlNS0zODU1NmJmZWU4MjgiLCJyZWZyZXNoX2lkIjoiIiwiZG9tYWluX25hbWUiOiJpbnRlcm5hbCIsImFjY291bnRfbmFtZSI6InBlZHJvIiwiY29tbW9uX25hbWUiOiJQZWRybyIsInVzZXJfdHlwZSI6IklOVEVSTkFMIiwicm9sZXMiOlsiRGVmYXVsdFJvbGUiXSwiZW1haWwiOiIiLCJzdXBlcl91c2VyIjp0cnVlLCJyZWFkX29ubHkiOmZhbHNlLCJzZW5kX3JlcG9ydCI6ZmFsc2V9.kc8L_jhHiaIZD9ljWKOdGII12avrjnkE-unDa-MI9Vs",
          access_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBY2Nlc3MiLCJpc3MiOiJiYWNrZW5kIiwiaWF0IjoxNjYwNzQ3MjExLCJleHAiOjE2NjA3NTA4MTEsImp0aSI6IjhhNzUwNTdjLTM3N2UtNGVhOC1iOTIxLTg2YTNmYTYxZmU4YSIsInJlZnJlc2hfaWQiOiIxNzExNDE4MS1mMmNmLTRlNGUtOTdlNS0zODU1NmJmZWU4MjgiLCJkb21haW5fbmFtZSI6ImludGVybmFsIiwiYWNjb3VudF9uYW1lIjoicGVkcm8iLCJjb21tb25fbmFtZSI6IlBlZHJvIiwidXNlcl90eXBlIjoiSU5URVJOQUwiLCJyb2xlcyI6WyJEZWZhdWx0Um9sZSJdLCJlbWFpbCI6IiIsInN1cGVyX3VzZXIiOnRydWUsInJlYWRfb25seSI6ZmFsc2UsInNlbmRfcmVwb3J0IjpmYWxzZX0.t7l7Kd6mIMWyKqk5oOOlqLsPzCh7lEwo5g0AynYoMT8",
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
};
