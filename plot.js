var canvas = document.getElementById("hDc");
var hdc = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var input_m = document.getElementById("input_m");
var input_n = document.getElementById("input_n");
var input_count = document.getElementById("input_count");
input_m.value = input_n.value = "3";
input_count.value = "100";

var radio1 = document.getElementById("graph1");
var radio2 = document.getElementById("graph2");
var radio3 = document.getElementById("graph3");
radio1.checked = true;

//plot graph
function plot(n, m, count, i)
{
	//setup canvas
	hdc.clearRect(0, 0, width, height);
	hdc.font = "14px Arial";
	
	//check inputs
	if (n != n || m != m || count != count) //user inputed not a number
	{
		return;
	}
	let ymul = [1, 1/n, 1/n][i];
	
	//draw axis
	let drawRect = { x0: 32, x1: 32+(width-64)/count, y1: 32, x2: width-32, y2: height-32, w: width-64, h: height-64 };
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
	
	hdc.fillText(count, drawRect.x2, drawRect.y2 + off/2 + 2);
	
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
	hdc.fillText(["1", "n", "n"][i], drawRect.x0 - off/2 - 2, drawRect.y1 + 2);
	
	//graph itself
	let v = experiment(n, m, count)[i];
	
	hdc.strokeStyle = "red";
	
	hdc.beginPath();
	hdc.moveTo(drawRect.x1, drawRect.y2 - drawRect.h * v[0] * ymul);
	for (let i = 1; i < count; i++) hdc.lineTo(drawRect.x0 + (i + 1) * drawRect.w / count, drawRect.y2 - drawRect.h * v[i] * ymul);
	hdc.stroke();
	
	//draw correct pmd
	let pmd = correct_pmd(n, m)[i];
	
	hdc.strokeStyle = "blue";
	hdc.beginPath();
	hdc.moveTo(drawRect.x0, drawRect.y2 - drawRect.h * pmd * ymul);
	hdc.lineTo(drawRect.x2, drawRect.y2 - drawRect.h * pmd * ymul);
	hdc.stroke();
	
	//draw found values
	hdc.textBaseline = "top";
	hdc.font = "18px Arial";
	hdc.fillText("PMD"[i] + "(A)=" + pmd, width - 2, 2);
}

function go()
{
	let i = 0;
	if (radio2.checked) i = 1;
	else if (radio3.checked) i = 2;
	
	//console.log(radio1.checked, radio2.checked, radio3.checked, i);
	plot(parseInt(input_n.value), parseInt(input_m.value), parseInt(input_count.value), i);
}
go();
