var player = document.getElementById('player');
var bind = function(element, event, callback) {
	return element.addEventListener(event, callback);
};
var sp = 0;
$(document).ready(function() {
	$('#ckxjj').click(() => {
		$('#ckxjj').hide();
		$('#xjjsp').show();
		if(sp == 0) {
		    randomm();
		    sp = null
		}
        player.onerror = ()=> {
            randomm()
        }
        player.play();
	});
	$('#gbxjj').click(()=>{
		$('#ckxjj').show();
		$('#xjjsp').hide();
		player.pause();
	})
});



var get = function(id) {
	return document.getElementById(id);
};

var auto = true;
// 生成播放视频
function randomm() {
    // player.src = 'https://tucdn.wpon.cn/api-girl/index.php?_t=' + Math.random();
	player.src = 'https://v.nrzj.vip/video.php?_t=' + Math.random();
	player.play();
};
bind(get('next'), 'click', randomm);

bind(get('switch'), 'click', function() {
	auto = !auto;
	this.innerText = '翻牌：' + (auto ? '开' : '关');
});
bind(player, 'ended', function() {
	if (auto) randomm();
});
player.pause();
