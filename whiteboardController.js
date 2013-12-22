'use strict';

var whiteboardController = function ($scope) {
	var colors,
			colorValue,
			canvas,
			context,
			currentColorNumber = 1,			
			selectedToolName = 'path',

			createRenderObject = function (x, y) {
				var data;

				switch (selectedToolName) {
				case 'path':
					data = {
						Canvas: canvas,
						Context: context,
						ToolName: 'path',
						Color: colorValue[currentColorNumber],
						PenWidth: $scope.penWidth,						
						Position: {
							X: x,
							Y: y}}
					break;
				}

				return data;
			};

// bindings
	$scope.penWidth = 5;
	$scope.currentColorCss = 'currentColor black';

// functions
	$scope.init = function () {
		colors = [
			'blank',
			'black',
			'white',
			'blue',
			'skyblue',
			'red',
			'green',
			'yellow',
			'pink',
			'gray'];

		colorValue = [
			'blank',
			'#000000',
			'#ffffff',
			'#0000ff',
			'#00ffff',
			'#ff0000',
			'#00ff00',
			'#ffff00',			
			'#ff00ff',
			'#888888'];
		
		canvas = document.getElementById('canvas');
		context = canvas.getContext('2d');
		renderer.Initialize(canvas);
		
		canvas.onmousedown = function (e) {
			var data;

			data = createRenderObject(e.clientX, e.clientY);
			renderer.Add(data);
			renderer.Render();
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