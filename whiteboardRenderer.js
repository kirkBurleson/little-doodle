var renderer = (function () {
	var canvas,
			buffer,
			rect,
			init,
			render,
			addToBuffer;

	buffer = [];

	init = function (canvasElement) {
		if (canvas === undefined) {
			canvas = canvasElement;
		}
	};

	render = function () {
		var i,
				data;

		if (buffer.length === 0) {
			console.log('render: buffer is empty');
			return;
		}

		for (i = 0; i < buffer.length; i++) {
			data = buffer[i];
			switch (data.ToolName) {
				case 'line':
					alert('rendering a line');
					break;
				case 'path':
					data.Context.fillStyle = data.Color;
					data.Context.fillRect(data.Position.X, data.Position.Y, data.PenWidth, data.PenWidth);
					break;
				case 'rectangle':
					alert('rendering a rectangle');
					break;
				case 'circle':
					alert('rendering a circle');
					break;
				default:
					console.log('render: Unknown tool name');
			}
		}
	};

	addToBuffer = function (data) {
		if (data === undefined) {
			console.log('addToBuffer: data is undefined');
			return; }

		buffer.push(data);
	};

	return {
		Render: render,
		Add: addToBuffer,
		Initialize: init
	};
}());