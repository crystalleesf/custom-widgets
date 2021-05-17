import {Toolkit} from './toolkit.js';

// Button
var btn = new Toolkit.Button;
btn.setBtnPosition(100,100);
btn.onBtnClick(function(e){
	
});
btn.onBtnMouseOver(function(e) {
	
});
btn.setBtnWidth(100);
btn.setBtnLabel("Button");


// Checkbox
var checkbox = new Toolkit.Checkbox;
checkbox.setCheckboxPosition(100,200);
checkbox.onCheckboxClick(function(e){
	let isChecked = checkbox.getCheckboxStatus() ? "checked" : "not checked";
    console.log("Checkbox is " + isChecked);
});
checkbox.onCheckboxMouseOver(function(e) {
	
});
checkbox.setCheckboxLabel("Enrolled in INF 134");


// Radio Buttons
var radioButtons = new Toolkit.RadioButton;
radioButtons.setRadioPosition(100,300);
radioButtons.setRadioButtonsContainerTitlePosition(185,310);
radioButtons.setRadioButtonsContainerTitle("Radio Buttons");
radioButtons.setRadioButtons(5, ["Radio 1", "Radio 2", "Radio 3", "Radio 4", "Radio 5"])
radioButtons.onRadioClick(function(e){
	
});
radioButtons.onRadioHover(function(e){
	
});


// Textbox
var textbox = new Toolkit.Textbox;
textbox.setTextboxPosition(600,100);
textbox.setTextboxText("Hello World");
textbox.setTextboxWidth(300);
textbox.onTextboxTextChange(function(e) {
	
});
textbox.onTextboxHover(function(e) {
	
});


// Scroll Bar
var scrollbar = new Toolkit.Scrollbar;
scrollbar.setScrollbarPosition(600,300);
scrollbar.setScrollbarHeight(300);
var pos = scrollbar.getThumbPosition();
console.log("Scrollbar Thumb Position: " + pos);
scrollbar.onScroll(function(e) {
	
});
scrollbar.onScrollbarHover(function(e) {
	
});
scrollbar.onScrollbarMouseUp(function(e) {
	
});
scrollbar.onScrollbarMouseDown(function(e) {
	
});


// Progress Bar
var progressBar = new Toolkit.ProgressBar;
progressBar.setProgressBarPosition(600,200);
progressBar.setProgressBarWidth(400);
progressBar.setIncrementValue(70);
var incrementValue = progressBar.getIncrementValue();
console.log("Progress bar's initial increment value: " + incrementValue);
progressBar.onIncrement(function(e) {
	
});
progressBar.onDecrement(function(e) {
	
});
progressBar.setIncrementDecrement(30);
progressBar.onProgressBarMouseOver(function(e) {
	
});


// Toggle Switch
var toggleSwitch = new Toolkit.ToggleSwitch();
toggleSwitch.setTogglePosition(700, 300);
toggleSwitch.onToggleClick(function(e) {
	let isOn = toggleSwitch.getToggleStatus() ? "on" : "off";
    console.log("Toggle Switch is " + isOn);
});
toggleSwitch.onToggleHover(function(e) {

});