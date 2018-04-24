/**
 * React Native Sudoku App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SudokuBoard from './SudokuBoard'

var NUMBERS = [
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
];

export default class SudokuApp extends Component {
    render() {
        return (
            <SudokuBoard board={NUMBERS} />
        );
    }
}
