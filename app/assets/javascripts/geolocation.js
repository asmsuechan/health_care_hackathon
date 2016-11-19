if( navigator.geolocation )
{
  // 現在地を取得
  navigator.geolocation.getCurrentPosition(

    // [第1引数] 取得に成功した場合の関数
    function( position )
    {
      var data = position;
    },

    // [第2引数] 取得に失敗した場合の関数
    function( error )
    {
      // エラーコード(error.code)の番号
      // 0:UNKNOWN_ERROR        原因不明のエラー
      // 1:PERMISSION_DENIED      利用者が位置情報の取得を許可しなかった
      // 2:POSITION_UNAVAILABLE   電波状況などで位置情報が取得できなかった
      // 3:TIMEOUT          位置情報の取得に時間がかかり過ぎた…

      // エラー番号に対応したメッセージ
      var errorInfo = [
        "原因不明のエラーが発生しました…。" ,
        "位置情報の取得が許可されませんでした…。" ,
        "電波状況などで位置情報が取得できませんでした…。" ,
        "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
      ] ;

      // エラー番号
      var errorNo = error.code ;

      // エラーメッセージ
      var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ] ;

      // アラート表示
      console.log( errorMessage ) ;

    } ,

    // [第3引数] オプション
    {
      "enableHighAccuracy": false,
      "timeout": 8000,
      "maximumAge": 2000,
    }

  ) ;
}

else
{
  var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。" ;
}
