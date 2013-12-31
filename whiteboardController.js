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
			mouseDown,
			startPos,
			endPos,
			transferFrontBufferToBackBuffer,
			createRenderObject,

			transferFrontBufferToBackBuffer = function () {
				var i,
						last,
						bufferLength;

				switch ($scope.tool) {
					case 'pencil':
						bufferLength = frontbuffer.length;
						for (i = 0; i < bufferLength; i++) {
							backbuffer.push(frontbuffer[i]);
						}
						return;

					case 'rectangle':
						backbuffer.push(frontbuffer[0]);												
						break;
				}
			},

			createRenderObject = function () {
				var data,
						pointsLength,
						addPositionData;

				pointsLength = points.length;

				switch ($scope.tool) {
					case 'pencil':
						data = {
							Context: context,
							ToolName: 'pencil',
							LineWidth: $scope.lineWidth
						};

						// we only want the last two points
						if (points.length === 1) {
							data.Points = [points];
						} else {
							data.Points = [points[pointsLength - 2], points[pointsLength - 1]];
						}
						break;

					case 'rectangle':
						data = {
							Context: context,
							ToolName: 'rectangle',
							LineColor: colorValue[currentColorNumber],
							FillColor: colorValue[fillColorNumber],
							LineWidth: $scope.LineWidth,
							StartX: startPos.x,
							StartY: startPos.y,
							Width: endPos.x - startPos.x,
							Height: endPos.y - startPos.y,
							FillFlag: $scope.fillTheRectangle
						};
						break;

					default:
						console.log("createRenderObject: unkown tool");
						data = {};
						break;
				}

				return data;
			};

// bindings
	$scope.lineWidth = 5;
	$scope.lineText = "medium";
	$scope.tool = "pencil";
	$scope.currentColorCss = "currentColor black";
	$scope.fillTheRectangle = true;

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
		
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		offset = 5;  // mouse cursor offset
		backbuffer = [];
		frontbuffer = [];
		currentColorNumber = 1;
		fillColorNumber = 1;
		mouseDown = false;
		startPos = { x: 0, y: 0 };
		endPos = { x: 0, y: 0 };
		points = [];
		
		
		canvas.onmousedown = function (e) {
			var data;

			points.push({
				x: (e.pageX - canvas.offsetLeft) - offset,
				y: (e.pageY - canvas.offsetTop) - offset,
				color: colors[currentColorNumber]
			});			

			mouseDown = true;

			startPos.x = points[0].x;
			startPos.y = points[0].y;
			endPos.x = startPos.x;
			endPos.y = startPos.y;

			data = createRenderObject();

			if ($scope.tool === "rectangle") {
				context.clearRect(0, 0, canvas.width, canvas.height);
				renderer.Render(backbuffer);
			}				

			frontbuffer.push(data);
			renderer.Render(frontbuffer);
		};

		canvas.onmousemove = function (e) {
			var x, y, lastPoint, data;

			if (mouseDown) {
				x = (e.pageX - canvas.offsetLeft) - offset;
				y = (e.pageY - canvas.offsetTop) - offset;

				points.push({
					x: x,
					y: y,
					color: colors[currentColorNumber]
				});
				
				lastPoint = points[points.length - 1];
				endPos.x = lastPoint.x;
				endPos.y = lastPoint.y;

				data = createRenderObject();

				if ($scope.tool === "rectangle") {
					context.clearRect(0, 0, canvas.width, canvas.height);
					renderer.Render(backbuffer);
					frontbuffer = [];
				}
				frontbuffer.push(data);
				renderer.Render(frontbuffer);
			}			
		};

		canvas.onmouseup = function (e) {
			var data;

				mouseDown = false;
				data = createRenderObject();

				transferFrontBufferToBackBuffer();

				frontbuffer = [];
				points = [];
				startPos.x = 0;
				startPos.y = 0;
				endPos.x = 0;
				endPos.y = 0;
		};

	};

	$scope.selectColor = function (color) {
		currentColorNumber = color;
		$scope.currentColorCss = "currentColor " + colors[currentColorNumber];
	};

	$scope.isToolNameSelected = function () {
		for (var tool in args) {
			if (tool === $scope.tool) {
				return true;
			}
		}

		return false;
	};

	$scope.changeLineWidth = function (size) {
		$scope.lineWidth = size;
	};

};