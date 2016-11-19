//= require Sound

var yourName = "";

var time = 0;
var timerID = 0;
var sasaraImagePathId = 0;

var sasaraImagePaths = ['http://healthcare-20161119.s3-website-ap-northeast-1.amazonaws.com/sasara_dai/sasara_normal.png',
    'http://healthcare-20161119.s3-website-ap-northeast-1.amazonaws.com/sasara_dai/sasara_normal_close_mouth.png']

var sasaraStartTimer = function() {
    timerID = setInterval(sasaraTimer/*定期的に呼び出す関数名*/, 500/*呼び出す間隔*/);
};

var sasaraStopTimer = function() {
    clearInterval(timerID);
    $('#sasara_image').attr('src', sasaraImagePaths[0]);
};

var sasaraTimer = function() {
    sasaraImagePathId = sasaraImagePathId == 0 ? 1 : 0;
    $('#sasara_image').attr('src', sasaraImagePaths[sasaraImagePathId]);
};

// ********************************************** //

/* ----- option ----- */
var message_id_name = ['message_box']; //指定するidを全て配列で渡す
var message_txSp = 50; // テキストの表示速度
var message_dly = 1000; // 次の文章までの待ち時間
/* ----- option ----- */
var message_count = 0;
var message_tx = [];
var message_txCount = [];
var message_id = [];


function countSet(){ // 文字数カウントの初期設定
    for(n=0;n<message_id.length;n++){
        message_txCount[n] = 0;
    }
}

function kamikakushi(){ // 要素をtx[i]に保持させ、非表示にする
    for(i=0;i<message_id_name.length;i++){
        message_id[i] = document.getElementById(message_id_name[i]);
        message_tx[i] = message_id[i].firstChild.nodeValue; // 初期の文字列
        message_id[i].innerHTML = '';
    }
}

function itimozi(){ //　一文字ずつ表示させる
    message_id[message_count].innerHTML = message_tx[message_count].substr( 0, ++message_txCount[message_count] )+"_"; // テキストの指定した数の間の要素を表示
    if(message_tx[message_count].length != message_txCount[message_count]){ // Count が初期の文字列の文字数と同じになるまでループ
        setTimeout("itimozi()",message_txSp); // 次の文字へ進む
    }else{
        message_id[message_count].innerHTML = message_tx[message_count].substr( 0, ++message_txCount[message_count] ); // テキストの指定した数の間の要素を表示
        message_count++; // 次の段落に進む為のカウントアップ
        if(message_count != message_id.length){ // id数が最後なら終了
            setTimeout("itimozi()",message_dly); // 次の段落へ進む
        }
        sasaraStopTimer();
    }
}
function display_message_box() {
    message_count = 0;
    message_tx = [];
    message_txCount = [];
    message_id = [];

    kamikakushi();
    countSet();
    itimozi()
}

// ********************* シナリオ *********************** //

// ********* シナリオ1 *********** //
function view_name_input(){
    $('#name_input').show(1000);
}

function scenario_page_start(){
    sasaraStartTimer();
    display_message_box();
    Sound.playSound("http://healthcare-20161119.s3-website-ap-northeast-1.amazonaws.com/voice/00_さとうささら_私の名前はささら。あ….wav");
    setTimeout(view_name_input, 2000);
}

// ********* シナリオ2 *********** //

function scenario2(){
    yourName = $('#name_input_text').val();
    $('#name_input').hide(500);

    // メッセージ
    sasaraStartTimer();
    Sound.playSound("http://healthcare-20161119.s3-website-ap-northeast-1.amazonaws.com/voice/01_さとうささら_あなたのことを、もっ….wav");
    $('#message_box').text((yourName == "" ? "あなた" : yourName) + "のことを、もっと詳しく教えてごしない。");

    display_message_box();

    setTimeout(function(){
        $('#man_woman_button').show(200);
    }, 2000);
}

