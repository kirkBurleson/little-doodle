var renderer = (function () {
	render = function (buffer) {
		var i,
				j,
				data;

		if (buffer.length === 0) {
			console.log("renderer: buffer is empty");
			return;
		}

		for (i = 0; i < buffer.length; i++) {
			data = buffer[i];

			switch (data.ToolName) {

				case 'pencil':
					data.Context.beginPath();					
					data.Context.lineCap = 'round';

					if (data.Points.length === 1) {
						data.Context.fillStyle = data.Points[0].color;
						data.Context.rect(data.Points[0].x, data.Points[0].y, data.LineWidth, data.LineWidth);
						data.Context.fill();
					} else {
						data.Context.moveTo(data.Points[0].x, data.Points[0].y);
						data.Context.lineTo(data.Points[1].x, data.Points[1].y);
						data.Context.strokeStyle = data.Points[0].color;
						data.Context.lineWidth = data.LineWidth;
						data.Context.stroke();						
					}
					break;

				case 'line':
					data.Context.beginPath();
					data.Context.strokeStyle = data.LineColor;
					data.Context.lineWidth = data.LineWidth;
					data.Context.lineCap = 'round';
					data.Context.moveTo(data.StartX, data.StartY);
					data.Context.lineTo(data.EndX, data.EndY);
					data.Context.stroke();
					break;

				case 'rectangle':
					data.Context.beginPath();
					data.Context.strokeStyle = data.LineColor;
					data.Context.fillStyle = data.FillColor;
					data.Context.lineWidth = data.LineWidth;
					data.Context.rect(data.StartX, data.StartY, data.Width, data.Height);

					if (data.FillShape) {
						data.Context.fill();
					}
					
					data.Context.stroke();					
					break;

				case "circle":
					data.Context.beginPath();
					data.Context.strokeStyle = data.LineColor;
					data.Context.fillStyle = data.FillColor;
					data.Context.lineWidth = data.LineWidth;
					data.Context.arc(data.StartX, data.StartY, data.Radius, 0, Math.PI * 2, false);

					if (data.FillShape) {
						data.Context.fill();
					}

					data.Context.stroke();
					break;

				default:
					console.log('render: Unknown tool name');
			}
		}
	};

	return { Render: render };
}());