wb.factory("wbRenderer", function () {
	"use strict";
	var context,
			renderPencil,
			renderLine,
			renderRectangle,
			renderCircle,
			renderAll,
			buffer = [];

	renderPencil = function (data) {
		var i;

		context.beginPath();					
		context.lineCap = 'round';
		context.strokeStyle = data.Color;
		context.lineWidth = data.LineWidth;
		context.moveTo(data.Points[0].x, data.Points[0].y);
		for (i = 0; i < data.Points.length; i++) {
			context.lineTo(data.Points[i].x, data.Points[i].y);
		}
		context.stroke();
	};

	renderLine = function (data) {
		context.beginPath();
		context.strokeStyle = data.LineColor;
		context.lineWidth = data.LineWidth;
		context.lineCap = 'round';
		context.moveTo(data.StartX, data.StartY);
		context.lineTo(data.EndX, data.EndY);
		context.stroke();
	};

	renderRectangle = function (data) {
		context.beginPath();
		context.strokeStyle = data.LineColor;
		context.fillStyle = data.FillColor;
		context.lineWidth = data.LineWidth;
		context.rect(data.StartX, data.StartY, data.Width, data.Height);

		if (data.FillShape) {
			context.fill();
		}
		
		context.stroke();
	};

	renderCircle = function (data) {
		context.beginPath();
		context.strokeStyle = data.LineColor;
		context.fillStyle = data.FillColor;
		context.lineWidth = data.LineWidth;
		context.arc(data.StartX, data.StartY, data.Radius, 0, Math.PI * 2, false);

		if (data.FillShape) {
			context.fill();
		}

		context.stroke();
	};
	
	renderAll = function () {
		var i;

		context.clearRect(0, 0, canvas.width, canvas.height);
		for (i = 0; i < buffer.length; i++) {
			switch (buffer[i].ToolName) {
				case "pencil":
					renderPencil(buffer[i]);
					break;
				case "rectangle":
					renderRectangle(buffer[i]);
					break;
				case "circle":
					renderCircle(buffer[i]);
					break;
				case "line":
					renderLine(buffer[i]);
					break;
				case "image":
					renderImage(buffer[i]);
					break;
			}
		}
	};

	return {
		addToBuffer: function (data) {
			buffer.push(data);
		},

		renderAll: function () {
			renderAll();
		},

		render: function (data) {
			switch (data.ToolName) {
				case "pencil":
					renderPencil(data);
					break;
				case "rectangle":
					renderRectangle(data);
					break;
				case "circle":
					renderCircle(data);
					break;
				case "line":
					renderLine(data);
					break;
				case "image":
					renderImage(data);
					break;
			}
		},

		setContext: function (ctx) {
			context = ctx;
		},

		undo: function () {
			buffer.pop();			
		}
	};
});