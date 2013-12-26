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
						data.Context.fillStyle = data.Points[0].color;
						data.Context.fillRect(
							data.Points[0].x,
							data.Points[0].y,
							data.PenWidth,
							data.PenWidth);
					} else {
						data.Context.strokeStyle = data.Points[0].color;						
						data.Context.beginPath();
						for (j = 1; j < data.Points.length; j++) {
							data.Context.moveTo(data.Points[j-1].x, data.Points[j-1].y);
							data.Context.lineTo(data.Points[j].x, data.Points[j].y);
						}						
						data.Context.closePath();
						data.Context.stroke();
						
					}
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

	return { Render: render };
}());