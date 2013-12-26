var renderer = (function () {
	render = function (buffer) {
		var i,
				j,
				data,
				ox,
				oy;

		if (buffer.length === 0) {
			return;
		}

		// adjust mouse coordinates to pointer tip
		// '3' may change with css in view
		// TOO: pass in magic number via data object
		ox = buffer[0].Canvas.offsetLeft - 3;
		oy = buffer[0].Canvas.offsetTop - 3;

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
							data.Points[0].x - ox,
							data.Points[0].y - oy,
							data.PenWidth,
							data.PenWidth);
					} else {
						data.Context.strokeStyle = data.Points[0].color;						
						data.Context.beginPath();
						for (j = 1; j < data.Points.length; j++) {
							data.Context.moveTo(data.Points[j-1].x - ox, data.Points[j-1].y - oy);
							data.Context.lineTo(data.Points[j].x - ox, data.Points[j].y - oy);
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