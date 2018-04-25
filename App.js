/**
 * React Native Sudoku App
 * https://github.com/AhmedBM/SudokuReact
 */

import React, { Component } from 'react';
import {
    Text,
    Button,
    View,
    Picker,
    Item,
    StyleSheet,
    Dimensions
} from 'react-native';
import SudokuBoard from './src/SudokuBoard'

// NOTE: You may add additional Sudoku Boards here
var SudokuBoards = [
    [
        0, 0, 5, 0, 0, 0, 0, 0, 7,
        0, 0, 0, 0, 0, 9, 0, 0, 5,
        9, 0, 0, 5, 0, 6, 0, 0, 0,
        0, 0, 4, 0, 0, 8, 0, 0, 0,
        0, 0, 7, 0, 9, 0, 2, 4, 0,
        1, 8, 0, 0, 0, 0, 3, 0, 0,
        6, 0, 0, 0, 3, 1, 4, 0, 0,
        3, 0, 0, 2, 0, 0, 0, 0, 0,
        4, 0, 2, 7, 0, 0, 0, 0, 3
    ],
    [
        8, 0, 2, 6, 0, 4, 0, 0, 5,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 7, 9, 3, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 3,
        2, 0, 0, 0, 0, 0, 0, 0, 0,
        3, 0, 0, 0, 2, 5, 0, 8, 9,
        0, 0, 0, 8, 3, 0, 7, 0, 0,
        0, 6, 0, 0, 0, 7, 0, 9, 0,
        0, 0, 9, 0, 6, 0, 0, 1, 8,
    ]
];
// 

var styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 15
    },
    labelPicker: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    picker: {
        height: 50,
        width: 50
    },
    pickerLabel: {
        alignSelf: 'center'
    }
});

export default class SudokuApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 0,
            // Set intial width/height
            window: Dimensions.get("window")
        };

        this.onPressSolve = this.onPressSolve.bind(this);
        this.isLandscape = this.isLandscape.bind(this);
    }

    onPressSolve() {
        // TODO: wire up function in SudokuBoard
        this.sudokuBoard.solveBoard();
    }

    // Create handler to update the state accordingly on screen size change
    handler = dims => this.setState(dims);

    isLandscape() {
        return this.state.window.width > this.state.window.height;
    }

    componentWillMount() {
        Dimensions.addEventListener("change", this.handler);
    }

    componentWillUnmount() {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener("change", this.handler);
    }

    render() {
        // Change the style according to device orientation
        var rootViewStyle = {
            flex: 1,
            flexDirection: this.isLandscape() ? 'row' : 'column',
            justifyContent: 'space-evenly'
        };

        return (
            <View style={rootViewStyle}>
                <SudokuBoard onRef={ref => (this.sudokuBoard = ref)} board={SudokuBoards[this.state.selected]} />
                <View style={styles.innerContainer}>
                    <View style={styles.labelPicker}>
                        <Text style={styles.pickerLabel}>Selected Board: </Text>
                        <Picker
                            style={styles.picker}
                            mode="dropdown"
                            selectedValue={this.state.selected}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selected: itemIndex })}>
                            {SudokuBoards.map((item, index) => {
                                return (<Picker.Item label={(index + 1).toString()} value={index} key={index} />)
                            })}
                        </Picker>
                    </View>
                    <Button
                        onPress={this.onPressSolve}
                        title="Solve Puzzle!"
                        color="green"
                        accessibilityLabel="Solve the Sudoku puzzle" />
                </View>
            </View>
        );
    }
}
