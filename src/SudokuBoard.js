import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    Dimensions,
    StatusBar
} from "react-native";
import { solvePuzzle } from "./SudokuLogic";

var styles = StyleSheet.create({
    item: {
		flex: 1,
		alignSelf: "stretch",
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	text: {
		color: "black",
		fontSize: 26
	}
});

function renderItem(item) {
	return (
		<View style={styles.item}>
			<View style={styles.content}>
				<Text style={styles.text}>{item === 0 ? ' ' : item}</Text>
			</View>
		</View>
	);
}

export default class SudokuBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: props.board,
            // Set intial width/height
            window: Dimensions.get("window")
        };
    }

    // Create handler to update the state accordingly on screen size change
    handler = dims => this.setState(dims);

    // Update state from new prop values
    componentWillReceiveProps(newProps) {
        this.setState({board: newProps.board});
    }

    componentWillMount() {
        Dimensions.addEventListener("change", this.handler);
        this.props.onRef(this)
    }

    componentWillUnmount() {
      // Important to stop updating state after unmount
      Dimensions.removeEventListener("change", this.handler);
      this.props.onRef(undefined)
    }

    solveBoard() {
        this.setState({board: solvePuzzle(this.state.board)});
    }

    render() {
        var props = this.props;
        var state = this.state;

        var width = Math.round(state.window.width);
        var height = Math.round(state.window.height);
        var squareSize = Math.min(width, height) + 1;
        if (width > height) {
            // Lanscape - RN includes the status bar in the height
            squareSize -= StatusBar.currentHeight;
        }

        var marginHorizontal = 0;
        var marginVertical = 0;

        var size = squareSize / 9

        var itemStyle = {
            width: size,
            height: size,
        };
        
        var renderedItems = state.board.map(function (item, index) {
            return (
                <View key={index} style={itemStyle}>
                    {renderItem(item, index)}
                </View>
            );
        });

        var container = {
            height: squareSize,
            width: squareSize,
        }
        var gridContainer = {
            // flex: 1,
            flexDirection: "row",
            // flexBasis: squareSize+1,
            flexWrap: "wrap",
            height: squareSize,
            width: squareSize+1,    // Hack as 9 child elems per row slightly overflow to the next row
            alignSelf: 'stretch',
        }
        
        return (
            <ImageBackground source={require('./../static_content/empty_grid.png')} style={gridContainer} >
                {renderedItems}
            </ImageBackground>
        );
    }

    
}

SudokuBoard.propTypes = {
    board: PropTypes.arrayOf(PropTypes.any).isRequired,
};