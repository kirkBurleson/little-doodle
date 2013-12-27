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
			fillColorNumber,
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
				//endPos.x = points.x;
				//endPos.y = points.y;
				data = createRenderObject();

				transferFrontBufferToBackBuffer();

				frontbuffer = [];
				points = [];
				startPos.x = 0;
				startPos.y = 0;
				endPos.x = 0;
				endPos.y = 0;
			},

			handleMouseMove = function () {
				var data,
						lastPoint;

				if (mouseDown) {
					lastPoint = points[points.length - 1];
					endPos.x = lastPoint.x;
					endPos.y = lastPoint.y;

					data = createRenderObject();

					frontbuffer.push(data);
					renderer.Render(frontbuffer);
				}
			},

			handleMouseDown = function () {
				var data;

				mouseDown = true;
				startPos.x = points[0].x;
				startPos.y = points[0].y;

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
							frontbuffer[0].Width = last.endPos.x;
							frontbuffer[0].Height = last.endPos.y;
							backbuffer.push(frontbuffer[0]);	
						}
						
						break;
				}
			},

			createRenderObject = function () {
				var data,
						pointsLength;

				pointsLength = points.length;

				switch (selectedToolName) {
				case 'path':
					data = {
						Context: context,
						Canvas: canvas,
						ToolName: 'path',
						PenWidth: $scope.penWidth
					};

					// we only want the last two points
					if (points.length === 1) { // send x, y
						data.Points = [points];
					} else { // send last 2 x, y points
						data.Points = [points[pointsLength - 2], points[pointsLength - 1]];
					}
					break;

				case 'rectangle':
					data = {
						Context: context,
						ToolName: 'rectangle',
						LineColor: colorValue[currentColorNumber],
						FillColor: colorValue[fillColorNumber],
						PenWidth: $scope.penWidth,
						StartX: startPos.x,
						StartY: startPos.y,
						Width: endPos.x - startPos.x,
						Height: endPos.y - startPos.y,
						FillFlag: $scope.fillTheRectangle
					};
				}

				return data;
			};

// bindings
	$scope.penWidth = 5;
	$scope.currentColorCss = 'currentColor black';
	$scope.fillTheRectangle = false;

// functions
	$scope.init = function () {
		var offset;

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
		offset = 3;  // mouse cursor offset
		backbuffer = [];
		frontbuffer = [];
		currentColorNumber = 1;
		fillColorNumber = 1;
		selectedToolName = 'path';
		mouseDown = false;
		startPos = { x: 0, y: 0 };
		endPos = { x: 0, y: 0 };
		points = [];
		
		
		canvas.onmousedown = function (e) {
			points.push({
				x: (e.pageX - canvas.offsetLeft) - offset,
				y: (e.pageY - canvas.offsetTop) - offset,
				color: colors[currentColorNumber]
			});			
			handleMouseDown();
		};

		canvas.onmousemove = function (e) {
			var x, y;

			if (mouseDown) {
				points.push({
					x: (e.pageX - canvas.offsetLeft) - offset,
					y: (e.pageY - canvas.offsetTop) - offset,
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