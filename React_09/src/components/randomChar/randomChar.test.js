import React from 'react';
import RandomChar from './randomChar';
import {shallow} from 'enzyme';

describe('Testing <RandomChar/>', () => {
    const char = shallow(<RandomChar/>);
    describe('Testing snap & sstate', () => {
        it('RandomChar have rendered correctly', () => {
            expect(char).toMatchSnapshot();
        });
        it('RandomChar state "char" is empty object', () => {
            expect(char.state().char).toBeObject();
        });
        it('RandomChar state "loading" is true', () => {
            expect(char.state().loading).toBeTruthy();
        });
        it('RandomChar state "error" is true', () => {
            expect(char.state().error).toBeFalsy();
        });
    });
    describe('Testing handlers', () => {
        it('onCharLoaded', () => {
            char.instance().onCharLoaded();
            expect(char.state().loading).toBeFalsy();
        });
        it('onError', () => {
            char.instance().onError();
            expect(char.state().loading).toBeFalsy();
            expect(char.state().error).toBeTruthy();
        });
        it('updateCharacter', () => {
            char.instance().updateCharacter();
            expect(char.state().loading).toBeFalsy();
        });
    });
});