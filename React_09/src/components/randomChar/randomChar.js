import React, {Component} from 'react';
import styled from 'styled-components';
import {ListGroup, ListGroupItem} from 'reactstrap';
import PropTypes from 'prop-types';

import Term from '../term';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
    img {
        width: 100%;
    }
`;

export default class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    };

    gotService = new GotService();

    updateCharacter = () => {
        const id = Math.floor(Math.random() * 140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }

    componentDidMount() {
        this.updateCharacter();
        const {interval} = this.props;
        this.timerId = setInterval(this.updateCharacter, interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !loading && !error ? <CharacterInfo char={char}/> : null;
        return (
            <RandomBlock>
                {errorMessage}
                {spinner}
                {content}
            </RandomBlock>
        );
    }
}

RandomChar.defaultProps = {
    interval: 15000
};

RandomChar.propTypes = {
    interval: PropTypes.number
};

const CharacterInfo = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>{`Random Character: ${name}`}</h4>
            <ListGroup flush>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Gender</Term>
                    <span>{gender}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Born</Term>
                    <span>{born}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Died</Term>
                    <span>{died}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Culture</Term>
                    <span>{culture}</span>
                </ListGroupItem>
            </ListGroup>
        </>
    );
};