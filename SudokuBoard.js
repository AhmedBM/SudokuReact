import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    Dimensions
} from "react-native";

var styles = StyleSheet.create({
    // gridContainer: {
    //     flex: 1,
    //     alignSelf: "stretch",
    //     flexWrap: "wrap",
    //     flexDirection: "row"
    // },
    item: {
		flex: 1,
		alignSelf: "stretch",
		// padding: 16
	},
	content: {
		flex: 1,
		// backgroundColor: "red",
		alignItems: "center",
		justifyContent: "center"
	},
	text: {
		color: "black",
		fontSize: 13
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

    componentWillMount() {
        Dimensions.addEventListener("change", this.handler);
    }

    componentWillUnmount() {
      // Important to stop updating state after unmount
      Dimensions.removeEventListener("change", this.handler);
    }

    render() {
        var props = this.props;
        var state = this.state;

        var width = Math.round(state.window.width);
        var height = Math.round(state.window.height);
        var squareSize = Math.min(width, height) + 1;
        if (width > height) {
            // Lanscape - RN includes the status bar in the height, remove it
        }

        var marginHorizontal = 0;
        var marginVertical = 0;

        var size = squareSize / 9

        var itemStyle = {
            width: size,
            height: size,
            // marginHorizontal: 0,
            // marginVertical: 0
        };

        var renderedItems = state.board.map(function (item, index) {
            return (
                <View key={index} style={itemStyle}>
                    {renderItem(item, index)}
                </View>
            );
        });

        var gridContainer = {
            // flex: 0,
            flexDirection: "row",
            // flexBasis: squareSize,
            flexWrap: "wrap",
            height: squareSize,
            width: squareSize,
            // alignItems: 'stretch',
            // backgroundColor: 'red'
        }

        return (
            <ImageBackground source={require('./static_content/empty_grid.png')} style={gridContainer} >
                {renderedItems}
            </ImageBackground>
        );
    }
}

SudokuBoard.propTypes = {
    board: PropTypes.arrayOf(PropTypes.any).isRequired,
};