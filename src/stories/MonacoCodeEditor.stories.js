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

export const Yaml = Template.bind({});
Yaml.args = {
  language: "yaml",
  value: `camera_front:
  tf_prefix: camera_front
  serial_no: '"943222074478"'
camera_back:
  tf_prefix: camera_back
  serial_no: '"944122072394"'
ble_battery_mac: "00:35:FF:34:72:C0" 
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
#dock:
#    expected_tags: [327, 308]
#    shift: 0.0`,
};
