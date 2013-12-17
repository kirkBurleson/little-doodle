'use strict';

var whiteboardController = function ($scope) {
	var colors,
			colorRgb,
			canvas,
			context,
			currentColorNumber = 1,			
			selectedToolName = 'path',
			render = function (data) {
				var rect = data.Canvas.getBoundingClientRect();
				switch (data.ToolName) {
				case 'path':
					data.Context.fillStyle = data.Color;
					data.Context.fillRect(data.Position.X - rect.left, data.Position.Y - rect.top, $scope.penWidth, $scope.penWidth);
					
					break;
				}
			};

// bindings
	$scope.penWidth = 5;
	$scope.currentColorCss = 'currentColor color1';

// functions
	$scope.init = function () {
		colors = [
			'blank',
			'color1',
			'color2',
			'color3',
			'color4',
			'color5',
			'color6',
			'color7',
			'color8',
			'color9'];
		colorRgb = [
			'blank',
			'#000000',
			'#ffffff',
			'#0000ff',
			'#00ffff',
			'#ffff00',
			'#ff0000',
			'#00ff00',
			'#ff00ff',
			'#888888'];
		
		canvas = document.getElementById('canvas');
		context = canvas.getContext('2d');

		canvas.onmousedown = function (e) {
			var x, y, data;

			data = {
				Canvas: canvas,
				Context: context,
				ToolName: selectedToolName,
				Color: colorRgb[currentColorNumber],
				Position: {
					X: e.clientX,
					Y: e.clientY}}

			render(data);
		};

	};

	$scope.selectTool = function (toolName) {
		selectedToolName = toolName;
	};

	$scope.selectColor = function (color) {
		currentColorNumber = color;
		$scope.currentColorCss = 'currentColor ' + colors[currentColorNumber];
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