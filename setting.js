/* global up, config, xyplay, layer */

var YZM = {
 
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: u.match(/\sQQ/i) == " qq" //是否QQ
		};
	}(),
	'start': function() {
		$.ajax({
			url: config.api + "/?ac=getdate",
			dataType: "json",
			success: function(e) {
				YZM.waittime = e.data.waittime
				YZM.ads = e.data.ads;
				config.logo = e.data.logo;
				up.pbgjz = e.data.pbgjz;
				up.jzuser = e.data.jzuser;
				up.trysee = e.data.trytime;
				config.sendtime = e.data.sendtime;
				config.color = e.data.color;
                                config.background_color=e.data.background_color;
                                config.background_url=e.data.background_url;
				config.group_x = YZM.ads.set.group;
				config.dmrule = e.data.dmrule;
                                config.title=e.data.title;
                                config.pic=(e.data.pic=='')?config.pic:e.data.pic;
                                config.background_color=e.data.background_color;
                                config.font_color=e.data.font_color;
                                config.contextmenu=e.data.contextmenu;
                                config.style=e.data.style;
                                config.time=e.data.time;
                                config.fullscreen=false;
                                //使用随机人数
                                if(e.data.count!==""){
                                    var rand=function (min,max){return  parseInt(Math.random() * (max - min + 1) + min);};
                                    var str = e.data.count.split('-');
                                    if(str.length==2){up.usernum=rand(str[0],str[1]); }  
                                }
				danmuon = e.data.danmuon;
				if (YZM.ads.state == 'on') {
					if (YZM.ads.set.state == '1') {
						YZM.MYad.vod(YZM.ads.set.vod.url, YZM.ads.set.vod.link);
					} else if (YZM.ads.set.state == '2') {
						YZM.MYad.pic(YZM.ads.set.pic.link, YZM.ads.set.pic.time, YZM.ads.set.pic.img);
					}
				} else {
					YZM.play(config.url);
				}
			}
		});
	},
	'play': function(url) {
		if (!danmuon || config.live) {
			YZM.player.play(url);
		} else {
			if (config.av != '') {
				YZM.player.bdplay(url);
			} else {
				YZM.player.dmplay(url);
			}
		}
		$(function() {
			$(".yzmplayer-setting-speeds,.yzmplayer-setting-speed-item").on("click", function() {
				$(".speed-stting").toggleClass("speed-stting-open");
			});
			$(".speed-stting .yzmplayer-setting-speed-item").click(function() {
				$(".yzmplayer-setting-speeds  .title").text($(this).text());
			});
		});
                
             // $(".yzmplayer-playlist-icon").on("click", function() { $(".yzmplayer-playlist").toggle(); });

		$(".yzmplayer-fulloff-icon").on("click", function() {
			YZM.dp.fullScreen.cancel();
		});
		$(".yzmplayer-showing").on("click", function() {
			YZM.dp.play();
			$(".vod-pic").remove();
		});
               //检测标题开关
               
		if (config.title == 'on') {
                     $("#vodtitle").show();
		}else{
                    $("#vodtitle").hide();
                    
                };
                 // $("#vodtitle").html(xyplay.title + '  ' +(Number(xyplay.part)+1));

                //检测时间开关
                if(config.time=='1'){
                    
                    $(".vod-title").append("<div id='stats'></div>");
                }else if(config.time=='2'){
                    
                     $("#vodtitle").append("<div id='stats'></div>");
                };
                //显示列表
                 YZM.video.list();
        
             
                //主题配置
                 var css = '<style type="text/css">';
                 css +='.yzm-yzmplayer-send-icon{background:'+config.color+'!important;}';
                 css +='.showdan-setting .yzmplayer-toggle input+label {border: 1px solid '+config.color+' !important;background: '+ config.color+' !important;}';
                 css +=' .loading .pic { background: url('+config.background_url+') no-repeat  !important; }';
                 css += '#loading-box{background-image:radial-gradient('+config.background_color+') !important ;}';
                 css += '#loading-box span{color:'+config.font_color+'!important ;}';
                 css += config.style;
                 css += '</style>';
                 $('body').append(css).addClass("");
        
        
                //隐藏页面全屏
                
                $(".yzmplayer-full-in-icon").hide();
        
        
                
	},
	'dmid': function() {
		if (up.diyid[0] == 0 && config.id != '') {
			a = config.id,
				b = config.sid
		} else if (up.diyid[0] == 1 || !config.id) {
			a = up.diyid[1],
				b = up.diyid[2]
		}
		YZM.id = a + ' P' + b
	},
	'load': function() {
		setTimeout(function() {
			$("#link1").fadeIn();
		}, 100);
		setTimeout(function() {
			$("#link1-success").fadeIn();
		}, 500);
		setTimeout(function() {
			$("#link2").show();
		}, 1 * 1000);
		setTimeout(function() {
			$("#link3,#span").fadeIn();
		}, 2 * 1000);
		if (YZM.versions.weixin && (YZM.versions.ios || YZM.versions.iPad) || YZM.waittime==0) {
			var css = '<style type="text/css">';
			css += '#loading-box{display: none;}';
			css += '</style>';
			$('body').append(css).addClass("");
		}
                
		YZM.danmu.send();
		YZM.danmu.list();
	        YZM.def();
		YZM.video.try();
		YZM.dp.danmaku.opacity(1);
	},
	'def': function() {
		console.log('播放器开启');
		YZM.stime = 0;
		YZM.headt = yzmck.get("headt");
		YZM.lastt = yzmck.get("lastt");
		YZM.last_tip = parseInt(YZM.lastt) + 10;
		YZM.frists = yzmck.get('frists');
		YZM.lasts = yzmck.get('lasts');
		YZM.playtime = Number(YZM.getCookie("time_" + config.url));
		YZM.ctime = YZM.formatTime(YZM.playtime);
		YZM.dp.on("loadedmetadata", function() {
			YZM.loadedmetadataHandler();
		});
		YZM.dp.on('fullscreen',function(){
			if(/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
				screen.orientation.lock('landscape');
				}
                           $("#stats").show();    
                           $("#vodtitle").show();
                           config.fullscreen=true;
                        
		});
                YZM.dp.on('fullscreen_cancel',function(){
                    
                     config.fullscreen=false;
			
                     if (config.title != 'on'){  
                         $("#vodtitle").hide();
                     } 
                    $("#stats").hide();  

		});
                        
		YZM.dp.on("ended", function() {
			YZM.endedHandler();
		});
		YZM.dp.on('pause', function() {
			YZM.MYad.pause.play(YZM.ads.pause.link, YZM.ads.pause.pic);
		});
		YZM.dp.on('play', function() {
			YZM.MYad.pause.out();
		});
		YZM.dp.on('timeupdate', function(e) {
			YZM.timeupdateHandler();
		});
		
               /*            切换播放列表          */
                
                   //监控来源列表被改变
               $("#flaglist").change(function() {
                       xyplay.pflag=this.value;
                      console.log(xyplay.pflag);
                      
                       YZM.video.playlist(this.value);
                   });
                
                
                  //播放列表选项卡被改变
                  $("#playlist").change(function() {YZM.video.part(this.value);});
    
                 //播放列表失去焦点
                 $('.yzmplayer-playlist').on('blur mouseleave',function(){changelist(false)});
                 
                 //监控图标切换
                 $(".yzmplayer-playlist-icon").click(function() {
                     
                     if($(".yzmplayer-playlist").is('.fadeleftIn')) {
                         changelist(false);
                   
                     }else{
                          if(YZM.video.list()){
                                 changelist(true);
                           }else{
                                 YZM.dp.notice("当前为直链播放");
                             }   
                     }
		});
                     
                     //切换播放列表显示
                     function  changelist(show) {
                         if(show){
                             $(".yzmplayer-playlist").removeClass('faderightOut');
                            $(".yzmplayer-playlist").addClass('show');
                            $(".yzmplayer-playlist").addClass('fadeleftIn');
                             
                         }else{
                              $(".yzmplayer-playlist").removeClass('fadeleftIn');
                            $(".yzmplayer-playlist").addClass('faderightOut');
                             
                         }
      
                     }   
                     
                     
                     
                     
              /*            切换播放列表          */
            YZM.jump.def();
    
	},
	'video': {
 
           'list':function() { 

             try{    
              //刷新线路列表      
              $(".flaglist-show").empty();
             
              for (var i = 0, len = xyplay.list_array.length; i < len; i++) 
               {
                  l =`<option class="flaglist-item"  value="${i}" ${(xyplay.pflag==i)?"selected":""}>${xyplay.list_array[i].flag_name}</option>`;
                  $(".flaglist-show").append(l);
                               
                };
             
                //刷新播放列表
                 YZM.video.playlist(xyplay.pflag);
                 
                 //刷新标题
                 $("#vodtitle").html(xyplay.title + '  ' +config.vname[xyplay.part]||config.vname[0]);
    
                 return true;
    
            }catch(e){
                 //layer.msg("没有找到剧集信息");
                 // YZM.dp.notice("没有找到剧集信息");
                 console.log("未找到剧集信息");
                  return false;
                 //$(".yzmplayer-playlist-icon").hide();
             }
                      
                },
            
            'playlist': function(pflag) {
                try{
                      $(".playlist-show").empty();
                      $("#playlist").empty();
                      var list = xyplay.list_array[pflag].video;
                      config.video=[];config.vname=[];
                     for (var i = 0, len = list.length; i < len; i++) {
                            var array = list[i].split("$");
                            var title=t=(xyplay.part==i)?array[0]+"":array[0];
                 
                            if(title.length>10){t=title.substr(0,10);}
 
                            var style=(xyplay.part==i)?xyplay.play.style.play_on:'';
                            l =`<li class="playlist" style="${style}" onclick="YZM.video.part(${i});" title="${title}">${t}</li></d>`;
                            p =`<option class="playlist-item"  value="${i}" ${(xyplay.part==i)?"selected":""} title="${title}">${title}</option>`;
	                    config.video.push(array[1]); config.vname.push(array[0]);
                            $(".playlist-show").append(l); $("#playlist").append(p); 
                     }
                   
                      var title="【"+xyplay.title+"】 "+(config.vname[xyplay.part] || config.vname[0]);
                      xyplay.setTitle("正在播放: "+title);
                      $(".yzmplayer-watching-title").text("正在播放");
                      $(".yzmplayer-watching-title").attr("title",title );  
                       return true;
                 }catch(e){
                       //layer.msg("没有找到剧集信息");
                     // YZM.dp.notice("没有找到剧集信息");
                       console.log("未找到剧集信息");
                       return false;
                    // $(".yzmplayer-playlist-icon").hide();      
                 }
                     
                    
            },
            
     'part': function(part) {
    
                  $(".yzmplayer-playlist").removeClass('fadeleftIn');
                  $(".yzmplayer-playlist").addClass('faderightOut');
                  xyplay.part=part;
     
       try{
   
              var url=config.video[part];  
              if(this.isVideo(url)){return YZM.video.switchVideo(url);}
              
     //检测是否能播放           
      $.ajax({
            url: "../../api.php",
            type: "POST",
            dataType: "json",
            data:{ 'tp':'checkPlay','url':url},                           
            beforeSend: function () {
                        YZM.dp.pause();
                	var cplayer=`<div style="" class="memory-play-wrap"><div class="memory-play"><span>正在解析</span></div></div>`
			$(".yzmplayer-cplayer").append(cplayer);
            },
            complete: function (){ $(".memory-play-wrap").remove();},
            success: function(data) {
               
                
                     if(data.type==='link'){ 
                          xyplay.open(data.url);
                    }else if(data.type==='video' || data.type==='hls' || data.type==='mp4') {
                            YZM.video.switchVideo(data.url);
     
                    }else {
                       xyplay.jxplay();
                   }
            }
       });
       
         }catch(e){
                      xyplay.AutoPlay('list');
                 }
 
               },
               
               'switchVideo':function(url){
                          config.url=url;
                          YZM.playtime = Number(YZM.getCookie("time_" + config.url));
		          YZM.ctime = YZM.formatTime(YZM.playtime);
                          YZM.id= (typeof(xyplay.title)!=='undefined' && xyplay.title.indexOf("直链")===-1) ? xyplay.title :substr($.md5(config.url),8,16)+' P'+(Number(xyplay.part)+1);
                          YZM.danmu.relist();YZM.jump.head();
                          YZM.dp.switchVideo({ url:url },{
					id: YZM.id,
					api: config.api + '?ac=dm',
					user: config.user
				});
                           YZM.dp.play();
                           YZM.video.playlist(xyplay.pflag);
                           $("#vodtitle").html(xyplay.title + '  ' +config.vname[xyplay.part]||config.vname[0]);
                           xyplay.setTitle("正在播放: "+"【"+xyplay.title+"】 "+(config.vname[xyplay.part] || config.vname[0]));
               },
              
               'isVideo':function(word){
                   if (word === "" || word ===null || typeof word ==="undefined") {
                        return false;
                    }
                    var n = word.search(/\.(ogg|mp4|webm|m3u8)/i);
                    if (n !== -1) {
                        return true;
                    } else {
                        return false;
                    }
               },
               
        
		'play': function() {
			$("#link3").text("视频已准备就绪，即将为您播放");
			setTimeout(function() {
				YZM.dp.play();
				$("#loading-box").remove();
				YZM.jump.head();
			}, 1 * 1500);
		},
		'next': function() {
                    
              try{  
                   if( config.fullscreen)
                   {
                      if (Number(xyplay.part) < xyplay.playlist_array.length) 
                       {
                          xyplay.part++;
                          YZM.video.part(xyplay.part);
                       }else{
                         YZM.dp.notice("已经是最后一集了");  
                       }

                    }else{
                         setTimeout(config.next+"();",0);
                    }
                 
                   }catch(e){
                         
                         YZM.dp.notice("已经是最后一集了");  
                  } 
		},
		'try': function() {	
                    
                    function IsInArray(arr,value){
                       for(var i = 0; i < arr.length; i++){
                            if(value === arr[i]){
                               return true;
                           }
                         }
                          return false;
	                }
   
			if (up.trysee > 0 && config.group < config.group_x && config.group != '') {
				$('#dmtext').attr({
					"disabled": true,
					"placeholder": "登陆才能发弹幕"
				});
			};
		/*	
 	
    		var xyplay=$.ajax({
				url: '/ass.php?url=dp&vid='+zvid+'&vfrom='+zvfrom+'&vpart='+zvpart,
				dataType: 'jsonp',
				async:false,
				jsonp: 'cb'                				
    		}).responseJSON.s;

	
	var vtry_time=xyplay['try'];
	var vjifen=xyplay['jifen'];
	var vjifenname=xyplay['jifenname'];
	var vhouz=xyplay['houz'];
	var viparr2=xyplay.vipp;
	var viparr=Object.values(viparr2);
	var isauth=xyplay['isauth'];
	var t = parseInt(vtry_time);
	
	
	
	setInterval(function() {
					
				var s = parseInt(YZM.dp.video.currentTime);
				if (IsInArray(viparr,parseInt(zvpart)) && isauth=='n' && s > t) {
						YZM.dp.fullScreen.cancel();
						YZM.dp.pause();
						document.write("<div class='x-showtips-txt'  style='position:absolute;top:50%;left:50%;width: 100%;transform:translate(-50%,-50%);text-align:center;background:#1a1b1b;padding: 20px;'><div class='x-tips-title' style='font-size:16px;font-weight:700;color:#fff';>抱歉，本片需要购买观看完整版</div><div class='x-tips-subTitle'   style='font-size: 12px;color: #ccc;margin-top: 4px;max-height: 17px';>开通VIP购买此片，可享受会员权限</div><div class='x-showtips-btn'   style='width: 100%;float: left;padding: 5px';><div class='x-btn x-btn-try'  style='border: 1px solid #ebba73;border-radius: 22.5px;box-sizing: border-box;width: 150pxposition: relative;margin-top: 14px;display: inline-block;padding: 0 12px; margin-right: 12px;color: #c8a764;background-image: linear-gradient(270deg,#1b1b1b 0,#000 99%)';><div class='x-btn-text' ><a style='display: inline-block;text-align: center;font-size: 13px;color: #ebba73;height: 32px;line-height: 30px; width: 100%;max-width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-decoration:none';  href=/video/?"+zvid+"-"+zvfrom+"-"+zvpart+vhouz+"&action=pay&from2="+zvpart+" target='_blank'>非会员"+vjifen+""+vjifenname+"购买</a></div></div><div class='x-btn x-btn-buy' style='border: 1px solid #ebba73;border-radius: 22.5px;box-sizing: border-box;width: 150px;position: relative;margin-top: 14px;display: inline-block;padding: 0 12px;background-image: linear-gradient(132deg,#e1b271 0,#fce5aa 100%)';><div class='x-btn-text x-btn-buy-text'><a  style='display: inline-block;text-align: center;font-size: 13px;color: #ebba73;height: 32px;line-height: 30px;width: 100%;max-width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 13px;font-size: 13px;font-weight: 700;color: #5b3301;text-decoration:none'; href='/member.php' target='_blank'>开通会员</a></div></div></div></div>");
					}
				}, 1000);
		
                  */  
                    
                    },
		'seek': function() {
                       if(!config.live)YZM.dp.seek(YZM.playtime);	
		},
		'end': function() {
			layer.msg("播放结束啦=。=");
		},
		'con_play': function() {
			if (!danmuon || YZM.waittime==0 || config.live ) {
                                YZM.jump.head();
				YZM.dp.play();
                                $(".memory-play-wrap,#loading-box").remove();
                
			} else {
				var conplayer =
					` <e>已播放至${YZM.ctime}，继续上次播放？</e><d class="conplay-jump">是 <i id="num">${YZM.waittime}</i>s</d><d class="conplaying">否</d>`
				$("#link3").html(conplayer);
				var span = document.getElementById("num");
				
                        try {
                                var num = span.innerHTML;
				var timer = null;
				setTimeout(function() {
					timer = setInterval(function() {
						num--;
						span.innerHTML = num;
						if (num <= 0) {
							clearInterval(timer);
							YZM.video.seek();
							YZM.dp.play();
							$(".memory-play-wrap,#loading-box").remove();
						}
					}, 1000);
				}, 1);
                                
                                 }catch(err){
                                    //YZM.video.seek();
				    YZM.dp.play();
                                    $(".memory-play-wrap,#loading-box").remove(); 
          
                                 } 
                                
			};
                        
             
			var cplayer =
				`<div class="memory-play-wrap"><div class="memory-play"><span class="close">×</span><span>上次看到 </span><span>${YZM.ctime}</span><span class="play-jump">跳转播放</span></div></div>`
			$(".yzmplayer-cplayer").append(cplayer);
			$(".close").on("click", function() {
				$(".memory-play-wrap").remove();
			});
			setTimeout(function() {
				$(".memory-play-wrap").remove();
			}, 20 * 1000);
			$(".conplaying").on("click", function() {
				clearTimeout(timer);
				$("#loading-box").remove();
				YZM.dp.play();
				YZM.jump.head();
			});
			$(".conplay-jump,.play-jump").on("click", function() {
				clearTimeout(timer);
				YZM.video.seek();
				$(".memory-play-wrap,#loading-box").remove();
				YZM.dp.play();
			});

		}
	},
	'jump': {
		'def': function() {
			h = ".yzmplayer-setting-jfrist label";
			l = ".yzmplayer-setting-jlast label";
			f = "#fristtime";
			j = "#jumptime";
			a(h, 'frists', YZM.frists, 'headt', YZM.headt, f);
			a(l, 'lasts', YZM.lasts, 'lastt', YZM.lastt, j);

			function er() {
				layer.msg("请输入有效时间哟！");
			}

			function su() {
				layer.msg("设置完成，将在刷新或下一集生效");
			}

			function a(b, c, d, e, g, t) {
				$(b).on("click", function() {
					o = $(t).val();
					if (o > 0) {
						$(b).toggleClass('checked');
						su();
						g = $(t).val();
						yzmck.set(e, g);
					} else {
						er()
					};
				});
				if (d == 1) {
					$(b).addClass('checked');
					$(b).click(function() {
						o = $(t).val();
						if (o > 0) {
							yzmck.set(c, 0);
						} else {
							er()
						};
					});
				} else {
					$(b).click(function() {
						o = $(t).val();
						if (o > 0) {
							yzmck.set(c, 1);
						} else {
							er()
						};
					});
				}
			};
			$(f).attr({
				"value": YZM.headt
			});
			$(j).attr({
				"value": YZM.lastt
			});
			YZM.jump.last();
		},
		'head': function() {
                        if(config.live){return;}

			if (YZM.stime > YZM.playtime) YZM.playtime = YZM.stime;
			if (YZM.frists == 1) {
				if (YZM.headt > YZM.playtime || YZM.playtime == 0) {
					YZM.jump_f = 1
				} else {
					YZM.jump_f = 0
				}
			}
			if (YZM.jump_f == 1) {
				YZM.dp.seek(YZM.headt);
				YZM.dp.notice("已为您跳过片头");
			}
		},
		'last': function() {
                        if(config.live){return;}
			if (config.next != '') {
				if (YZM.lasts == 1) {
					setInterval(function() {
						var e = YZM.dp.video.duration - YZM.dp.video.currentTime;
						if (e < YZM.last_tip) YZM.dp.notice('即将为您跳过片尾');
						if (YZM.lastt > 0 && e < YZM.lastt) {
							YZM.setCookie("time_" + config.url, "", -1);
							YZM.video.next();
						};
					}, 1000);
				};
			} else {
				$(".icon-xj").remove();
			};
		},
		'ad': function(a, b) {}
	},
	'danmu': {
		'send': function() {
			g = $(".yzm-yzmplayer-send-icon");
			d = $("#dmtext");
			h = ".yzmplayer-comment-setting-";
			$(h + "color input").on("click", function() {
				r = $(this).attr("value");
				setTimeout(function() {
					d.css({
						"color": r
					});
				}, 100);
			});
			$(h + "type input").on("click", function() {
				t = $(this).attr("value");
				setTimeout(function() {
					d.attr("dmtype", t);
				}, 100);
			});

			$(h + "font input").on("click", function() {
			   /*
                             if (up.trysee > 0 && config.group == config.group_x) {
					layer.msg("会员专属功能");
					return;
				};
                               */
                                
				t = $(this).attr("value");
				setTimeout(function() {
					d.attr("size", t);
				}, 100);
			});
			g.on("click", function() {
				a = document.getElementById("dmtext");
				a = a.value.trim();
				b = d.attr("dmtype");
				c = d.css("color");
				z = d.attr("size");
				if (up.trysee > 0 && config.group < config.group_x && config.group != '') {
					layer.msg("已禁用弹幕");
					return;
				}
				
				var jzword=up.pbgjz.split(',');
				for (var i = 0; i < jzword.length; i++) {
					if (a.search(jzword[i]) != -1) {
						layer.msg("请勿发送无意义内容，规范您的弹幕内容");
						return;
					}
				}
				
				
				if (a.length < 1) {
					layer.msg("要输入弹幕内容啊喂！");
					return;
				}
				var e = Date.parse(new Date());
				var f = yzmck.get('dmsent', e);
				if (e - f < config.sendtime * 1000) {
					layer.msg('请勿频繁操作！发送弹幕需间隔' + config.sendtime + '秒~');
					return;
				}
				d.val("");
				YZM.dp.danmaku.send({
					text: a,
					color: c,
					type: b,
					size: z,
                       
				});
				yzmck.set('dmsent', e);
			});

			function k() {
				g.trigger("click");
			};
			d.keydown(function(e) {
				if (e.keyCode == 13) {
					k();
				};
			});
		},
                
                 'relist':function() {
                     
                     $(".list-show").empty();
				$.ajax({
					url: config.api + "?ac=get&id=" + YZM.id,
                                        
					success: function(d) {
                        
						if (d.code == 23) {
                                      
							a = d.danmuku;
							b = d.name;
							c = d.danum;
							$(".danmuku-num").text(c);
                                                        
                                                            
							$(a).each(function(index, item) {
                                                   
								l =
									`<d class="danmuku-list" time="${item[0]}"><li>${YZM.formatTime(item[0])}</li><li title="${item[4]}[${item[8]}]">${item[4]}[${item[8]}]</li><li title="用户：${item[8]}">${item[6]}</li><li class="report" onclick="YZM.danmu.report(\'${item[5]}\',\'${b}\',\'[${item[8]}] ${item[4]}\',\'${item[3]}\')">举报</li></d>`
								
                                                            console.log();
                                                            $(".list-show").append(l);
							})
						}
						$(".danmuku-list").on("dblclick", function() {
							YZM.dp.seek($(this).attr("time"))
						})
					}
				});
                     
                     
                     
                     
                 },
              
		'list': function() {
			$(".yzmplayer-list-icon,.yzm-yzmplayer-send-icon").on("click", function() {
				YZM.danmu.relist()
			});
			var liyih = '<div class="dmrules"><a target="_blank" href="' + config.dmrule + '">弹幕礼仪 </a></div>';
			$("div.yzmplayer-comment-box:last").append(liyih);
			$(".yzmplayer-watching-number").text(up.usernum);
			$(".yzmplayer-info-panel-item-title-amount .yzmplayer-info-panel-item-title").html("违规词");
			for (var i = 0; i < up.pbgjz.length; i++) {
				var gjz_html = "<e>" + up.pbgjz[i] + "</e>";
				$("#vod-title").append(gjz_html);
			}
			add('.yzmplayer-list-icon', ".yzmplayer-danmu", 'show');

                       //弹幕 鼠标移出
                      $(".yzmplayer-danmu").mouseleave(function () {
                           $(".yzmplayer-danmu").removeClass("show");
                        });

			function add(div1, div2, div3, div4) {
				$(div1).click(function() {
					$(div2).toggleClass(div3);
					$(div4).remove();
				});
			}
		},
		'report': function(a, b, c, d) {
			layer.confirm('' + c + '<!--br><br><span style="color:#333">请选择需要举报的类型</span-->', {
				anim: 1,
				title: '举报弹幕',
				btn: ['违法违禁', '色情低俗', '恶意刷屏', '赌博诈骗', '人身攻击', '侵犯隐私', '垃圾广告', '剧透', '引战'],
				btn3: function(index, layero) {
					YZM.danmu.post_r(a, b, c, d, '恶意刷屏');
				},
				btn4: function(index, layero) {
					YZM.danmu.post_r(a, b, c, d, '赌博诈骗');
				},
				btn5: function(index, layero) {
					YZM.danmu.post_r(a, b, c, d, '人身攻击');
				},
				btn6: function(index, layero) {
					YZM.danmu.post_r(a, b, c, d, '侵犯隐私');
				},
				btn7: function(index, layero) {
					YZM.danmu.post_r(a, b, c, d, '垃圾广告');
				},
				btn8: function(index, layero) {
					YZM.danmu.post_r(a, b, c, d, '剧透');
				},
				btn9: function(index, layero) {
					YZM.danmu.post_r(a, b, c, d, '引战');
				}
			}, function(index, layero) {
				YZM.danmu.post_r(a, b, c, d, '违法违禁');
			}, function(index) {
				YZM.danmu.post_r(a, b, c, d, '色情低俗');
			});
		},
		'post_r': function(a, b, c, d, type) {
			$.ajax({
				type: "get",
				url: config.api + '?ac=report&cid=' + d + '&user=' + a + '&type=' + type + '&title=' + b + '&text=' + c,
				cache: false,
				dataType: 'json',
				beforeSend: function() {},
				success: function(data) {
					layer.msg("举报成功！感谢您为守护弹幕作出了贡献");
				},
				error: function(data) {
					var msg = "服务故障 or 网络异常，稍后再试6！";
					layer.msg(msg);
				}
			});
		}
	},
	'setCookie': function(c_name, value, expireHours) {
		var exdate = new Date();
		exdate.setHours(exdate.getHours() + expireHours);
		document.cookie = c_name + "=" + escape(value) + ((expireHours === null) ? "" : ";expires=" + exdate.toGMTString());
	},
	'getCookie': function(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start !== -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end === -1) {
					c_end = document.cookie.length;
				};
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	},
	'formatTime': function(seconds) {
		return [parseInt(seconds / 60 / 60), parseInt(seconds / 60 % 60), parseInt(seconds % 60)].join(":").replace(
			/\b(\d)\b/g, "0$1");
	},
	'loadedmetadataHandler': function() {
		if (YZM.playtime > 0 && YZM.dp.video.currentTime < YZM.playtime) {
			setTimeout(function() {
				YZM.video.con_play()
			}, 1 * 1000);
		} else {
			setTimeout(function() {
				if (!danmuon) {
					YZM.jump.head();
				} else {
					YZM.dp.notice("视频已准备就绪，即将为您播放");
					YZM.video.play()
				}
			}, 1 * 1000);

		}
		YZM.dp.on("timeupdate", function() {
			YZM.timeupdateHandler();
		});
	},
	'timeupdateHandler': function() {
        if(!config.live){YZM.setCookie("time_" + config.url, YZM.dp.video.currentTime, 24);}
	},
	'endedHandler': function() {
		YZM.setCookie("time_" + config.url, "", -1);
		if (config.next !== '') {
           
			YZM.dp.notice("2s后,将自动为您播放下一集");
			setTimeout(function() {
				YZM.video.next();
			}, 2 * 1000);
		} else {
			YZM.dp.notice("视频播放已结束");
			setTimeout(function() {
				YZM.video.end();
			}, 2 * 1000);
		}
	},
	'player': {
		'play': function(url) {
			$('body').addClass("danmu-off");
			YZM.dp = new yzmplayer({
				autoplay: config.autoplay,
				element: document.getElementById('player'),
				theme: config.color,
				logo: config.logo,
                                live: config.live,
				video: {
					url: url,
					pic: config.pic,
					type: 'auto',
				},
			});
			var css = '<style type="text/css">';
			css += '#loading-box{display: none;}';
			css += '</style>';
			$('body').append(css).addClass("");
			YZM.def();
			YZM.jump.head();				
		},
		'adplay': function(url) {
			$('body').addClass("danmu-off");
			YZM.ad = new yzmplayer({
				autoplay: true,
				element: document.getElementById('ADplayer'),
				theme: config.color,
				logo: config.logo,
                                //contextmenu: config.contextmenu,
				video: {
					url: url,
					pic: config.pic,
					type: 'auto',
				},
			});
			$('.yzmplayer-controller,.yzmplayer-cplayer,.yzmplayer-logo,#loading-box,.yzmplayer-controller-mask').remove();
			$('.yzmplayer-mask').show();
			YZM.ad.on('timeupdate', function() {
				if (YZM.ad.video.currentTime > YZM.ad.video.duration - 0.1) {
					$('body').removeClass("danmu-off");
					YZM.ad.destroy();
					$("#ADplayer").remove();
					$("#ADtip").remove();
					YZM.play(config.url);
				}
			});
		},
		'dmplay': function(url) {
			YZM.dmid();
			YZM.dp = new yzmplayer({
				autoplay: YZM.waittime?false:config.autoplay,
				element: document.getElementById('player'),
				theme: config.color,
				logo: config.logo,
                                live: config.live,
  
				video: {
					url: url,
					pic: config.pic,
					type: 'auto',
				},
				danmaku: {
					id: YZM.id,
					api: config.api + '?ac=dm',
					user: config.user
				}
			});
			YZM.load();

		},
		'bdplay': function(url) {
			YZM.dmid();
			YZM.dp = new yzmplayer({
				autoplay: YZM.waittime?false:config.autoplay,
				element: document.getElementById('player'),
				theme: config.color,
				logo: config.logo,
                                live: config.live,
				video: {
					url: url,
					pic: config.pic,
					type: 'auto',
				},
				danmaku: {
					id: YZM.id,
					api: config.api + '?ac=dm',
					user: config.user,
					addition: [config.api + 'bilibili/?av=' + config.av]
				}
			});
			YZM.load();
		}
	},
	'MYad': {
		'vod': function(u, l) {
			$("#ADtip").html('<a id="link" href="' + l + '" target="_blank">查看详情</a>');
			$("#ADplayer").click(function() {
				document.getElementById('link').click();
			});
			YZM.player.adplay(u);
		},
		'pic': function(l, t, p) {
			$("#ADtip").html('<a id="link" href="' + l + '" target="_blank">广告 <e id="time_ad">' + t + '</e></a><img src="' +
				p + '">');
			$("#ADtip").click(function() {
				document.getElementById('link').click();
			});
			var span = document.getElementById("time_ad");
			var num = span.innerHTML;
			var timer = null;
			setTimeout(function() {
				timer = setInterval(function() {
					num--;
					span.innerHTML = num;
					if (num == 0) {
						clearInterval(timer);
						YZM.play(config.url);
						$('#ADtip').remove();
					}
				}, 1000);
			}, 1);

		},
		'pause': {
			'play': function(l, p) {
				if (YZM.ads.pause.state == 'on') {
					var pause_ad_html = '<div id="player_pause"><div class="tip">广告</div><a href="' + l +
						'" target="_blank"><img src="' + p + '"></a></div>';
					$('#player').before(pause_ad_html);
				}
			},
			'out': function() {
				$('#player_pause').remove();
			}
		}
	}

}




// 控制台报错
//setInterval(function() {
//window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized ? t("on") : (a = "off", ("undefined"!==typeof console.clear) && console.clear());
//debugger;
//}, 10);
