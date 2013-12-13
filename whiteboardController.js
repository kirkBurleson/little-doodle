'use strict';

var whiteboardController = function ($scope) {
	var colors = undefined,
			canvas = undefined,
			context = undefined,
			currentColorNumber = 1,
			selectedToolName = '';

// bindings
	$scope.penWidth = 1;

	$scope.init = function () {
		colors = ['blank', 'color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8', 'color9'];
		
		canvas = document.getElementById('canvas');
		context = canvas.getContext('2d');

	};

	$scope.selectTool = function (toolName) {
		selectedToolName = toolName;
	};

	$scope.selectColor = function (color) {
		$scope.currentColorNumber = color;
	};

	$scope.getSelectedColorCss = function () {
		return 'currentColor ' + colors[$scope.currentColorNumber];
	};

	$scope.getCurrentToolCss = function (toolName) {
		if (toolName !== selectedToolName) {
			return '';
		}

		return 'currentTool';
	};

	$scope.isToolNameSelected = function (toolName) {
		return toolName === selectedToolName;
	};

};