// __tests__/sudoku-test.js
import React from 'react';
import SudokuBoard from '../src/SudokuBoard';
import {
    getRowValues,
    getColumnValues,
    getSquareValues,
    getPossibleCellValues,
    solvePuzzle
} from '../src/SudokuLogic';

import renderer from 'react-test-renderer';

// Board must match first sample or else test will fail
var sampleBoard = [
    0, 0, 5, 0, 0, 0, 0, 0, 7,
    0, 0, 0, 0, 0, 9, 0, 0, 5,
    9, 0, 0, 5, 0, 6, 0, 0, 0,
    0, 0, 4, 0, 0, 8, 0, 0, 0,
    0, 0, 7, 0, 9, 0, 2, 4, 0,
    1, 8, 0, 0, 0, 0, 3, 0, 0,
    6, 0, 0, 0, 3, 1, 4, 0, 0,
    3, 0, 0, 2, 0, 0, 0, 0, 0,
    4, 0, 2, 7, 0, 0, 0, 0, 3
];

test('renders correctly', () => {
    const tree = renderer.create(<SudokuBoard board={sampleBoard} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('getRowValues (5,1)', () => {
    const expected = [9, 5];
    const result = getRowValues(sampleBoard, 5, 1);
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
});

test('getRowValues (4,4)', () => {
    const expected = [7, 9, 2, 4];
    const result = getRowValues(sampleBoard, 4, 4);
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
});

test('getColumnValues (5,1)', () => {
    const expected = [9, 6, 8, 1];
    const result = getColumnValues(sampleBoard, 5, 1);
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
});

test('getColumnValues (0,5)', () => {
    const expected = [9, 1, 6, 3, 4];
    const result = getColumnValues(sampleBoard, 0, 5);
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
});

test('getSquareValues (5,1)', () => {
    const expected = [5, 9, 6];
    const result = getSquareValues(sampleBoard, 5, 1);
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
});

test('getSquareValues (0,5)', () => {
    const expected = [1, 8, 4, 7];
    const result = getSquareValues(sampleBoard, 0, 5);
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
});

test('getPossibleCellValues (5,1)', () => {
    const expected = [2, 3, 4, 7];
    const result = getPossibleCellValues(sampleBoard, 5, 1);
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
});

test('getPossibleCellValues (3,6)', () => {
    const expected = [8, 9];
    const result = getPossibleCellValues(sampleBoard, 3, 6);
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
});

test('solvePuzzle 8,4,5...', () => {
    const expected = [
        8,4,5,3,1,2,9,6,7,
        7,2,6,8,4,9,1,3,5,
        9,1,3,5,7,6,8,2,4,
        2,3,4,6,5,8,7,9,1,
        5,6,7,1,9,3,2,4,8,
        1,8,9,4,2,7,3,5,6,
        6,5,8,9,3,1,4,7,2,
        3,7,1,2,6,4,5,8,9,
        4,9,2,7,8,5,6,1,3
    ];
    const result = solvePuzzle(sampleBoard);
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
});