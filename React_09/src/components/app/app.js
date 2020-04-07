import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharactersPage, BooksPage, HousesPage} from '../pages';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';

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
        const randomChar = showRandomChar ? <RandomChar/> : null;
        return (
            <> 
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
                    <CharactersPage gotService={this.gotService}/>
                    <BooksPage gotService={this.gotService}/>
                    <HousesPage gotService={this.gotService}/>
                </Container>
            </>
        );
    }
}