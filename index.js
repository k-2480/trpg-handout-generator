window.onbeforeunload = function (event) {
    event = event || window.event;
    event.returnValue = 'ページをリロードすると内容が失われますがよろしいですか？';
}

/**
 * 半角英数字を全角英数字に変換して返却する
 * @param {String} str 
 */
function hankaku2Zenkaku(str) {
    return str.replace(/[A-Za-z0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0)
    })
}

/**
 * 半角カタカナを全角カタカナに変換して返却する
 * @param {String} str 
 */
function hankana2Zenkana(str) {
    var kanaMap = {
        'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
        'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
        'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
        'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
        'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
        'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
        'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
    }

    var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    return str
            .replace(reg, function (match) {
                return kanaMap[match];
            })
            .replace(/ﾞ/g, '゛')
            .replace(/ﾟ/g, '゜')
}

/**
 * 半角をすべて全角に変換し返却する
 * @param {String} str 
 */
function han2zen(str) {
    return hankaku2Zenkaku(hankana2Zenkana(str))
}

/**
 * 入力フォームのオブジェクトを新規で作成する
 * @param {number} id 
 */
function generateFormObject(id) {
    return {
        id: id,
        front: {
            title: '',
            heading: '',
            content: ''
        },
        back: {
            title: '',
            heading: '',
            content: ''
        }
    }
}

/**
 * 全てのキャンバスをVueのdataの内容で再描画する
 * @param {Object} cardList 
 */
function allCanvasRedraw(cardList) {
    var canvases = document.querySelectorAll('canvas.card-canvas')

    canvases.forEach(function(element) {
        var context = element.getContext('2d')

        /* キャンバスデータ */
        // カードのID
        var canvasId = element.dataset.canvasnum
        // 表か裏か
        var isFront = (element.dataset.type == 'front')
        // カードのデータ
        var card = cardList[canvasId]

        context.clearRect(0, 0, element.width, element.height)
        context.fillStyle = (isFront ? 'white' : 'black')
        context.fillRect(0, 0, element.width, element.height)

        if (!isFront) {
            context.fillStyle = 'white'
        }

        /* キャンバス設定 */
        var fontSize = 20
        var canvasPadding = 35
        var fontFamily = '\'ＭＳ　ゴシック\''
        
        /* 基本描画設定 */
        context.fillStyle = "#222";
        context.font = fontSize + "px " + fontFamily;
        context.textAlign = "left";
        context.textBaseline = "top";

        console.log(context.font)

        /* 枠 */
        context.strokeRect(10, 40, element.width - 20, element.height - 50)
        if (!isFront) {
            var oldFillStyle = context.fillStyle
            context.fillStyle = 'white'
            context.fillRect(10, 40, element.width - 20, element.height - 50)
            context.fillStyle = oldFillStyle
        }

        context.moveTo(80, 40)
        context.lineTo(80, 80)
        context.stroke()

        context.moveTo(10, 80)
        context.lineTo(element.width - 10, 80)
        context.stroke()

        /* キャプション */
        //var caption = (isFront ? 'Ｈａｎｄｏｕｔ' : card.front.heading)
        var caption = 'Ｈａｎｄｏｕｔ'
        var captionSize = 20
        var oldFont = context.font
        context.fillStyle = (isFront ? 'black' : 'white')
        context.font =  'bold ' + captionSize + 'px ' + fontFamily
        context.fillText(caption, (element.width - (caption.length * captionSize)) / 2, 10)
        context.font = oldFont

        /* 見出し */
        //var headingText = (isFront ? card.front.heading : 'トリガー')
        var headingText = (isFront ? card.front.heading : card.back.heading)
        oldFont = context.font
        context.font =  '14px ' + fontFamily
        context.fillStyle = 'black'
        context.fillText(headingText, 15, 60 - 7, 4 * 12)
        context.font = oldFont

        /* タイトル */
        context.fillStyle = 'black'
        oldFont = context.font
        context.font = '16px ' + fontFamily
        context.fillText((isFront ? card.front.title : card.back.title), 85, 60 - 8, 20 * fontSize)
        context.font = oldFont

        /* 内容 */
        var charInfo = {
            x: 0,
            y: 0,
            yOffset: 90
        }
        context.font = fontSize + 'px ' + fontFamily
        var titleStr = han2zen((isFront ? card.front.content : card.back.content)).slice('')
        var maxColumn = Math.floor((element.width - canvasPadding * 2) / fontSize)
        for (var i = 0; i < titleStr.length; i++) {
            drawChar(titleStr[i], charInfo, canvasPadding, fontSize, maxColumn)
        }

        function drawChar(char, charInfo, padding, fontSize, maxColumn) {
            context.fillText(char,
                padding + (charInfo.x * fontSize) - fontSize,
                charInfo.yOffset + charInfo.y * fontSize,
                maxColumn * fontSize)

            charInfo.x++;

            if (char == '\n'
                || charInfo.x > maxColumn) {
                charInfo.x = 0
                charInfo.y += 1
            }
        }
    });
}

// Vue インスタンス
var vm = new Vue({
    el: '#app',
    data: {
        cardList: [
            generateFormObject(0)
        ]
    },
    updated: function() {allCanvasRedraw(this.cardList)},
    methods: {
        addCard: function() {
            var maxCardId = 0

            // カードIDの最大を求める
            for (card of this.cardList) {
                if (card.id > maxCardId) {
                    maxCardId = card.id
                }
            }

            var nextCardId = maxCardId * 1.0 + 1
            console.log('add ' + nextCardId + ' card')

            // 新たなカードデータをカードリストに追加する
            this.cardList.push(generateFormObject(nextCardId))
        },
        deleteCard: function(element) {
            var targetCardNum = element.target.dataset.cardnum

            if (targetCardNum == 0 && this.cardList.length == 1) {
                alert('カードを0枚にすることはできません！')
                return
            }

            this.cardList.splice(targetCardNum, 1)

            for (var i = targetCardNum; i < this.cardList.length; i++) {
                this.cardList[i].id = i
            }
        },
        toggleTabs: function(element) {
            if (element.target.classList.contains('active')) {
                return
            }

            var targetTabNodeList = document.querySelectorAll('.tab')
            var targetTabContentNodeList = document.querySelectorAll('.tab-content')

            targetTabNodeList.forEach(function(element) {
                element.classList.toggle('active')
            })

            targetTabContentNodeList.forEach(function(element) {
                element.classList.toggle('hidden')
            })
        }
    }
})
