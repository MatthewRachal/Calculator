import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import styles from '../calculatorstyles.module.css';

function CalculatorHook() {

    var initialInput =  "";
    const [count, setInput] = useState(initialInput)

    var initialOperation = "mul";
    const [operation, setOperation] = useState(initialOperation)
  

    const Addition = (num1, num2) => {
        return num1 + num2;
    }
    const Substraction = (num1, num2) => {
        return num1 - num2;
    }
    const Multiplication = (num1, num2) => {
        return num1 * num2;
    }
    const Division = (num1, num2) => {
        return num1 / num2;
    }
    const Remainder = (num1, num2) => {
        return num1 % num2;
    }

    return (
        <Container fluid style={{borderStyle: "solid", height: "100%", minHeight: "600px", minWidth: "320px", width: "440px", backgroundColor: "#000000"}}>
                <h6>{operation}</h6>
            <Row>
                <Col>
                    <h1 className={styles.calculatorEntry}>{count}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={() => setInput(prevInput => "")} className={styles.greyButton}>AC</button>
                    <button onClick={() => setInput(setOperation => "Addition")} className={styles.greyButton}>+/-</button>
                    <button className={styles.greyButton}>%</button>
                    <button className={styles.orangeButton}>/</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={() => setInput(prevInput => prevInput + "7")} className={styles.blackButton}>7</button>
                    <button onClick={() => setInput(prevInput => prevInput + "8")} className={styles.blackButton}>8</button>
                    <button onClick={() => setInput(prevInput => prevInput + "9")} className={styles.blackButton}>9</button>
                    <button className={styles.orangeButton}>X</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={() => setInput(prevInput => prevInput + "4")} className={styles.blackButton}>4</button>
                    <button onClick={() => setInput(prevInput => prevInput + "5") }className={styles.blackButton}>5</button>
                    <button onClick={() => setInput(prevInput => prevInput + "6")} className={styles.blackButton}>6</button>
                    <button className={styles.orangeButton}>-</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={() => setInput(prevInput => prevInput + "1")} className={styles.blackButton}>1</button>
                    <button onClick={() => setInput(prevInput => prevInput + "2")} className={styles.blackButton}>2</button>
                    <button onClick={() => setInput(prevInput => prevInput + "3")} className={styles.blackButton}>3</button>
                    <button className={styles.orangeButton}>+</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={() => setInput(prevInput => prevInput + "0")} className={styles.zeroButton}>0</button>
                    <button onClick={() => setInput(prevInput => prevInput + ".")} className={styles.blackButton}>.</button>
                    <button className={styles.orangeButton}>=</button>
                </Col>
            </Row>
            
        </Container>


    )
}

export default CalculatorHook