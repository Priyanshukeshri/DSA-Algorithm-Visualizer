

function TestAlgorithm(am)
{
	this.init(am);

}

TestAlgorithm.prototype = new Algorithm();
TestAlgorithm.prototype.constructor = TestAlgorithm;
TestAlgorithm.superclass = Algorithm.prototype;

TestAlgorithm.prototype.init = function(am)
{
	var sc = TestAlgorithm.superclass;
	var fn = sc.init;
	fn.call(this,am);
//	TestAlgorithm.superclass.init.call(this,am);
	this.addControls();
	this.nextIndex = 0;

}

TestAlgorithm.prototype.addControls =  function()
{
	this.doWorkButton = addControlToAlgorithmBar("Button", "Do Work");
	this.doWorkButton.onclick = this.doWork.bind(this);
}

TestAlgorithm.prototype.reset = function()
{
	this.nextIndex = 0;
}

TestAlgorithm.prototype.doWork = function()
{
	this.implementAction(this.work.bind(this), "ignore");
}


TestAlgorithm.prototype.work = function(ignore)
{
	var circle1 = this.nextIndex++;
	var circle2 = this.nextIndex++;
	var circle3 = this.nextIndex++;
	this.commands = [];
	this.cmd("CreateCircle", circle1, circle1, 100,100);
	this.cmd("Step");
	this.cmd("Move", circle1, 200,100);
	this.cmd("Step");
	this.cmd("CreateCircle", circle2, circle2, 75,75);
	this.cmd("Step");
	this.cmd("Connect", circle1, circle2, "#FF3333", 0, true, "Label");
	this.cmd("Step");
	this.cmd("CreateCircle", circle3, "Foo" + String(circle3), 200,200);
	this.cmd("Step");
	this.cmd("Delete", circle1);
	this.cmd("Step");
	this.cmd("Move", circle2, 100, 200);
	this.cmd("Step");
	this.cmd("Move", circle3, 0, 0);
	return this.commands;
}


TestAlgorithm.prototype.disableUI = function(event)
{
	this.doWorkButton.disabled = true;
}

TestAlgorithm.prototype.enableUI = function(event)
{
	this.doWorkButton.disabled = false;
}


var currentAlg;

function init()
{
	var animManag = initCanvas();
	currentAlg = new TestAlgorithm(animManag);
}