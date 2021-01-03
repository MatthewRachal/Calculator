import React, { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import styles from '../calculatorstyles.module.css';

export default class CalculatorClass extends Component {

    state = {
        Input: "",
        Operation: null,
        firstInput: "",
        secondInput: "",
        inputNumber: 1,
        clearInput: true,
       
        }


    setInput = (input) => {
        if(this.state.Operation === null) //If an Operation is selected at the very beginning
        {
            this.setState({Input: this.state.Input+input}, function() {
                this.setState({firstInput: this.state.Input});
            });
        }
        else if(this.state.operation !== null & this.state.inputNumber === 1)
        {
            this.setState({Input: ""}, function() {
                this.setState({Input: this.state.Input+input}, function() {   
                    this.setState({firstInput: this.state.Input});
                })
            })   
        }
        else if(this.state.Operation !== null && this.state.inputNumber === 2) //Otherwise, we will perform the calculation
        {
                this.setState({Input: "",}, function() {
                    this.setState({Input: this.state.Input+input}, function() {   
                        this.setState({secondInput: this.state.Input});
                    })
                })   
        }
    }

    setOperation = (operation) => {
        if(this.state.secondInput !== "")
        {
            this.calculate(operation);
        }
        else
        {
            this.setState({Operation: operation,}, function() {
                if(this.state.inputNumber === 1)
                {
                    this.setState({inputNumber: 2,})
                }
                else if(this.state.inputNumber === 2)
                {
                    this.calculate(this.state.Operation);
                }
            });
        }
    }
    
    clearInput = () => {
        this.setState({firstInput: "", secondInput: "", Operation: null, inputNumber: 1, Input: "",});
    }

    calculate = (calc) => {
        if(this.state.Operation === "Addition")
        {
            var calculation = parseFloat(this.state.firstInput) + parseFloat(this.state.secondInput);
            calculation = calculation.toString();
            this.setState({Input: calculation}, function() {
                if(this.state.inputNumber === 2)
                {
                    this.setState({firstInput: calculation, secondInput: "", inputNumber: 2, Operation: calc,});
                }
            });     
        }
        else if(this.state.Operation === "Subtraction")
        {
            var calculation = parseFloat(this.state.firstInput) - parseFloat(this.state.secondInput);
            calculation = calculation.toString();
            this.setState({Input: calculation}, function() {
                if(this.state.inputNumber === 2)
                {
                    this.setState({firstInput: calculation, secondInput: "", Operation: calc, inputNumber: 2});
                }
            });     
        }
        else if(this.state.Operation === "Multiplication")
        {
            var calculation = parseFloat(this.state.firstInput) * parseFloat(this.state.secondInput);
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
            var calculation = parseFloat(this.state.firstInput) / parseFloat(this.state.secondInput);
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
            <Container fluid>
              <Container fluid style={{borderStyle: "solid", height: "100%", minHeight: "600px", minWidth: "320px", width: "440px", backgroundColor: "#000000"}}>
                <h6>{this.state.Operation}</h6>
            <Row>
                <Col>
                    <h1 className={styles.calculatorEntry}>{this.state.Input}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={e => {e.preventDefault(); this.clearInput()}} className={styles.greyButton}>AC</button>
                    <button className={styles.greyButton}>+/-</button>
                    <button onClick={e => {e.preventDefault(); this.setOperation("Remainder")}} className={styles.greyButton}>%</button>
                    <button onClick={e => {e.preventDefault(); this.setOperation("Division")}} className={styles.orangeButton}>/</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={e => {e.preventDefault(); this.setInput(7)}} className={styles.blackButton}>7</button>
                    <button onClick={e => {e.preventDefault(); this.setInput(8)}} className={styles.blackButton}>8</button>
                    <button onClick={e => {e.preventDefault(); this.setInput(9)}} className={styles.blackButton}>9</button>
                    <button onClick={e => {e.preventDefault(); this.setOperation("Multiplication")}} className={styles.orangeButton}>X</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={e => {e.preventDefault(); this.setInput(4)}} className={styles.blackButton}>4</button>
                    <button onClick={e => {e.preventDefault(); this.setInput(5)}} className={styles.blackButton}>5</button>
                    <button onClick={e => {e.preventDefault(); this.setInput(6)} }className={styles.blackButton}>6</button>
                    <button onClick={e => {e.preventDefault(); this.setOperation("Subtraction")}}className={styles.orangeButton}>-</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={e => {e.preventDefault(); this.setInput(1)}} className={styles.blackButton}>1</button>
                    <button onClick={e => {e.preventDefault(); this.setInput(2)}} className={styles.blackButton}>2</button>
                    <button onClick={e => {e.preventDefault(); this.setInput(3)}} className={styles.blackButton}>3</button>
                    <button onClick={e => {e.preventDefault(); this.setOperation("Addition")}} className={styles.orangeButton}>+</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={e => {e.preventDefault(); this.setInput(0)}} className={styles.zeroButton}>0</button>
                    <button onClick={e => {e.preventDefault(); this.setInput(".")}} className={styles.blackButton}>.</button>
                    <button onClick={e => {e.preventDefault(); this.calculate("Equal")}} className={styles.orangeButton}>=</button>
                </Col>
            </Row>
            
        </Container>

            </Container>
        )
    }
}