// ********* シナリオ3 *********** //
function scenario3(){
    $('#man_woman_button').hide(500);

    // メッセージ
    sasaraStartTimer();
    Sound.playSound("http://healthcare-20161119.s3-website-ap-northeast-1.amazonaws.com/voice/23.wav");
    $('#message_box').text((yourName == "" ? "あなた" : yourName) + "の年齢を教えてごしない。");

    display_message_box();

    setTimeout(function(){
        $('#age_input').show(500);
    }, 1000);
}

// ********* シナリオ4 *********** //
function scenario4(){
    $('#age_input').hide(500);

    // メッセージ
    sasaraStartTimer();
    Sound.playSound("http://healthcare-20161119.s3-website-ap-northeast-1.amazonaws.com/voice/24.wav");
    $('#message_box').text("だんだん！楽しく健康にならこい！");
    display_message_box();

    setTimeout(function(){
        $('#oshiete_area').show(500);
    }, 1000);
}

// ********* シナリオ5 教えて *********** //
function scenario5(){
    $('#oshiete_area').hide(500);

    // メッセージ
    sasaraStartTimer();
    Sound.playSound("http://healthcare-20161119.s3-website-ap-northeast-1.amazonaws.com/voice/02.wav");
    $('#message_box').text("今の体調はどんな感じだね？");
    display_message_box();

    setTimeout(function(){
        $('#condition_button_area').show(500);
    }, 1000);
}

// ********* シナリオ6 おすすめされた *********** //
function scenario6(message){
    $('#condition_button_area').hide(500);
    $("#message_box").html(message);
    display_message_box();

    setTimeout(function(){
        $('#tabeta_button_area').show(500);
    }, 1000);
}

// ********* シナリオ7 おすすめされた *********** //
function scenario7(message, url){
    $('#tabeta_button_area').hide(500);

    $('#sasara_image').attr('src', url);
    $('#oshiete_area').show(1000);

    $("#message_box").html(message);
//    display_message_box();

    // 画像を戻す
    setTimeout(function(){
        $('#sasara_image').attr('src', sasaraImagePaths[0]);
    }, 10000);
}


// ********************* 初期表示 *********************** //
$(function(){
    scenario_page_start();

    // クリックイベント
    $('#name_input_button').click(function(){
        scenario2();
    });
    $('#man_button').click(function(){
        scenario3();
    });
    $('#woman_button').click(function(){
        scenario3();
    });
    $('#age_input_button').click(function(){
        scenario4();
    });
    $('#oshiete_button').click(function(){
        scenario5();
    });
});


// railsとのつなぎ込み
// var HEROKU_URL = 'http://localhost:3000';
var HEROKU_URL = '';

//　一文字ずつ表示はどうしたらいいんだ？
function sendRecommend(taicho, message_prefix){
    $.ajax({
        type: 'POST',
        url: HEROKU_URL + '/oshiete/recommend',
        data: { taicho: taicho }
    }).done(function( data ) {
        var tenmei = data.tenmei;
        var ryourimei = data.ryourimei;
        var url = data.url;
        var message = message_prefix + 'あなたには「' + tenmei + 'の' + ryourimei + '」がおすすめ！<br><a href="' + url + '" class="url_link">' + url+ '</a>';
        scenario6(message);
    });
}

$(function(){
    $('#good_button').click(function(){
        sendRecommend('good', '絶好調な');
    });
    $('#bad_button').click(function(){
        sendRecommend('bad', 'しょんぼり気味の');
    });
    $('#normal_button').click(function(){
        sendRecommend('normal', 'いつもどおりの');
    });
});

function sendHoukoku(houkoku){
    $.ajax({
        type: 'POST',
        url: HEROKU_URL + '/oshiete/houkoku',
        data: { houkoku: houkoku }
    }).done(function( data ) {
        console.info(JSON.stringify(data));
        scenario7(data.sasara, data.image);
    });
}

$(function(){
    $('#yes_houkoku_button').click(function(){
        sendHoukoku('ok');
    });
    $('#no_houkoku_button').click(function(){
        sendHoukoku('ng');
    });
});
