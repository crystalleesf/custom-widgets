import {Toolkit} from './toolkit.js';

// Button
var btn = new Toolkit.Button;
btn.onclick(function(e){
	console.log(e);
});
btn.setBtnLabel("Click Me!");

// Checkbox
var checkbox = new Toolkit.Checkbox;
checkbox.onclick(function(e){
	console.log(e);
});
checkbox.setCheckboxLabel("Enrolled in INF 134");

// Radio Buttons
var radioButtons = new Toolkit.RadioButton;
radioButtons.setNumButtons(5);
radioButtons.setButtonLabels(["Radio 1", "Radio 2", "Radio 3", "Radio 4", "Radio 5"]);
radioButtons.onclick(function(e){
	console.log(e);
});