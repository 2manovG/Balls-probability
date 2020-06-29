var canvas = document.getElementById("hDc");
var hdc = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var input_m = document.getElementById("input_m");
var input_r = document.getElementById("input_r");
var input_l = document.getElementById("input_l");
var input_n = document.getElementById("input_n");
var input_eps = document.getElementById("input_eps");
var input_N = document.getElementById("input_N");
input_m.value = input_r.value = input_l.value = "8";
input_n.value = "100";
input_eps.value = "0.1";
input_N.value = "10";

//plot graph
function plot(m, r, l, n, eps, N)
{
	//setup canvas
	hdc.clearRect(0, 0, width, height);
	hdc.font = "14px Arial";
	
	//check inputs
	if (m != m || r != r || l != l || n != n || eps != eps || N != N) //user inputed not a number
	{
		return;
	}
	
	//draw axis
	let drawRect = { x0: 32, x1: 32+(width-64)/n, y1: 32, x2: width-32, y2: height-32, w: width-64, h: height-64 };
	let off = 20;
	
	//zero
	hdc.textAlign = "right";
	hdc.textBaseline = "top";
	hdc.fillText("0", drawRect.x0 - 4, drawRect.y2 + 4);
	
	//x
	hdc.strokeStyle = "black";
	
	hdc.beginPath();
	hdc.moveTo(drawRect.x2 + off, drawRect.y2);
	hdc.lineTo(drawRect.x0 - off, drawRect.y2);
	hdc.moveTo(drawRect.x2 + off, drawRect.y2);
	hdc.lineTo(drawRect.x2 + off/2, drawRect.y2 + off/2);
	hdc.moveTo(drawRect.x2 + off, drawRect.y2);
	hdc.lineTo(drawRect.x2 + off/2, drawRect.y2 - off/2);
	hdc.stroke();
	
	//1 on x
	hdc.beginPath();
	hdc.moveTo(drawRect.x1, drawRect.y2 - off/2);
	hdc.lineTo(drawRect.x1, drawRect.y2 + off/2);
	hdc.stroke();
	
	hdc.textAlign = "center";
	hdc.fillText("1", drawRect.x1, drawRect.y2 + off/2 + 2);
	
	//n on x
	hdc.beginPath();
	hdc.moveTo(drawRect.x2, drawRect.y2 - off/2);
	hdc.lineTo(drawRect.x2, drawRect.y2 + off/2);
	hdc.stroke();
	
	hdc.fillText(n, drawRect.x2, drawRect.y2 + off/2 + 2);
	
	//y
	hdc.beginPath();
	hdc.moveTo(drawRect.x0, drawRect.y1 - off);
	hdc.lineTo(drawRect.x0, drawRect.y2 + off);
	hdc.moveTo(drawRect.x0, drawRect.y1 - off);
	hdc.lineTo(drawRect.x0 - off/2, drawRect.y1 - off/2);
	hdc.moveTo(drawRect.x0, drawRect.y1 - off);
	hdc.lineTo(drawRect.x0 + off/2, drawRect.y1 - off/2);
	hdc.stroke();
	
	//1 on y
	hdc.beginPath();
	hdc.moveTo(drawRect.x0 - off/2, drawRect.y1);
	hdc.lineTo(drawRect.x0 + off/2, drawRect.y1);
	hdc.stroke();
	
	hdc.textAlign = "right";
	hdc.textBaseline = "middle";
	hdc.fillText("1", drawRect.x0 - off/2 - 2, drawRect.y1 + 2);
	
	//graph itself
	let v = experiment(m, r, l, n);
	
	hdc.strokeStyle = "red";
	
	hdc.beginPath();
	hdc.moveTo(drawRect.x1, drawRect.y2 - drawRect.h * v[0]);
	for (let i = 1; i < n; i++) hdc.lineTo(drawRect.x0 + (i + 1) * drawRect.w / n, drawRect.y2 - drawRect.h * v[i]);
	hdc.stroke();
	
	//draw correct probability
	let p = probability(m, r, l);
	
	hdc.strokeStyle = "blue";
	hdc.beginPath();
	hdc.moveTo(drawRect.x0, drawRect.y2 - drawRect.h * p);
	hdc.lineTo(drawRect.x2, drawRect.y2 - drawRect.h * p);
	hdc.stroke();
	
	hdc.setLineDash([5, 5]);
	hdc.beginPath();
	hdc.moveTo(drawRect.x0, drawRect.y2 - drawRect.h * (p - eps));
	hdc.lineTo(drawRect.x2, drawRect.y2 - drawRect.h * (p - eps));
	hdc.moveTo(drawRect.x0, drawRect.y2 - drawRect.h * (p + eps));
	hdc.lineTo(drawRect.x2, drawRect.y2 - drawRect.h * (p + eps));
	hdc.stroke();
	
	//draw fitted interval
	let n1 = findN(N, v, p, eps);
	if (n1 == n1) //found
	{
		hdc.strokeStyle = "green";
		hdc.beginPath();
		hdc.moveTo(drawRect.x0 + drawRect.w * n1 / n, drawRect.y1);
		hdc.lineTo(drawRect.x0 + drawRect.w * n1 / n, drawRect.y2);
		hdc.moveTo(drawRect.x0 + drawRect.w * (n1 + N) / n, drawRect.y1);
		hdc.lineTo(drawRect.x0 + drawRect.w * (n1 + N) / n, drawRect.y2);
		hdc.stroke();
	}
	hdc.setLineDash([]);
	
	//draw found values
	hdc.textBaseline = "top";
	hdc.font = "18px Arial";
	hdc.fillText("P(A)=" + p + ", n=" + n1, width - 2, 2);
}

function go()
{
	plot(parseInt(input_m.value), parseInt(input_r.value), parseInt(input_l.value),
		parseInt(input_n.value), parseFloat(input_eps.value), parseFloat(input_N.value));
}
go();