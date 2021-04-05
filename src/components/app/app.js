
import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import styled from 'styled-components';
import CharacterPage from '../characterPage';
import gotService from '../../services/gotServices';
import ItemList from '../itemList';
import CharDetails from '../charDetails';


const Button = styled.button`
    font-size: 1rem;
    background-color: blue;
    color: white;
    border: none;
    border-radius:5%;
    margin-bottom: 10px;
`;

export default class App extends Component {
    gotService = new gotService();
    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
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
                    <CharacterPage/>
                     <Row>
                        <Col md='6'>
                            <ItemList onItemSelected={this.onItemSelected}
                            getData ={this.gotService.getAllBooks}
                            renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList onItemSelected={this.onItemSelected}
                            getData ={this.gotService.getAllHouses}
                            renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
