import {SVG} from './svg.min.js';

var Toolkit = (function() {
    var draw = SVG().addTo('body').size('1300px','1000px');
    var Button = function() {
        var btn = draw.group()
        var rect = btn.rect(100,50).fill('#6b705c').move(100,100);
        var btnLabel = btn.text("Button").fill('white').font('family', 'Menlo').move(110, 115);
        var clickEvent = null
        var mouseOverEvent = null

        rect.radius(10);
        rect.mouseover(function(event){
            this.fill({ color: '#cb997e'})
            if (mouseOverEvent != null) {
                mouseOverEvent(event);
                console.log("Hovering over button");
            }
        });
        btnLabel.mouseover(function(event){
            rect.fill({ color: '#cb997e'})
            if (mouseOverEvent != null) {
                mouseOverEvent(event);
                console.log("Hovering over button");
            }
        });
        rect.mouseout(function(){
            this.fill({ color: '#6b705c'});
        });
        btnLabel.mouseout(function(){
            rect.fill({ color: '#6b705c'});
        });
        rect.click(function(event){
            this.fill({ color: '#ddbea9'});
            if(clickEvent != null) {
                clickEvent(event);
                console.log("Button has been clicked");
            }
        });
        btnLabel.click(function(event){
            rect.fill({ color: '#ddbea9'})
            if(clickEvent != null) {
                clickEvent(event);
                console.log("Button has been clicked");
            }
        });

        return {
            /**
             * Sets the position of the button
             * @param  {number} x - x coordinate
             * @param  {number} y - y coordinate
             */
            setBtnPosition: function(x,y) {
                btn.move(x,y);
            },
            /**
             * Sets the label for the button
             * @param  {string} val - label
             */
             setBtnLabel: function(val) {
                btnLabel.text(val);
            },
            /**
             * Sets the width of the button
             * @param  {number} val - width (in pixels)
             */
            setBtnWidth: function(val) {
                rect.width(val);
            },
            /**
             * Exposes an event handler that notifies the consuming code when the button is clicked
             * @param  {function} eventHandler - click event handler
             */
            onBtnClick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * Exposes an event handler that notifies the consuming code when the button is clicked
             * @param  {function} eventHandler - hover event handler
             */
            onBtnMouseOver: function(eventHandler) {
                mouseOverEvent = eventHandler
            }
        }
    }

    var Checkbox = function() {
        var checkbox = draw.group();
        var box = checkbox.rect(20,20).stroke({width: 1.5, color: 'black'}).fill('white').move(100, 200);
        box.radius(2);
        var check = checkbox.text('\u2713').fill('none').font({family: 'Menlo', size: 25}).move(103, 195); 
        
        var boxLabel = checkbox.text("This is a checkbox").fill('black').font('family', 'Menlo').move(140, 200);
        var clickEvent = null
        var mouseOverEvent = null
        var isClicked = false
        var status

        box.click(function(event){
            if (isClicked == true) {
                this.fill({color: 'white'}).stroke({color: 'black'});
                check.fill('white');
            }
            else {
                this.fill({color: '#cb997e'}).stroke({color: '#cb997e'});
                check.fill('white');
            }
            isClicked = !isClicked;
            if(clickEvent != null) {
                console.log("Checkbox has been clicked");
                clickEvent(event);
            }
        });
        check.click(function(event){
            if (isClicked == true) {
                box.fill({color: 'white'}).stroke({color: 'black'});
                this.fill('white');
            }
            else {
                box.fill({color: '#cb997e'}).stroke({color: '#cb997e'});
                this.fill('white');
            }
            isClicked = !isClicked;
            if(clickEvent != null) {
                console.log("Checkbox has been clicked");
                clickEvent(event);
            }
        });

        box.mouseover(function(event){
            if (mouseOverEvent != null) {
                mouseOverEvent(event);
                console.log("Hovering over checkbox");
            }
        });
        boxLabel.mouseover(function(event){
            if (mouseOverEvent != null) {
                mouseOverEvent(event);
                console.log("Hovering over checkbox");
            }
        });

        return {
            /**
             * Sets the position of the checkbox
             * @param  {number} x - x coordinate
             * @param  {number} y - y coordinate
             */
            setCheckboxPosition: function(x,y) {
                checkbox.move(x,y);
            },
            /**
             * Sets the label for the checkbox
             * @param  {string} val - label for the checkbox
             */
            setCheckboxLabel: function(val) {
                boxLabel.text(val);
            },
            /**
             * Getter that returns the status of the checkbox
             * @returns {boolean} true for checked, false for not checked
             */
            getCheckboxStatus: function() {
                return isClicked;
            },
            /**
             * Exposes an event handler that notifies the consuming code when the checkbox is clicked
             * @param  {function} eventHandler - click event handler
             */
            onCheckboxClick: function(eventHandler){
                clickEvent = eventHandler;
            },
            /**
             * Exposes an event handler that notifies the consuming code when the checkbox is hovered
             * @param  {function} eventHandler - hover event handler
             */
            onCheckboxMouseOver: function(eventHandler) {
                mouseOverEvent = eventHandler
            }
        }
    }

    var RadioButton = function() {
        var radioButtons = draw.group();
        var container = radioButtons.rect(300,200).stroke({width: 1.5, color: 'black'}).fill('white').move(80, 300);
        container.radius(5);
        var titleContainer = radioButtons.rect(300,35).stroke({width: 1.5, color: 'black'}).fill('#6b705c').move(80, 300);
        titleContainer.radius(5);
        var title = radioButtons.text("Radio Buttons").fill('white').font('family', 'Menlo').move(170, 310);
        var numButtons = 2;
        var numLabels = 2;
        var isChecked = new Array(numButtons).fill(false);
        isChecked[0] = true;
        var buttonArr = new Array(numButtons);
        var innerArr = new Array(numButtons);
        var clickEvent = null;
        var hoverEvent = null;

        var startButtonX;
        var startLabelX;
        var startButtonY;
        var startLabelY;
   
        return {
            /**
             * Sets the position of the radio buttons
             * @param  {number} x - x coordinate
             * @param  {number} y - y coordinate
             */
            setRadioPosition: function(x,y) {
                radioButtons.move(x,y);
                startButtonX = x + 20;
                startLabelX = x + 60;
                startButtonY = y + 60;
                startLabelY = y + 60;
            },
            /**
             * Sets the title of the container
             * @param  {string} val - container title
             */
            setRadioButtonsContainerTitle: function(val) {
                title.text(val);
            },
            /**
             * Sets the position of the container title
             * @param  {number} x - x coordinate
             * @param  {number} y - y coordinate
             */
            setRadioButtonsContainerTitlePosition: function(x, y) {
                title.move(x,y);
            },
            /**
             * Exposes an event handler that notifies the consuming code when a radio button is clicked
             * @param  {function} eventHandler - click event handler
             */
            onRadioClick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * Exposes an event handler that notifies the consuming code when a radio button is hovered over
             * @param  {function} eventHandler - hover event handler
             */
            onRadioHover: function(eventHandler) {
                hoverEvent = eventHandler;
            },
            /**
             * Sets the number of buttons and the corresponding labels
             * @param  {number} num - number of radio buttons
             * @param  {array} labels - labels for the radio buttons (ordered from top to bottom)
             */
            setRadioButtons: function(num, labels) {
                let i,j,k;
                let bound = Math.min(num, labels.length);
                let containerHeight = container.height();
                for (i=0; i<bound; i++) {
                    var temp;
                    var inner;
                    if (i == 0) {
                        // Default fill the first radio button
                        temp = radioButtons.circle(20).stroke({width: 1.5, color: '#cb997e'}).fill('white').move(startButtonX, startButtonY).id(i);
                        inner = radioButtons.circle(12).stroke('#cb997e').fill('#cb997e').move(startButtonX + 4, startButtonY + 4).id(i);
                    }
                    else {
                        temp = radioButtons.circle(20).stroke({width: 1.5, color: 'black'}).fill('white').move(startButtonX, startButtonY).id(i);
                        inner = radioButtons.circle(12).stroke('white').fill('white').move(startButtonX + 4, startButtonY + 4).id(i);
                    }
                    startButtonY += 50;
                    buttonArr[i] = temp;
                    innerArr[i] = inner;
                    containerHeight += 20;
                    container.height(containerHeight);
                }
                for (j=0; j<bound; j++) {
                    innerArr[j].click(function(event){
                        if(clickEvent != null) {
                            clickEvent(event);
                            let currChecked = isChecked.indexOf(true);  // Get the currently selected button
                            buttonArr[currChecked].stroke('black').fill('white');        // Unfill the currently selected button 
                            innerArr[currChecked].stroke('white').fill('white');   
                            isChecked[currChecked] = false;         
                            this.fill('#cb997e').stroke('#cb997e');                // Fill the newly selected button
                            buttonArr[this.node.id].stroke('#cb997e');
                            isChecked[this.node.id] = true;
                            console.log("Radio Button " + (parseInt(this.node.id) + 1) + " has been clicked");
                        }
                    });
                    innerArr[j].mouseover(function(event) {
                        if(hoverEvent != null) {
                            console.log("Hovering over Radio Button " + (parseInt(this.node.id) + 1));
                            hoverEvent(event);
                        }
                    });
                }
                for (k=0; k < bound; k++) {
                    var temp = radioButtons.text(labels[k]).fill('black').font('family', 'Menlo').move(startLabelX, startLabelY);
                    buttonArr[k].attr('label', labels[k]);
                    startLabelY += 50;
                }
            },
        }
    }

    var Textbox = function() {
        var textbox = draw.group();
        var box = textbox.rect(300,30).stroke({width: 1.5, color: 'black'}).fill('white').move(600, 200);
        box.radius(5);
        var text = textbox.text("").font('family', 'Menlo').move(603,200);
        var textChange = null;

        var startX = 600;
        var caretX;
        var caret = textbox.rect(2,15).stroke({color: 'black'}).move(startX + text.length() + 3, 207);
        var runner = caret.animate().width(0);
        runner.loop(1000, 1, 0);

        var hoverEvent = null;
        box.mouseover(function(e) {
            if (hoverEvent != null) {
                hoverEvent(e);
                console.log("Hovering over textbox");
            }
        });

        
        SVG.on(window, 'keydown', (event) => {
            if (event.code == "Space") {
                event.preventDefault(); // Needed to prevent spacebar from triggering a page down
            }
        });

        SVG.on(window, 'keyup', (event, eventTwo) => {
            if (event.code == "Backspace") {
                let newText = text.text().slice(0,-1);
                text.text(newText);
            }
            else if (event.code == "Space") {
                let spaceText = '\xa0';
                text.text(text.text() + spaceText);
            }
            else if (event.code == "ShiftLeft" || event.code == "ShiftRight" || event.code == "Enter") {
                // Don't print "Shift"
                // Don't do anything for Enter
            }
            else {
                text.text(text.text() + event.key); 
            }
            caretX = startX + text.length() + 3;
            caret.x(caretX);
            if ((caretX - startX) > (box.width() - 8)) {
                box.width(box.width() + 20);
            }
            if (textChange != null) {
                textChange(event);
                console.log("The text has changed in the textbox");
            }
        });
        
        return {
            /**
             * Sets the position of the textbox
             * @param  {number} x - x coordinate
             * @param  {number} y - y coordinate
             */
            setTextboxPosition: function(x,y) {
                textbox.move(x,y);
                startX = x;
            },
            /**
             * Sets the inital text in the texbox
             * @param  {string} defaultText - text
             */
            setTextboxText: function(defaultText){
                text.text(defaultText);
                caretX = startX + text.length() + 3;
                caret.x(caretX);
            },
            /**
             * Sets the width of the textbox
             * @param  {number} val - width
             */
            setTextboxWidth: function(val) {
                box.width(val);
            },
            /**
             * Exposes an event handler that notifies the consuming code when the text in the textbox has changed
             * @param  {function} eventHandler - text change event handler
             */
            onTextboxTextChange: function(eventHandler) {
                textChange = eventHandler;
            },
            /**
             * Exposes an event handler that notifies the consuming code when the textbox is hovered
             * @param  {function} eventHandler - hover event handler
             */
            onTextboxHover: function(eventHandler) {
                hoverEvent = eventHandler;
            }
        }
    }

    var Scrollbar = function() {
        var scrollbar = draw.group();
        var startX = 100;
        var startY = 700;
        var scrollHeight = 300;
        var outline = scrollbar.rect(20,300).stroke({color: 'black', width: 1.5}).fill('none').move(100, 700);
        outline.radius(8);
        var inner = scrollbar.rect(14,100).stroke('none').fill('#6b705c').move(103, 720);
        inner.radius(8);
        var scrollEvent = null;
        var hoverEvent = null;
        var mousedownEvent = null;
        var mouseupEvent = null;

        var up = scrollbar.polyline([
            [startX + 10, startY + 5], 
            [startX + 15, startY + 15], 
            [startX + 5, startY + 15], 
            [startX + 10, startY + 5]
        ]).stroke('black').fill('black'); 
        up.click(function(event) {
            let newYPos = inner.y() - 5;
            if (newYPos >= (outline.y() + 20)) {
                inner.move(inner.x(), inner.y()-5);
                console.log("Scrollbar moving up");
            }
        });
        var down;
    
        var move = false;
        inner.mousedown(function(event){
            console.log("Scrollbar activated");
            if (mousedownEvent != null) {
                mousedownEvent(event);
            }
            move = true;
            inner.fill('#cb997e');
        });
        inner.mouseup(function(event){
            console.log("Scrollbar deactivated");
            if (mouseupEvent != null) {
                mouseupEvent(event);
            }
            move = false;
            inner.fill('#6b705c');
        });
        inner.mouseout(function(event) {
            console.log("Scrollbar deactivated");
            move = false;
            inner.fill('#6b705c');
        });
        outline.mouseout(function(event) {
            console.log("Scrollbar deactivated");
            move = false;
            inner.fill('#6b705c');
        });
        outline.mouseup(function(event) {
            console.log("Scrollbar deactivated");
            move = false;
            inner.fill('#6b705c');
        });
        outline.mouseover(function(event) {
            console.log("Hovering over scrollbar");
            if (hoverEvent != null) {
                hoverEvent(event);
            }
        })
        var prevY = 0;
        inner.mousemove(function(event) {
            let newYPos;
            if (move == true) {
                if (event.clientY > prevY) {
                    if (scrollEvent != null) {
                        scrollEvent(event);
                        console.log("Scrollbar moving down");
                    }
                    prevY = event.clientY;
                    newYPos = inner.y() + 2;
                    if (newYPos + inner.height() <= ((outline.y() + outline.height()) - 20)) {
                        inner.dy(2);
                    }
                }
                else if (event.clientY < prevY) {
                    if (scrollEvent != null) {
                        scrollEvent(event);
                        console.log("Scrollbar moving up");
                    }
                    prevY = event.clientY;
                    let newYPos = inner.y() - 2;
                    if (newYPos >= (outline.y() + 20)) {
                        inner.dy(-2);
                    }
                }
                inner.fill('#cb997e');
            }
        });
        return {
            /**
             * Sets the position of the scrollbar
             * @param  {number} x - x coordinate
             * @param  {number} y - y coordinate
             */
            setScrollbarPosition: function(x,y) {
                scrollbar.move(x,y);
                startX = x;
                startY = y;
            },
            /**
             * Sets the height of the scrollbar
             * @param  {number} val - height
             */
            setScrollbarHeight: function(val) {
                outline.height(val);
                scrollHeight = val;
                down = scrollbar.polyline([ 
                    [startX + 5, startY + scrollHeight - 15], 
                    [startX + 15, startY + scrollHeight - 15], 
                    [startX + 10, startY + scrollHeight - 5],
                    [startX + 5, startY + scrollHeight - 15],
                ]).stroke('black').fill('black');
                down.click(function(event) {
                    let newYPos = inner.y() + 5;
                    if (newYPos + inner.height() <= ((outline.y() + outline.height()) - 20)) {
                        inner.move(inner.x(), inner.y()+5);
                        console.log("Scrollbar moving down");
                    }
                });
            },
            /**
             * Gets the current x and y positions of the scrollbar
             * @returns {Number[]} Array of the scrollbar's current coordinates
             */
            getThumbPosition() {
                return [inner.x(), inner.y()]
            },
            /**
             * Exposes an event handler that notifies the consuming code when the scrollbar is moving
             * @param  {function} eventHandler - scroll event handler
             */
            onScroll(eventHandler) {
                scrollEvent = eventHandler;
            },
            /**
             * Exposes an event handler that notifies the consuming code when the scrollbar is hovered over
             * @param  {function} eventHandler - hover event handler
             */
            onScrollbarHover: function(eventHandler) {
                hoverEvent = eventHandler;
            },
            /**
             * Exposes an event handler that notifies the consuming code when the scrollbar is activated
             * @param  {function} eventHandler - mousedown event handler
             */
            onScrollbarMouseDown: function(eventHandler) {
                mousedownEvent = eventHandler;
            },
            /**
             * Exposes an event handler that notifies the consuming code when the scrollbar is released
             * @param  {function} eventHandler - mouseup event handler
             */
            onScrollbarMouseUp: function(eventHandler) {
                mouseupEvent = eventHandler;
            }
        }
    }

    var ProgressBar = function() {
        var progressBar = draw.group()
        var outlineWidth = 300;
        var progressWidth = 0;
        var outline = progressBar.rect(300,16).stroke({color: 'black', width: 1.5}).fill('none').move(600, 300);
        outline.radius(8);
        var progress = progressBar.rect(0, 10).stroke({color: 'black'}).fill('#6b705c').move(602, 303);
        progress.radius(8);
        var incrementValue = 0;

        var minus = progressBar.text("-").font({'family': 'Menlo', 'size': 30}).move(600,320);
        var plus = progressBar.text("+").font({'family': 'Menlo', 'size': 30}).move(650,320);

        var hoverEvent = null;
        outline.mouseover(function(e) {
            if (hoverEvent != null) {
                hoverEvent(e);
                console.log("Hovering over progress bar");
            }
        });

        var incrementEventHandler = null;
        var decrementEventHandler = null;
        var increment = 10;
        plus.click(function(event){
            let newWidth = progress.width() + increment
            if (outlineWidth - newWidth <= 5) {
                progress.width(outlineWidth - 4);
            }
            else {
                progress.width(newWidth);
            }
            if (incrementEventHandler != null) {
                incrementEventHandler(event);
                console.log("The progress bar has been incremented");
            }
        });

        minus.click(function(event) {
            let newWidth = progress.width() - increment
            if (newWidth <= 0) {
                progress.width(0);
            }
            else {
                progress.width(newWidth);
            }
            if (decrementEventHandler != null) {
                decrementEventHandler(event);
                console.log("The progress bar has been decremented");
            }
        });
        
        return {
            /**
             * Sets the position of the progress bar
             * @param  {number} x - x coordinate
             * @param  {number} y - y coordinate
             */
            setProgressBarPosition: function(x,y) {
                progressBar.move(x,y);
            },
            /**
             * Sets the width of the progress bar
             * @param  {number} val - width
             */
            setProgressBarWidth: function(val) {
                outline.width(val);
                outlineWidth = val;
            },
            /**
             * Sets the progress bar's initial value
             * @param  {number} val - number between 0 - 100 (based on percentage)
             */
            setIncrementValue: function(val) {
                incrementValue = val;
                let currWidth = outline.width() - 4;
                progress.width(currWidth * (val/100));
            },
            /**
             * Gets the progress bar's current value
             * @returns {number} progress bar's current value
             */
            getIncrementValue: function() {
                return incrementValue;
            },
            /**
             * Exposes an event handler that notifies the consuming code when the progress bar's value is incremented
             * @param  {function} eventHandler - increment event handler
             */
            onIncrement: function(eventHandler) {
                incrementEventHandler = eventHandler;
            },
            /**
             * Exposes an event handler that notifies the consuming code when the progress bar's value is decremented
             * @param  {function} eventHandler - decrement event handler
             */
            onDecrement: function(eventHandler) {
                decrementEventHandler = eventHandler;
            },
            /**
             * Sets the value to increment/decrement the progress bar when the buttons are clicked
             * @param  {number} val
             */
            setIncrementDecrement: function(val) {
                increment = val;
            },
            /**
             * Exposes an event handler that notifies the consuming code when the progress bar is hoverd
             * @param  {function} eventHandler - hover event handler
             */
            onProgressBarMouseOver: function(eventHandler) {
                hoverEvent = eventHandler;
            }
        }

    }

    var ToggleSwitch = function() {
        var toggleSwitch = draw.group();
        var outline = toggleSwitch.rect(70,30).stroke('none').fill('#adb5bd').move(800, 500);
        outline.radius(15);
        var circleLeft = toggleSwitch.circle(24,24).stroke('none').fill('white').move(805, 503);
        var circleRight = toggleSwitch.circle(24,24).stroke('none').fill('none').move(841, 503);

        var hoverEvent = null;
        var clickEvent = null;

        toggleSwitch.mouseover(function(event) {
            if (hoverEvent != null) {
                hoverEvent(event);
                console.log("Hovering over toggle switch");
            }
        });

        var toggleOn = false

        circleLeft.click(function(event) {
            if (toggleOn == false) {
                circleLeft.stroke('none').fill('#6b705c');
                circleRight.stroke('none').fill('white');
                outline.fill('#6b705c');
                toggleOn = true;
            }
            else {
                circleLeft.stroke('none').fill('white');
                circleRight.stroke('none').fill('#adb5bd');
                outline.stroke('none').fill('#adb5bd');
                toggleOn = false;
            }
            if (clickEvent != null) {
                clickEvent(event);
            }
        });
        circleRight.click(function(event) {
            if (toggleOn == true) {
                circleLeft.stroke('none').fill('white');
                circleRight.stroke('none').fill('#adb5bd');
                outline.stroke('none').fill('#adb5bd');
                toggleOn = false;
            }
            else {
                circleLeft.stroke('none').fill('#6b705c');
                circleRight.stroke('none').fill('white');
                outline.fill('#6b705c');
                toggleOn = true;
            }
            if (clickEvent != null) {
                clickEvent(event);
            }
        });
        
        return {
            /**
             * Sets the position of the widget
             * @param  {number} x - x coordinate
             * @param  {number} y - y coordinate
             */
            setTogglePosition: function(x,y) {
                toggleSwitch.move(x,y);
            },
            /**
             * Exposes an event handler that notifies the consuming code when the toggle switch is hovered over
             * @param  {function} eventHandler - hover event handler
             */
            onToggleHover: function(eventHandler) {
                hoverEvent = eventHandler;
            },
            /**
             * Exposes an event handler that notifies the consuming code when the toggle switch is clicked
             * @param  {function} eventHandler - click event handler
             */
            onToggleClick: function(eventHandler) {
                clickEvent = eventHandler;
            },
            /**
             * Gets the current activation/deactivation status of the toggle switch
             * @returns {boolean} true indicates that toggle is activated; false indicates that toggle is deactivated
             */
            getToggleStatus: function() {
                return toggleOn;
            }
        }

    }

    return {
        Button,
        Checkbox,
        RadioButton,
        Textbox,
        Scrollbar,
        ProgressBar, 
        ToggleSwitch
    }
}());

export{Toolkit}