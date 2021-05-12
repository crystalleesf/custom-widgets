import {SVG} from './svg.min.js';

var Toolkit = (function() {
    var draw = SVG().addTo('body').size('2000px','2000px');
    var Button = function() {
        var btn = draw.group()
        var rect = btn.rect(100,50).fill('#a5a58d').move(100,100);
        var btnLabel = btn.text("Button").fill('white').font('family', 'Menlo').move(110, 115);
        var clickEvent = null
        var mouseOverEvent = null

        rect.radius(10);
        rect.mouseover(function(event){
            this.fill({ color: '#cb997e'})
            if (mouseOverEvent != null) {
                mouseOverEvent(event);
            }
        });
        rect.mouseout(function(){
            this.fill({ color: '#a5a58d'})
        });
        rect.click(function(event){
            this.fill({ color: '#ddbea9'})
            if(clickEvent != null)
                clickEvent(event)
        });

        return {
            /**
             * @param  {number} x - initial x coordinate
             * @param  {number} y - initial y coordinate
             */
            setPosition: function(x,y) {
                btn.move(x,y);
            },
            /**
             * @param  {function} eventHandler - event handler that notifies consuming code that the button has been clicked
             */
            onClick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * @param  {function} eventHandler - event handler that notifies consuming code that mouse is hovering the button
             */
            onMouseOver: function(eventHandler) {
                mouseOverEvent = eventHandler
            },  
            /**
             * @param  {string} label - label for the button
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
        var mouseOverEvent = null
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
        });
        box.mouseover(function(event){
            if (mouseOverEvent != null) {
                mouseOverEvent(event);
            }
        });
        boxLabel.mouseover(function(event){
            if (mouseOverEvent != null) {
                mouseOverEvent(event);
            }
        });

        return {
            /**
             * @param  {number} x - initial x coordinate
             * @param  {number} y - initial y coordinate
             */
            setPosition: function(x,y) {
                checkbox.move(x,y);
            },
            /**
             * @param  {function} eventHandler - event handler that notifies the consuming code that the checkbox has been selected
             */
            onClick: function(eventHandler){
                clickEvent = eventHandler
                isClicked = !isClicked
            },
            /**
             * @param  {function} eventHandler - event handler that notifies consuming code that mouse is hovering the checkbox
             */
            onMouseOver: function(eventHandler) {
                mouseOverEvent = eventHandler
            }, 
            /**
             * @param  {string} label - label for the checkbox
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
        var numLabels = 2;
        var isChecked = new Array(numButtons).fill(false);
        isChecked[0] = true;
        var buttonArr = new Array(numButtons);
        var clickEvent = null;
        var hoverEvent = null;

        var startButtonX;
        var startLabelX;
        var startButtonY;
        var startLabelY;
   
        return {
            /**
             * @param  {number} x - initial x coordinate
             * @param  {number} y - initial y coordinate
             */
            setPosition: function(x,y) {
                radioButtons.move(x,y);
                startButtonX = x + 20;
                startLabelX = x + 60;
                startButtonY = y + 60;
                startLabelY = y + 60;
            },
            /**
             * @param  {function} eventHandler - event handler that notifies the consuming code that a radio button has been selected
             */
            onClick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * @param  {function} eventHandler - event handler that notifies the consuming code when a radio button is being hovered over
             */
            onHover: function(eventHandler) {
                hoverEvent = eventHandler;
            },
            /**
             * @param  {number} num - number of radio buttons
             * @param  {array} labels - labels for the radio buttons (ordered from top to bottom)
             */
            setButtons: function(num, labels) {
                let i,j,k;
                // let bound = (num <= labels.length) ? num : labels.length;
                let bound = Math.min(num, labels.length);
                let containerHeight = container.height();
                for (i=0; i<bound; i++) {
                    var temp;
                    if (i == 0) {
                        // Default fill the first radio button
                        temp = radioButtons.circle(15).stroke({color: 'black'}).fill('#cb997e').move(startButtonX, startButtonY).id(i);
                    }
                    else {
                        temp = radioButtons.circle(15).stroke({color: 'black'}).fill('none').move(startButtonX, startButtonY).id(i);
                    }
                    startButtonY += 50;
                    buttonArr[i] = temp;
                    containerHeight += 20;
                    container.height(containerHeight);
                }
                for (j=0; j<bound; j++) {
                    buttonArr[j].click(function(event){
                        if(clickEvent != null) {
                            clickEvent(event);
                            let currChecked = isChecked.indexOf(true);  // Get the currently selected button
                            buttonArr[currChecked].fill('none');        // Unfill the currently selected button 
                            isChecked[currChecked] = false;         
                            this.fill({color: '#cb997e'});                // Fill the newly selected button
                            isChecked[this.node.id] = true;
                            console.log("Radio Button " + (parseInt(this.node.id) + 1) + " has been clicked");
                        }
                    });
                    buttonArr[j].mouseover(function(event) {
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
        var box = textbox.rect(300,30).stroke({color: 'black'}).fill('none').move(600, 200);
        box.radius(5);
        var text = textbox.text("").font('family', 'Menlo').move(600,200);
        var textChange = null;

        var startX = 600;
        var caretX;
        var caret = textbox.rect(2,15).stroke({color: 'black'}).move(startX + 7,207);
        var runner = caret.animate().width(0);
        runner.loop(1000, 1, 0);

        
        SVG.on(window, 'keydown', (event) => {
            if (event.code == "Space") {
                event.preventDefault(); // Needed to prevent spacebar from triggering a page down
            }
        })

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
            caretX = startX + 7 + text.length();
            caret.x(caretX);
            if ((caretX - startX) > (box.width() - 8)) {
                box.width(box.width() + 20);
            }
            if (textChange != null) {
                textChange(event);
            }
        })
        
        return {
            /**
             * @param  {number} x - initial x coordinate
             * @param  {number} y - inital y coordinate
             */
            setPosition: function(x,y) {
                textbox.move(x,y);
                startX = x;
            },
            /**
             * @param  {string} defaultText - inital text in the textbox
             */
            setText: function(defaultText){
                text.text(defaultText);
                caretX = startX + text.length();
                caret.x(caretX);
            },
            /**
             * @param  {number} width - initial width of the textbox
             */
            setWidth: function(width) {
                box.width(width);
            },
            /**
             * @param  {function} eventHandler - event handler that notifies the consuming code that the checkbox has been selected
             */
            onTextChange: function(eventHandler) {
                textChange = eventHandler;
            }
        }
    }

    var ProgressBar = function() {
        var progressBar = draw.group()
        var outlineWidth = 300;
        var progressWidth = 0;
        var outline = progressBar.rect(300,12).stroke({color: 'black'}).fill('none').move(600, 300);
        var progress = progressBar.rect(0, 8).stroke({color: 'black'}).fill('#cb997e').move(602, 302);
        var incrementValue = 0;

        var minus = progressBar.text("-").font({'family': 'Menlo', 'size': 30}).move(600,320);
        var plus = progressBar.text("+").font({'family': 'Menlo', 'size': 30}).move(650,320);

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
            }
        });
        
        return {
            setPosition: function(x,y) {
                progressBar.move(x,y);
            },
            /**
             * @param  {number} width - width of the progress bar
             */
            setWidth: function(width) {
                outline.width(width);
                outlineWidth = width;
            },
            /**
             * @param  {number} val - initial value of the progress bar computed based on percentage (0-100)
             */
            setIncrementValue: function(val) {
                incrementValue = val;
                let currWidth = outline.width() - 4;
                progress.width(currWidth * (val/100));
            },
            /** Getter to access the current increment value */
            getIncrementValue: function() {
                return incrementValue;
            },
            /**
             * @param  {function} eventHandler - event handler that notifies the consuming code that the progress bar was incremented
             */
            onIncrement: function(eventHandler) {
                incrementEventHandler = eventHandler;
            },
            /**
             * @param  {function} eventHandler - event handler that notifies the consuming code that the progress bar was decremented
             */
            onDecrement: function(eventHandler) {
                decrementEventHandler = eventHandler;
            },
            /**
             * @param  {number} val
             */
            setIncrementDecrement: function(val) {
                increment = val;
            }
        }

    }

    var Tooltip = function() {
        var polygon = draw.polygon('50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40');
        polygon.fill('#f06').move(600, 520);

        var tooltip = draw.group().move(600,450);

        var startX = 600;
        var startY = 450;
        var tooltipWidth = 300;
        var tooltipHeight = 50;
        var balloon = tooltip.polyline([
            [startX, startY], 
            [startX+tooltipWidth, startY], 
            [startX+tooltipWidth, startY+tooltipHeight], 
            [startX+40, startY+tooltipHeight], 
            [startX+30, startY+tooltipHeight+10], 
            [startX+20, startY+tooltipHeight], 
            [startX, 500], 
            [startX, startY]
        ]).stroke('none').fill('none');
        
        var tooltipText = tooltip.text("This is a tooltip").fill('none').move(610,465);

        polygon.mouseover(function(event){
            tooltipText.fill({'color': 'black'});
            balloon.stroke({ color: '#a5a58d', width: 3 });
        });
        polygon.mouseout(function(){
            balloon.stroke('none');
            tooltipText.fill('none');
        });

        return {
            setPosition: function(x,y) {
                startX = x;
                startY = y;
                tooltip.move(startX, startY);
            },
            setText: function(text) {
                tooltipText.text(text);
            }
        }

    }

    return {
        Button,
        Checkbox,
        RadioButton,
        Textbox,
        ProgressBar,
        Tooltip
    }
}());

export{Toolkit}