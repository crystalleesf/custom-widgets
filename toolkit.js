import {SVG} from './svg.min.js';

var Toolkit = (function() {
    var draw = SVG().addTo('body').size('2000px','2000px');
    var Button = function() {
        var btn = draw.group()
        var rect = btn.rect(100,50).fill('#a5a58d').move(100,100);
        var btnLabel = btn.text("Button").fill('white').font('family', 'Menlo').move(110, 115);
        var clickEvent = null

        rect.radius(10);
        rect.mouseover(function(){
            this.fill({ color: '#cb997e'})
        })
        rect.mouseout(function(){
            this.fill({ color: '#a5a58d'})
        })
        rect.mouseup(function(){
            this.fill({ color: '#a5a58d'})
        })
        rect.click(function(event){
            this.fill({ color: '#ddbea9'})
            if(clickEvent != null)
                clickEvent(event)
        })
        return {
            /**
             * @param  {function} eventHandler - event handler that notifies consuming code that the button has been clicked
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * @param  {string} label - set the label of the button
             */
            setBtnLabel: function(label) {
                btnLabel.text(label);
            }
        }
    }

    var Checkbox = function() {
        var checkbox = draw.group();
        var box = checkbox.rect(20,20).stroke({color: 'black'}).fill('none').move(100, 200);
        var boxLabel = checkbox.text("This is a checkbox").fill('black').font('family', 'Menlo').move(140, 200);
        var clickEvent = null
        var isClicked = false

        box.radius(2);
        box.click(function(event){
            if(clickEvent != null) {
                clickEvent(event);
                isClicked = !isClicked;
            }
            if (isClicked == true) {
                this.fill({color: 'none'});
                this.stroke({color: 'black'});
            }
            else {
                this.fill({color: '#a5a58d'});
                this.stroke({color: '#a5a58d'});
            }
        })
        return {
            /**
             * @param  {function} eventHandler - event handler that notifies the consuming code that the checkbox has been selected
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler
                isClicked = !isClicked
            },
            /**
             * @param  {string} label - set the label of the checkbox
             */
            setCheckboxLabel: function(label) {
                boxLabel.text(label);
            }
        }
    }

    var RadioButton = function() {
        var radioButtons = draw.group();
        var container = radioButtons.rect(300,200).stroke({color: 'black'}).fill('none').move(80, 300);
        container.radius(5);
        var titleContainer = radioButtons.rect(300,35).stroke({color: 'black'}).fill('#a5a58d').move(80, 300);
        titleContainer.radius(5);
        var title = radioButtons.text("Radio Buttons").fill('white').font('family', 'Menlo').move(170, 310);
        var numButtons = 2;
        var isChecked = new Array(numButtons).fill(false);
        isChecked[0] = true;
        var buttonArr = new Array(numButtons);
        var clickEvent = null
    
        return {
            /**
             * @param  {function} eventHandler - event handler that notifies the consuming code that the checkbox has been selected
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * @param  {number} num - number of radio buttons
             */
            setNumButtons: function(num) {
                numButtons = num;
                let i;
                let startY = 360;
                let containerHeight = container.height();
                for (i=0; i<numButtons; i++) {
                    var temp;
                    if (i == 0) {
                        // Default fill the first radio button
                        temp = radioButtons.circle(15).stroke({color: 'black'}).fill('#cb997e').move(100, startY).id(i);
                    }
                    else {
                        temp = radioButtons.circle(15).stroke({color: 'black'}).fill('none').move(100, startY).id(i);
                    }
                    startY += 50;
                    buttonArr[i] = temp;
                    containerHeight += 20;
                    container.height(containerHeight);
                }
                let j;
                for (j=0; j<numButtons; j++) {
                    buttonArr[j].click(function(event){
                        if(clickEvent != null) {
                            clickEvent(event);
                            let currChecked = isChecked.indexOf(true);  // Get the currently selected button
                            buttonArr[currChecked].fill('none');        // Unfill the currently selected button 
                            isChecked[currChecked] = false;         
                            this.fill({color: '#cb997e'});                // Fill the newly selected button
                            isChecked[this.node.id] = true;
                        }
                    })
                }
            },
            /**
             * @param  {array} labels - label for buttons (must be specified in order from top radio button to bottom radio button)
             */
            setButtonLabels: function(labels) {
                let ind;
                let startY = 360;
                for (ind=0; ind < numButtons; ind++) {
                    var temp = radioButtons.text(labels[ind]).fill('black').font('family', 'Menlo').move(140, startY);
                    startY += 50;
                }
            }
        }
    }

    return {
        Button,
        Checkbox,
        RadioButton
    }
}());

export{Toolkit}