
import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import styled from 'styled-components';

const Button = styled.button`
    font-size: 1rem;
    background-color: blue;
    color: white;
    border: none;
    border-radius:5%;
    margin-bottom: 10px;
`;

export default class App extends Component {
    state = {
        showRandomChar: true,
        error: false
    }
    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }
    render () {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                    {char}
                        <Col lg={{size: 5, offset: 0}}>
                        </Col>
                    </Row>
                    
                    <Button onClick={this.toggleRandomChar}>Toggle random character</Button>
                    
{                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>}
                </Container>
            </>
        );
    }
}
