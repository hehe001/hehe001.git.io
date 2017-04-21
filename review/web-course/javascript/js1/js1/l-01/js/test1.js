var div = document.getElementById('btn');
var box = document.getElementById('box');
div.onclick = function(){
	// box.style.display = 'none';
	box.style.width = '300px';
	box.style.height = '300px';
	box.style.border = '1px solid red';
	box.innerHTML = '<b>这是b标签了</b>';
	alert('111');
	document.title = 'adfasdfasdf';
}