/* 2012-05-21 by 友 跳頁擴充函式 */
/* 範例:
<div id="btmpage">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td class="font12 brown"><a href="#" id="_jump_prev_1">&#x3c;上一頁</a></td>
        <td align="center" class="font12 brown">
        <span id="pagenumber">
        <span class="active">1</span>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">7</a>
        <a href="#">8</a>
        <a href="#">9</a>
        <a href="#">10</a>
        </span>
        /&nbsp;在<span id="_jump_curpage">1</span>頁,共<span id="_jump_totalpage">0</span>頁/<span id="_jump_totalcount">0</span>筆
        </td>
        <td align="right" class="font12 brown"><a href="#" id="_jump_next_1">下一頁&#x3e;</a></td>
      </tr>
    </table>
</div>

<span id="ajaxJumpPage1"><!--分頁列1--></span>
<form id="frm1" name="frm1" method="post" action2="default.aspx">
    <input type="hidden" name="topage" id="topage" value="" />
</form>
<span id="ajaxJumpPage2"><!--分頁列2 Clone--></span>

<script type="text/javascript">
$(function(){
    loadJumpPage();
});

function loadJumpPage() {
    $('#ajaxJumpPage1').jumpPage({
        user_defined: false,                                //true = 自訂版型 且 複製跳頁 也會無作用.
        formid: 'frm1',                                     //Submit 的表單 ID
        pagenumberid: 'pagenumber',                         //要放入 數字跳頁 的容器 ID
        curPage: <%=topage%>,                               //目前所在頁次
        pageSize: <%=pagesize%>,                            //總頁數
        totalCount: <%=totalCount%>                         //總筆數
        ,cloneid: ['ajaxJumpPage2']                         //要複製的跳頁容器 ID
        ,success: function(o){                              //跳頁回傳
                var totalPage = o.totalPage;                //總頁數
                var PageNumber_html = o.PageNumber_html;    //數字跳頁 HTML
        }
    });
}
</script>
*/
(function ($) {
    $.fn.extend({ //擴充函式
        jumpPage: function (options) {  //跳頁Plugin

            var defaults = { //預設值
                loading: '<img src="/js/easyui/loading.gif" alt="載入中"/>'       //載入中的圖片
                , databind: {                     //ajax資料輸出的物件資料
                    showloading: true,            //顯示載入中的圖片
                    url: '',                      //程式位置
                    type: '',                     //接收資料的方式
                    data: '',                     //POST的資料
                    bindid: ''                    //要輸出資料的物件ID
                }

                , user_defined: false             //自訂版型, true 則不輸出 GeneralJumpPageHTML() 且 複製跳頁 也會無作用.
                , formid: 'frm1'                  //要Submit的表單ID ex: frm1
                , pagenumberid: 'pagenumber'      //要輸出 跳頁數字的物件ID ex: <span id="pagenumber"></span>
                , curPage: 1                      //所在頁次
                , pageSize: 10                    //顯示筆數
                , totalCount: 0                   //資料總筆數
                , autohide: true                  //無資料時是否自動隱藏跳頁
                , cloneid: []                     //複製跳頁的物件ID,(陣列字串)
                , uniqid: 1                       //element id
                , single: false                   //是否要個別使用跳頁(同一頁要有兩個跳頁請設true)
                , PageNumber_Size: 10             //數字跳頁,顯示10頁為一區(1,2,3,4,5,6,7,8,9,10)


                /* 回傳值 */
                , totalPage: 0                    //總頁數
                , PageNumber_epos: 0              //數字跳頁區,頁次結束
                , PageNumber_spos: 0              //數字跳頁區,頁次啟始
                , PageNumber_html: ''             //數字跳頁 HTML


                /* call back */
                , success: function (options) {   //回傳 options 的資料
                    return $(this);
                }
            };


            var options = $.extend(defaults, options);  //設定 options 的預設值，如果有傳入 options 則用傳入的，否則就使用預設值。
            var me = $(this);

            return this.each(function () {
                var o = options;
                var _jump_number_var_id = '_jump_page_';   //指定 跳頁數字的 ID 名稱
                var _jump_number_html = '';                //產生 跳頁數字的 HTML

                if (typeof (o.user_defined) != "boolean") o.user_defined = false;
                if (typeof (o.autohide) != "boolean") o.autohide = false;
                if (typeof (o.cloneid) != "object") o.cloneid = [];
                if (typeof (o.uniqid) != "number") o.uniqid = 1;
                if (typeof (o.loading) != "string") o.loading = '';
                me.html('');

                var _jump_first_id = '_jump_first_' + o.uniqid;        //第一頁            ex: _jump_first_1
                var _jump_prev_id = '_jump_prev_' + o.uniqid;          //上一頁            ex: _jump_prev_1
                var _jump_next_id = '_jump_next_' + o.uniqid;          //下一頁            ex: _jump_next_1
                var _jump_end_id = '_jump_end_' + o.uniqid;            //最終頁            ex: _jump_end_1
                var _jump_toPage_id = '_jump_toPage_' + o.uniqid;      //跳到第N頁         ex: _jump_toPage_1
                var _jump_button_id = '_jump_button_' + o.uniqid;      //BUTTON 跳到第N頁  ex: _jump_button_1
                var _jump_to_id = '_jump_to_' + o.uniqid; //文字視窗跳頁 2015/1/27
                 
                o.totalPage = Math.ceil(o.totalCount / o.pageSize);    //總頁數

                /* 跳頁數字的 變數  *****************************************************************************************/
                var _curPageArea = Math.ceil(o.curPage / o.PageNumber_Size);            //目前所在的頁區(ex: 1-10頁為一區)
                o.PageNumber_epos = (_curPageArea * o.PageNumber_Size);                 //頁次結束
                if (o.PageNumber_epos > o.totalPage) o.PageNumber_epos = o.totalPage;   //如果 "頁次結束" > 總頁數
                if (o.PageNumber_epos < o.PageNumber_Size) {
                    o.PageNumber_spos = 1;
                } else {
                    o.PageNumber_spos = (o.PageNumber_epos - o.PageNumber_Size) + 1;        //頁次啟始


                    
                   // alert(o.jumpArea);

                    switch(o.jumpArea) {
                        case "m":  //mobile
                             
                            //mity 2015/2 start
                            if (parseInt(o.curPage) > 2 && parseInt(o.totalPage) > 2) {
                                o.PageNumber_spos = parseInt(o.curPage) - 1; //起始頁
                                o.PageNumber_epos = parseInt(o.PageNumber_spos) + o.PageNumber_Size - 1;
                            }

                            if (o.PageNumber_epos > o.totalPage) { o.PageNumber_epos = o.totalPage; } //最終頁 
                            if (o.totalPage - o.curPage < o.PageNumber_Size) { o.PageNumber_spos = o.PageNumber_epos - o.PageNumber_Size + 1; } //

                            
                            break;
                      
                        default: //web
                            //mity 2015/2 start
                            if (parseInt(o.curPage) > 5 && parseInt(o.totalPage) > 5) {
                                o.PageNumber_spos = parseInt(o.curPage) - 4; //起始頁
                                o.PageNumber_epos = parseInt(o.PageNumber_spos) + o.PageNumber_Size - 1;
                            }

                            if (o.PageNumber_epos > o.totalPage) { o.PageNumber_epos = o.totalPage; } //最終頁 
                            if (o.totalPage - o.curPage < o.PageNumber_Size) { o.PageNumber_spos = o.PageNumber_epos - o.PageNumber_Size + 1; } //
                    } 

           


                    //alert("now="+ o.curPage )
                    //alert("tot=" + o.totalPage);
                    //alert("start=" + o.PageNumber_spos);
                    //alert("end=" + o.PageNumber_epos);
                    //mity 2015/2 end
                }


                /* 產生版型 *************************************************************************************************/
                GeneralJumpNumber();     //產出數字跳頁 HTML <a href="">1</a>  <a href="">2</a>  <a href="">3</a>
                GeneralJumpPageHTML();   //產出跳頁版型 HTML (固定的版型,可設定 user_defined=true 來使用自訂版型)

                /* 回呼 */
                o.success(options);

                /************************************************************************************************************/

                /* submit form 跳頁 */
                function DataBind() {
                    //alert('formid=' + o.formid);
                    var _formObj = $('#' + o.formid);
                    var _form_topage = _formObj.children('input[name="topage"]');

                    if (_form_topage.length == 0) {
                        _formObj.append('<input type="hidden" name="topage" id="topage" value="' + o.curPage + '" />');
                        _form_topage = _formObj.children('input[name="topage"]');
                    } else {
                        _form_topage.val(o.curPage);
                    }

                    //alert('form topage=' + _form_topage.val());

                    _formObj.submit();
                }

                //ajax載入
                function DataBind_ajax() {
                    //alert('curPage=' + o.curPage);

                    //判斷要傳遞的參數格式: json or string
                    var _data = o.databind.data;  //object=json格式資料 (ex: {L='xxx',M='xxxx'}) , string = 字串URL (ex: L=xxxx&M=xxxx)
                    if (typeof (_data) == "object") _data = $.param(_data);   //將 Json 轉成 String
                    if (typeof (o.databind.showloading) != "boolean") o.databind.showloading = true;
                    if (o.databind.showloading) $('#' + o.databind.bindid).html(o.loading);

                    //讀取 DataBind 資料
                    $.ajax({
                        type: o.databind.type,
                        url: o.databind.url,
                        data: _data + '&P=' + o.curPage + '&PS=' + o.pageSize,
                        cache: false,
                        success: function (html) {
                            $('#' + o.databind.bindid).html(html);  //輸出排排站商品

                            if (o.single == true) {
                                o.totalCount = eval("_totalCount" + o.uniqid);   //取得不同來源資料總筆數
                            } else {
                                o.totalCount = _totalCount;   //取得資料總筆數
                            }
                            GeneralJumpPageHTML();        //載入跳頁 script
                            o.callback(o);                //回傳變數資料
                        },
                        error: function (html) {
                            $('#' + o.databind.bindid).html("資料錯誤");
                        }
                    });
                }

                /* Bind 跳頁  */
                function BindJump() {

                    //設定頁面上要顯示的變數值 *****************************************************/   
                    //var aa = $('body').children('*[id="pagenumber"]');
                    //var bb = $('div[id="pagenumber"]');
                    //var cc = $('span[id="pagenumber"]');
                    $('#' + o.pagenumberid).each(function () {  //跳頁數字 HTML
                        $(this).html(o.PageNumber_html);
                    });

                    $('span[id="_jump_totalcount"]').each(function () {  //總筆數
                        $(this).html(o.totalCount);
                    });

                    $('span[id="_jump_totalpage"]').each(function () {  //總頁數
                        $(this).html(o.totalPage);
                    });

                    $('span[id="_jump_curpage"]').each(function () {  //目前所在頁次
                        $(this).html(o.curPage);
                    });
                    /*******************************************************************************/
                    //跳頁數字 的 Bind Click
                    for (var i = o.PageNumber_spos; i <= o.PageNumber_epos; i++) {
                        var _jump_page_id = _jump_number_var_id + i;
                        $('a[id=' + _jump_page_id + ']').unbind('click').click(function () {
                            var _page = $(this).attr('id').replace(_jump_number_var_id, '');

                            //alert($(this).attr('id') + ',' + $(this).attr('id').replace(_jump_number_var_id, ''));

                            o.curPage = _page;
                            DataBind();
                            return false;
                        });
                    }

                    //下一頁
                    $('a[id=' + _jump_next_id + ']').unbind('click').click(function () {
                       // alert($('a[id=' + _jump_first_id + ']'));
                        //if (o.curPage > o.totalPage) o.curPage = o.totalPage;
                        if (o.curPage < o.totalPage) {
                            o.curPage += 1;
                            DataBind();
                        }
                        return false;
                    });

                    //第一頁
                    $('a[id=' + _jump_first_id + ']').unbind('click').click(function () { 
                        if (o.curPage != 1) {
                            o.curPage = 1; 
                            DataBind();
                        }
                        return false;
                    });

  
                    //最終頁
                    $('a[id=' + _jump_end_id + ']').unbind('click').click(function () {                       
                        if (o.curPage != o.totalPage) {
                            o.curPage = o.totalPage;
                            DataBind();
                        }
                        return false;
                    });

                    //上一頁
                    $('a[id=' + _jump_prev_id + ']').unbind('click').click(function () {
                        if (o.curPage > 1) {
                            o.curPage -= 1;
                            if (o.curPage <= 0) o.curPage = 1;
                            DataBind();
                        }
                        return false;
                    });

                    $("a[id='_jump_to_1']").blur(function () {
                        alert('ok');
                    })
               
                    ////文字視窗跳頁
                    //$('a[id=' + _jump_to_id + ']').unbind('blur').blur(function () {
                    //    alert('ss');
                    //    if (o.curPage > 1) {
                    //        o.curPage -= 1;
                    //        if (o.curPage <= 0) o.curPage = 1;
                    //        DataBind();
                    //    }
                    //    return false;
                    //});

                    //BUTTON 跳到第N頁
                    $('input[id=' + _jump_button_id + ']').unbind('click').click(function () {
                        o.curPage = parseInt($('input[id=' + _jump_toPage_id + ']').val()) || 1;
                        if (o.curPage <= o.totalPage) DataBind();
                        return false;
                    });

                    //跳到第N頁的值改變,將Clone的值也改變
                    $('input[id=' + _jump_toPage_id + ']').unbind('change').change(function () {
                        $('input[id=' + _jump_toPage_id + ']').val(this.value);
                    });
                }

                //產生跳頁數字 HTML
                function GeneralJumpNumber() {

                 //   alert('o.PageNumber_spos=' + o.PageNumber_spos + ' , o.PageNumber_epos = ' + o.PageNumber_epos);

                    var tmp = '';
                    for (var i = o.PageNumber_spos; i <= o.PageNumber_epos; i++) {
                        if (tmp.length > 0) tmp += '';
                        if (i == o.curPage) {
                            //tmp += '<span class="on">' + i + '</span>';
                            tmp += '<a href="javascript:void(0);" class="ON">' + i + '</a>';
                        } else {
                            var _jump_page_i = '_jump_page_' + i;
                            tmp += '<a href="" id="' + _jump_page_i + '">' + i + '</a>';
                        }
                    }

                   // alert(tmp);
                      
                    o.PageNumber_html = tmp;
                }


                //產生跳頁 HTML
                function GeneralJumpPageHTML() {
                    var tmp = '';

                    if (!o.user_defined) {  //沒使用自訂版型
                        //                    if (o.curPage == 1) {
                        //                        tmp += "<a title=\"第一頁\" >第一頁</a>";
                        //                        tmp += "<a title=\"上一頁\" >上一頁</a>";
                        //                    } else {
                        tmp += "<a title=\"第一頁\" id='" + _jump_first_id + "' href=''>第一頁</a>";
                        tmp += "<a title=\"上一頁\" id='" + _jump_prev_id + "'  href=''>上一頁</a>";
                        //}

                        //                    if (o.curPage == o.totalPage) {
                        //                        tmp += "<a title=\"下一頁\" >下一頁</a>";
                        //                        tmp += "<a title=\"最終頁\" >最終頁</a>";
                        //                    } else {
                        tmp += "<a title=\"下一頁\" id='" + _jump_next_id + "' href=''>下一頁</a>";
                        tmp += "<a title=\"最終頁\" id='" + _jump_end_id + "'  href=''>最終頁</a>";
                        //}

                        tmp += "，在第<span class='red' id='_jump_curpage'>" + o.curPage + "</span>頁"
                        tmp += "，跳到第<input type=\"text\" id='" + _jump_toPage_id + "' style='width: 25px;text-align: center' value='" + o.curPage + "'\>頁";
                        tmp += "<input type='button' class='okbtn' value='確 定' id='" + _jump_button_id + "'\>";
                        tmp += " / 共<span class='red' id='_jump_totalpage'>" + o.totalPage + "</span>頁 / 共<span class='red' id='_jump_totalcount'>" + o.totalCount + "</span>筆";


                        if (o.autohide && o.totalPage == 0) tmp = '';

                        me.html(tmp);   //輸出跳頁版型

                        //複製跳頁
                        for (i = 0; i < o.cloneid.length; i++) {
                            $('#' + o.cloneid[i]).html(tmp);
                        }

                        //設定 "跳到第N頁" 的頁次為下一頁
                        var topage = o.curPage + 1;
                        if (topage > o.totalPage) topage = 1;
                        if (topage < 0) topage = 1;
                        $('input[id=' + _jump_toPage_id + ']').val(topage);

                    }

                    BindJump();   /* Bind 跳頁  */
                }

            });
        }
    });
})(jQuery);