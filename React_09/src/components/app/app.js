import React, {Component} from 'react';
import styled from 'styled-components';
import {Col, Row, Container, Button} from 'reactstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from '../header';
import RandomChar from '../randomChar';
import {CharactersPage, BooksPage, HousesPage, BooksItem} from '../pages';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
// import './app.css';

const AppView = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;

export default class App extends Component {
    state = {
        showRandomChar: true,
        error: false
    }

    gotService = new GotService();

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    onToggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            };
        });
    }

    render() {
        const {showRandomChar, error} = this.state;
        if (error) {
            return <ErrorMessage/>;
        }
        const randomChar = showRandomChar ? <RandomChar interval={60000}/> : null;
        return (
            <Router>
                <AppView> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {randomChar}
                                <Button 
                                    color="info"
                                    onClick={this.onToggleRandomChar}>
                                        Toogle random character
                                </Button>
                            </Col>
                        </Row>
                        <Route path="/characters" component={() => <CharactersPage gotService={this.gotService}/>}/>
                        <Route path="/houses" component={() => <HousesPage gotService={this.gotService}/>}/>
                        <Route path="/books" exact component={() => <BooksPage gotService={this.gotService}/>}/>
                        <Route path="/books/:id" render={
                            ({match}) => { 
                                const {id} = match.params;
                                return <BooksItem bookId={id} gotService={this.gotService}/>;
                            }
                        }/>
                    </Container>
                </AppView>
            </Router>
        );
    }
}