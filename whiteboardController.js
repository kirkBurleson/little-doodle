'use strict';

var whiteboardController = function ($scope) {
	var colors,
			colorValue,
			canvas,
			context,
			backbuffer,
			frontbuffer,
			points,
			currentColorNumber,			
			selectedToolName,
			mouseDown,
			startPos,
			endPos,
			transferFrontBufferToBackBuffer,
			createRenderObject,
			handleMouseDown,
			handleMouseMove,
			handleMouseUp,

			handleMouseUp = function (e) {
				var data;

				mouseDown = false;
				endPos.X = points.x;
				endPos.Y = points.y;
				data = createRenderObject();

				transferFrontBufferToBackBuffer();

				frontbuffer = [];
				points = [];
				startPos.x = 0;
				startPos.y = 0;
				endPos.x = 0;
				endPos.y = 0;

				renderer.Render(backbuffer);
			},

			handleMouseMove = function () {
				var data;

				if (mouseDown) {
					data = createRenderObject();

					frontbuffer.push(data);
					renderer.Render(frontbuffer);
				}
			},

			handleMouseDown = function () {
				var data;

				mouseDown = true;
				startPos.X = points[0].x;
				startPos.Y = points[0].y;

				data = createRenderObject();

				frontbuffer.push(data);
				renderer.Render(frontbuffer);
			},

			transferFrontBufferToBackBuffer = function () {
				var i, last;

				switch (selectedToolName) {
					case 'path':
						for (i = 0; i < frontbuffer.length; i++) {
							backbuffer.push(frontbuffer[i]);
						}
						return;

					case 'rectangle':
						if (frontbuffer.length > 1) {
							last = frontbuffer[frontbuffer.length - 1];
							frontbuffer[0].endPos.X = last.endPos.X;
							frontbuffer[0].endPos.Y = last.endPos.Y;
							backbuffer.push(frontbuffer[0]);	
						}
						
						break;
				}
			},

			createRenderObject = function () {
				var data;

				switch (selectedToolName) {
				case 'path':
					data = {
						Context: context,
						Canvas: canvas,
						ToolName: 'path',
						PenWidth: $scope.penWidth,
						Points: points
					};
					break;

				case 'rectangle':
					data = {
						Context: context,
						ToolName: 'rectangle',
						LineColor: colorValue[currentColorNumber],
						FillColor: colorValue[fillColorNumber],
						PenWidth: $scope.penWidth,
						StartX: startPos.X,
						StartY: startPos.Y,
						EndX: endPos.X,
						EndY: endPos.Y,
						FillFlag: $scope.fillTheRectangle
					};
				}

				return data;
			};

// bindings
	$scope.penWidth = 3;
	$scope.currentColorCss = 'currentColor black';
	$scope.fillTheRectangle = false;

// functions
	$scope.init = function () {
		var offsetx,
				offsety;

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
		// adjust mouse coordinates to pointer tip
		// '3' may change with css in view
		offsetx = canvas.offsetLeft - 3;
		offsety = canvas.offsetTop - 3;
		backbuffer = [];
		frontbuffer = [];
		currentColorNumber = 1;
		selectedToolName = 'path';
		mouseDown = false;
		startPos = { X: 0, Y: 0 };
		endPos = { X: 0, Y: 0 };
		points = [];
		
		
		canvas.onmousedown = function (e) {
			points.push({
				x: e.pageX - offsetx,
				y: e.pageY - offsety,
				color: colors[currentColorNumber]
			});			
			handleMouseDown();
		};

		canvas.onmousemove = function (e) {
			if (mouseDown) {
				points.push({
					x: e.pageX - offsetx,
					y: e.pageY - offsety,
					color: colors[currentColorNumber]
				});
				handleMouseMove();
			}			
		};

		canvas.onmouseup = function (e) {			
			handleMouseUp();
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