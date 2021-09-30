import React from "react";
import MonacoCodeEditor from "../components/MonacoCodeEditor/MonacoCodeEditor.js";

export default {
  title: "Monaco Code Editor",
  component: MonacoCodeEditor,
  argTypes: {
    theme: {
      options: ["vs-dark", "light"],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => <MonacoCodeEditor {...args} />;

export const Python = Template.bind({});
Python.args = {
  style: { height: "90vh" },
  language: "python",
  defaultLanguage: "python",
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

export const Yaml = Template.bind({});
Yaml.args = {
  style: { height: "90vh" },
  language: "yaml",
  defaultLanguage: "yaml",
  value: `%TAG ! tag:clarkevans.com,2002:
--- !shape
  # Use the ! handle for presenting
  # tag:clarkevans.com,2002:circle
- !circle
  center: &ORIGIN {x: 73, y: 129}
  radius: 7
- !line
  start: *ORIGIN
  finish: { x: 89, y: 102 }
- !label
  start: *ORIGIN
  color: 0xFFEEBB
  text: Pretty vector drawing.
  


camera_front:
tf_prefix: camera_front
serial_no: '"944122071936"'
camera_back:
  tf_prefix: camera_back
  serial_no: '"902512070494"'
ble_battery_mac: "B4:52:A9:B6:C0:BA"
ble_battery_model: "UPOWER_UE12LI22BL"  
states:
  boot:
    flow: tugbot_spawn_off
    services: []
  idle:
    flow: tugbot_spawn_off
    services: []
  runtime:
    flow: tugbot_pick_drop
dock:
    expected_tags: [327, 308]
    shift: 0.0`,
};

export const XML = Template.bind({});
XML.args = {
  style: { height: "90vh" },
  language: "xml",
  defaultLanguage: "xml",
  value: `<?xml version="1.0"?>
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <connectionStrings>
    <add name="MyDB" 
      connectionString="value for the deployed Web.config file" 
      xdt:Transform="SetAttributes" xdt:Locator="Match(name)"/>
  </connectionStrings>
  <system.web>
    <customErrors defaultRedirect="GenericError.htm"
      mode="RemoteOnly" xdt:Transform="Replace">
      <error statusCode="500" redirect="InternalError.htm"/>
    </customErrors>
  </system.web>
</configuration>`,
};

export const Javascript = Template.bind({});
Javascript.args = {
  style: { height: "90vh" },
  defaultLanguage: "javascript",
  language: "javascript",
  value: `const greeting = () => {
    alert("Hello world");
}`,
};
