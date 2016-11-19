//= require Sound

var time = 0;
var timerID = 0;
var sasaraImagePathId = 0;

var sasaraImagePaths = ['http://healthcare-20161119.s3-website-ap-northeast-1.amazonaws.com/sasara_dai/sasara_normal.png',
    'http://healthcare-20161119.s3-website-ap-northeast-1.amazonaws.com/sasara_dai/sasara_normal_close_mouth.png']

var startTimer = function() {
    timerID = setInterval(sasaraTimer/*定期的に呼び出す関数名*/, 500/*呼び出す間隔*/);
};

var stopTimer = function() {
    clearInterval(timerID);
};

var sasaraTimer = function() {
    sasaraImagePathId = sasaraImagePathId == 0 ? 1 : 0;
    $('#sasara_image').attr('src', sasaraImagePaths[sasaraImagePathId]);

    time = time + 1;
    if (time > 180) {
        stopTimer();
    }
};

// ********************************************** //

/* ----- option ----- */
var message_id = ['message_box']; //指定するidを全て配列で渡す
var message_txSp = 100; // テキストの表示速度
var message_dly = 1000; // 次の文章までの待ち時間
/* ----- option ----- */
var message_count = 0;
var message_tx = [];
var message_txCount = [];


function countSet(){ // 文字数カウントの初期設定
    for(n=0;n<message_id.length;n++){
        message_txCount[n] = 0;
    }
}

function kamikakushi(){ // 要素をtx[i]に保持させ、非表示にする
    for(i=0;i<message_id.length;i++){
        message_id[i] = document.getElementById(message_id[i]);
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
    }
}

// ********************* 初期表示 *********************** //
function display_message_box() {
    window.scrollTo(0,0);
    kamikakushi();
    countSet();
    itimozi()
}

$(function(){
    startTimer();
    display_message_box();
    Sound.playSound("http://healthcare-20161119.s3-website-ap-northeast-1.amazonaws.com/voice/00.wav");
});
