import {Toolkit} from './toolkit.js';

// Button
var btn = new Toolkit.Button;
btn.setPosition(100,100);
btn.onClick(function(e){
	console.log("Button has been clicked");
});
btn.onMouseOver(function(e) {
	console.log("Hovering over button");
})
btn.setBtnLabel("Click Me!");

// Checkbox
var checkbox = new Toolkit.Checkbox;
checkbox.setPosition(100,200);
checkbox.onClick(function(e){
	console.log(e);
});
checkbox.onMouseOver(function(e) {
	console.log("Hovering over checkbox");
})
checkbox.setCheckboxLabel("Enrolled in INF 134");

// Radio Buttons
var radioButtons = new Toolkit.RadioButton;
radioButtons.setPosition(100,300);
radioButtons.setButtons(5, ["Radio 1", "Radio 2", "Radio 3", "Radio 4", "Radio 5"])
radioButtons.onClick(function(e){
	console.log(e);
});
radioButtons.onHover(function(e){
	console.log(e)
});

// Textbox
var textbox = new Toolkit.Textbox;
textbox.setPosition(600,200);
textbox.setText("Textbox");
textbox.setWidth(300);
textbox.onTextChange(function() {
	console.log("The text has changed in the textbox");
});


// Progress Bar
var progressBar = new Toolkit.ProgressBar;
progressBar.setPosition(600,300);
progressBar.setWidth(400);
progressBar.setIncrementValue(70);
var incrementValue = progressBar.getIncrementValue();
console.log("Initial Increment Value: " + incrementValue);
progressBar.onIncrement(function() {
	console.log("The progress bar has been incremented");
});
progressBar.onDecrement(function() {
	console.log("The progress bar has been decremented");
});
progressBar.setIncrementDecrement(30);


// Custom: Tooltip
var tooltip = new Toolkit.Tooltip(textbox);
tooltip.setPosition(600, 450);
tooltip.setText("This is a tooltip");
