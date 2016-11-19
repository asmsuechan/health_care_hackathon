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
var message_txSp = 100; // テキストの表示速度
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
    Sound.playSound("http://healthcare-20161119.s3-website-ap-northeast-1.amazonaws.com/voice/00.wav");
    setTimeout(view_name_input, 4000);
}

// ********* シナリオ2 *********** //

function scenario2(){
    yourName = $('#name_input').val();
    $('#name_input').hide(500);

    // メッセージ
    sasaraStartTimer();
    $('#message_box').text("あなたのことを、もっと詳しく教えてごしない。");

    display_message_box();

    setTimeout(function(){
        $('#man_woman_button').show(1000);
    }, 2000);
}

// ********* シナリオ3 *********** //
function scenario3(){
    $('#man_woman_button').hide(500);

    // メッセージ
    sasaraStartTimer();
    $('#message_box').text("あなたの年齢を教えてごしない。");

    display_message_box();

    setTimeout(function(){
        $('#age_input').show(1000);
    }, 1000);
}

// ********* シナリオ3 *********** //
function scenario4(){
    $('#age_input').hide(500);

    // メッセージ
    sasaraStartTimer();
    $('#message_box').text("ありがとう！楽しく健康になろうね！");
    display_message_box();

    setTimeout(function(){
        $('#oshiete_area').show(1000);
    }, 1000);
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
});


// railsとのつなぎ込み
// var HEROKU_URL = 'http://localhost:3000';
var HEROKU_URL = 'https://health-care-hackathon-shimane.herokuapp.com';

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
        var message = `${message_prefix}あなたには「${tenmei}の${ryourimei}」がおすすめ！<br><a href="${url}" class="url_link">${url}</a>`;
        $("#message_box").html(message);
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