import React, {Component} from 'react';
import styled from 'styled-components';

import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import CharacterInfo from '../characterInfo';

const CharDetailsLayout = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const SelectError = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`;

export default class CharDetails extends Component {
    gotService = new GotService();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateCharacter();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateCharacter();
        }
    }

    componentDidCatch() {
        this.onError();
    }

    updateCharacter() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }
        this.gotService.getCharacter(charId)
            .then((char) => this.setState({
                char,
                loading: false
            }))
            .catch(this.onError);
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }

    render() {
        const {char, loading, error} = this.state;
        if (!char) {
            return <SelectError>Персонаж не выбран</SelectError>;
        }
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !loading && !error ? <CharacterInfo char={char}/> : null;
        return (
            <CharDetailsLayout className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </CharDetailsLayout>
        );
    }
}