import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import styled from 'styled-components';
import {characterPage, booksPage, housesPage, BooksItem} from '../pages';
import gotService from '../../services/gotServices';
import ItemList from '../itemList';
import ItemDetails from '../itemDetails';
import {BrowserRouter as Router, Route} from 'react-router-dom';



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
            <Router> 
                <div className='app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button 
                                className="toggle-btn"
                                onClick={this.toggleRandomChar}>Toggle random character</button>
                            </Col>
                        </Row>
                        <Route path='/' exact={true} component={() => <h1>Welcome to GOT DB</h1>} exact/>
                        <Route path='/characters' component={characterPage} />
                        <Route path='/books' exact component={booksPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;

                            return <BooksItem bookId={id}/>}
                        }/>
                        <Route path='/houses' component={housesPage} />
                    </Container>
                </div>
            </Router>
        );
    }
}