var renderer = (function () {
	render = function (buffer) {
		var i,
				j,
				data;

		if (buffer.length === 0) {
			return;
		}

		for (i = 0; i < buffer.length; i++) {
			data = buffer[i];

			switch (data.ToolName) {

			case 'line':
				alert('rendering a line');
				break;

			case 'path':
				

				if (data.Points.length === 1) {
					data.Context.beginPath();
					data.Context.fillStyle = data.Points.color;
					data.Context.fillRect(data.Points.x, data.Points.y, data.PenWidth, data.PenWidth);
				} else {
					data.Context.beginPath();
					data.Context.strokeStyle = data.Points[0].color;
					data.Context.lineWidth = data.PenWidth;
					data.Context.moveTo(data.Points[0].x, data.Points[0].y);
					data.Context.lineTo(data.Points[1].x, data.Points[1].y);
					data.Context.stroke();
				}
				break;

			case 'rectangle':
				data.Context.beginPath();
				data.Context.strokeStyle = data.LineColor;
				data.Context.fillStyle = data.FillColor;
				data.Context.lineWidth = data.PenWidth;
				data.Context.rect(data.StartX, data.StartY, data.Width, data.Height);
				
				if (data.FillFlag) {
					data.Context.fill();
				} else {
					data.Context.stroke();
				}

				break;

			case 'circle':
				alert('rendering a circle');
				break;

			default:
				console.log('render: Unknown tool name');
			}
		}
	};

	return { Render: render };
}());