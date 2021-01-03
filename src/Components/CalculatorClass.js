import React, { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import styles from '../calculatorstyles.module.css';

var hold = []; //holds Flash logic
var calculation; //Holds the calculation

export default class CalculatorClass extends Component {

    state = {
        Input: "",
        Operation: null,
        firstInput: "",
        secondInput: "",
        inputNumber: 1,
        disableEqual: false,
        highlightBlack: [false,false,false,false,false,false,false,false,false,false, false], // Change button style for numbers 0-9 and .
        highlightOrange: [false, false, false, false], //Change button style For operations starting with division at position 0
        highlightGrey: [false, false, false], //Change button Style for grey buttons starting with AC
        }

    setInput = (input) => {
        hold = this.state.highlightBlack;
        hold[input] = true;
        this.setState({highlightBlack: hold}, function() {
            setTimeout(() => {
                this.setState({highlightBlack: [false,false,false,false,false,false,false,false,false,false, false]});
              }, 350)
        })

        //Convert the array position for period back to its string form for placing into input
        if(input === "10")
        {
            input = ".";
        }

        if(this.state.Operation === null && this.state.Input.length < 9) //Input Numbers at a new Calculator Instance
        {
            if(input === "Negative" && this.state.Input.charAt(0) !== "-") //Insert a negative sign to the start
            {
                this.setState({Input: "-"+this.state.Input, highlightGrey: [false,true,false] }, function() {
                    this.setState({firstInput: this.state.Input});
                    setTimeout(() => {
                        this.setState({highlightGrey: [false,false,false]});
                      }, 350)
                });
            }
            else if(input === "Negative" && this.state.Input.charAt(0) === "-") //Remove the negative sign from input
            {
                this.setState({Input: this.state.Input.slice(1,this.state.Input.length), highlightGrey: [false,true,false]}, function() {
                    this.setState({firstInput: this.state.Input});
                    setTimeout(() => {
                        this.setState({highlightGrey: [false,false,false]});
                      }, 350)
                });
            }

            else if(this.state.Input.charAt(this.state.Input.length-1) === "." && input === ".") {} //User cannot enter a decimal place more than once
         
            else //Provide the total input plus the input of the latest button
            {
                this.setState({Input: this.state.Input+input}, function() {
                    this.setState({firstInput: this.state.Input});
                });
            }           
        }
        else if(this.state.inputNumber === 2 && this.state.secondInput.length < 9) //If the user is selecting the input for the second number
        {
            this.setState({highlightOrange: [false,false,false,false]});
            if(input === "Negative" && this.state.Input.charAt(0) !== "-") //add a negative sign to the second number
            {
                this.setState({Input: "-"+this.state.Input, highlightGrey: [false,true,false]}, function() {
                    this.setState({secondInput: this.state.Input});
                    setTimeout(() => {
                        this.setState({highlightGrey: [false,false,false]});
                      }, 350)
                });
            }
            else if(input === "Negative" && this.state.Input.charAt(0) === "-") //Remove the negative sign from the second number
            {
                this.setState({Input: this.state.Input.slice(1,this.state.Input.length), highlightGrey: [false,true,false]}, function() {
                    this.setState({secondInput: this.state.Input});
                    setTimeout(() => {
                        this.setState({highlightGrey: [false,false,false]});
                      }, 350)
                });
            }

            else if(this.state.secondInput.charAt(this.state.secondInput.length-1) === "." && input === ".") {} //User cannot enter a decimal place more than once


            else if(this.state.secondInput !== "") // place the input for the second number 
            {
                this.setState({Input: this.state.Input + input}, function() {
                    this.setState({secondInput: this.state.Input})
                })
            }
            else //Reset the input from the first number and put in the first letter for the second input
            {
                this.setState({Input: ""}, function() {
                    this.setState({Input: this.state.Input + input}, function() {
                        this.setState({secondInput: this.state.Input})
                    })
                })
            }
        }     
    }

    //Set the operation to be performed and highlight the button for that operaiton
    setOperation = (operation) => {

        //Performs the logic to highlight the current operation that is selected
        if(operation === "Addition")
        {
            this.setState({highlightOrange: [false,false,false,true]});
        }
        if(operation === "Subtraction")
        {
            this.setState({highlightOrange: [false,false,true,false]});
        }
        if(operation === "Multiplication")
        {
            this.setState({highlightOrange: [false,true,false,false]});
        }
        if(operation === "Division")
        {
            this.setState({highlightOrange: [true,false,false,false]});
        }
        if(operation === "Remainder")
        {
            this.setState({highlightGrey: [false,false,true]}, function() {
                setTimeout(() => {
                    this.setState({highlightGrey: [false,false,false]});
                  }, 350)
            });
        }
        

        //Prevent the user from pressing the equal sign multiple times
        if(this.state.firstInput !== "")
        {
            this.setState({Operation: operation, disableEqual: false});
        
            if(this.state.inputNumber === 1 && operation !== null)
            {
                this.setState({inputNumber: 2, disableEqual: false});
            }
            else if(operation !== null && this.state.secondInput !== "")
            {
                this.calculate();
            }
        }  
    }
    //Clears the input on selection of AC: reset all state inputs and have the AC button flash
    clearInput = () => {
        this.setState({firstInput: "", secondInput: "", Operation: null, inputNumber: 1, Input: "", highlightOrange: [false,false,false,false]});
        this.setState({highlightGrey: [true,false,false]}, function() {
            setTimeout(() => {
                this.setState({highlightGrey: [false,false,false]});
              }, 350)
        })
    }

    //Performs the calculation from the calculator inputs
    calculate = (count) => {

            this.setState({disableEqual: count})

            //Conver the string inputs to a number and run the operation
            //Then convert it back to a string and write it to state. Then change the state to allow for multiple
            //operations to be chained to that operations result
            if(this.state.Operation === "Addition") 
            {
                calculation = parseFloat(this.state.firstInput) + parseFloat(this.state.secondInput);
                calculation = calculation.toString();
                this.setState({Input: calculation}, function() {
                    if(this.state.inputNumber === 2)
                    {
                        this.setState({firstInput: calculation, secondInput: "", inputNumber: 2,});
                    }
                });     
            }
            else if(this.state.Operation === "Subtraction")
            {
                calculation = parseFloat(this.state.firstInput) - parseFloat(this.state.secondInput);
                calculation = calculation.toString();
                this.setState({Input: calculation}, function() {
                    if(this.state.inputNumber === 2)
                    {
                        this.setState({firstInput: calculation, secondInput: "", inputNumber: 2});
                    }
                });     
            }
            else if(this.state.Operation === "Multiplication")
            {
                calculation = parseFloat(this.state.firstInput) * parseFloat(this.state.secondInput);
                calculation = calculation.toString();
                this.setState({Input: calculation}, function() {
                    if(this.state.inputNumber === 2)
                    {
                        this.setState({firstInput: calculation, secondInput: "", inputNumber: 2});
                    }
                });     
            }
            else if(this.state.Operation === "Division")
            {
                calculation = parseFloat(this.state.firstInput) / parseFloat(this.state.secondInput);
                calculation = calculation.toString()
                this.setState({Input: calculation}, function() {
                    if(this.state.inputNumber === 2)
                    {
                        this.setState({firstInput: calculation, secondInput: "", inputNumber: 2});
                    }
                });     
            }
            else if(this.state.Operation === "Remainder")
            {
                calculation = parseFloat(this.state.firstInput) % parseFloat(this.state.secondInput);
                calculation = calculation.toString();
                this.setState({Input: calculation}, function() {
                    if(this.state.inputNumber === 2)
                    {
                        this.setState({firstInput: calculation, secondInput: "", inputNumber: 2});
                    }
                });     
            }  
    }

    render() {

        return (
            <Container fluid className={styles.calculatorContainer}>
                <Row>
                    <Col>
                        <h1 className={styles.calculatorEntry}>{this.state.Input}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={e => {e.preventDefault(); this.clearInput()}} className={this.state.highlightGrey[0] ? styles.greyButtonFlash : styles.greyButton}>AC</button>
                        <button onClick={e => {e.preventDefault(); this.setInput("Negative")}} className={this.state.highlightGrey[1] ? styles.greyButtonFlash : styles.greyButton}>+/-</button>
                        <button onClick={e => {e.preventDefault(); this.setOperation("Remainder")}} className={this.state.highlightGrey[2] ? styles.greyButtonFlash : styles.greyButton}>%</button>
                        <button onClick={e => {e.preventDefault(); this.setOperation("Division")}} className={this.state.highlightOrange[0] ? styles.highlightOrangeButton : styles.orangeButton}>/</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={e => {e.preventDefault(); this.setInput(7)}} className={this.state.highlightBlack[7] ? styles.greyButton : styles.blackButton}>7</button>
                        <button onClick={e => {e.preventDefault(); this.setInput(8)}} className={this.state.highlightBlack[8] ? styles.greyButton : styles.blackButton}>8</button>
                        <button onClick={e => {e.preventDefault(); this.setInput(9)}} className={this.state.highlightBlack[9] ? styles.greyButton : styles.blackButton}>9</button>
                        <button onClick={e => {e.preventDefault(); this.setOperation("Multiplication")}} className={this.state.highlightOrange[1] ? styles.highlightOrangeButton : styles.orangeButton}>X</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={e => {e.preventDefault(); this.setInput(4)}} className={this.state.highlightBlack[4] ? styles.greyButton : styles.blackButton}>4</button>
                        <button onClick={e => {e.preventDefault(); this.setInput(5)}} className={this.state.highlightBlack[5] ? styles.greyButton : styles.blackButton}>5</button>
                        <button onClick={e => {e.preventDefault(); this.setInput(6)} }className={this.state.highlightBlack[6] ? styles.greyButton : styles.blackButton}>6</button>
                        <button onClick={e => {e.preventDefault(); this.setOperation("Subtraction")}}className={this.state.highlightOrange[2] ? styles.highlightOrangeButton : styles.orangeButton}>-</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={e => {e.preventDefault(); this.setInput(1)}} className={this.state.highlightBlack[1] ? styles.greyButton : styles.blackButton}>1</button>
                        <button onClick={e => {e.preventDefault(); this.setInput(2)}} className={this.state.highlightBlack[2] ? styles.greyButton : styles.blackButton}>2</button>
                        <button onClick={e => {e.preventDefault(); this.setInput(3)}} className={this.state.highlightBlack[3] ? styles.greyButton : styles.blackButton}>3</button>
                        <button onClick={e => {e.preventDefault(); this.setOperation("Addition")}} className={this.state.highlightOrange[3] ? styles.highlightOrangeButton : styles.orangeButton}>+</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={e => {e.preventDefault(); this.setInput(0)}} className={this.state.highlightBlack[0] ? styles.zeroButtonFlash : styles.zeroButton}>0</button>
                        <button onClick={e => {e.preventDefault(); this.setInput("10")}} className={this.state.highlightBlack[10] ? styles.greyButton : styles.blackButton}>.</button>
                        <button disabled={this.state.disableEqual} onClick={e => {e.preventDefault(); this.calculate(true)}} className={styles.orangeButton}>=</button>
                    </Col>
                </Row>
            </Container>
        )
    }
}