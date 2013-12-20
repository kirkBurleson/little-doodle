var renderer = (function () {
	var render = function (data) {
		var rect = data.Canvas.getBoundingClientRect();

		switch (data.ToolName) {
		case 'line':
			alert('rendering a line');
			break;
		case 'path':
			data.Context.fillStyle = data.Color;
			data.Context.fillRect(data.Position.X - rect.left, data.Position.Y - rect.top, data.PenWidth, data.PenWidth);
			break;
		case 'rect':
			alert('rendering a rectangle');
			break;
		case 'circle':
			alert('rendering a circle');
			break;
		default:
			alert('unknown tool');
		}
	};

	return { Render: render };
}());