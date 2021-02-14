/* クラス */

// TODO クラス化したい

/* 関数 */

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

    var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g')
    return str
            .replace(reg, function (match) {
                return kanaMap[match]
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
            name: 'ＨＡＮＤＯＵＴ',
            title: '',
            heading: '',
            content: '',
            font: 'sans-serif'
        },
        back: {
            name: 'ＨＡＮＤＯＵＴ',
            title: '',
            heading: '',
            content: '',
            font: 'sans-serif'
        }
    }
}

/**
 * 入力フォームのオブジェクトが編集されていないかをチェックし
 * 更新されていなければtrueを、更新されていればfalseを返す
 * @param {object} formObject 
 * @return {boolean}
 */
function checkFormObjectNoUpdate(formObject) {
    var front = formObject.front
    var back = formObject.back
    var emptyFlg = true
    var defaultFormObject = generateFormObject(formObject.id)

    Object.keys(front).forEach(key => {
        if (front[key] != defaultFormObject.front[key]) {
            emptyFlg = false
            return
        }
    })
    Object.keys(back).forEach(key => {
        if (front[key] != defaultFormObject.back[key]) {
            emptyFlg = false
            return
        }
    })

    return emptyFlg
}

/**
 * 全てのキャンバスをVueのdataの内容で再描画する
 * TODO: ぐちゃぐちゃなのでクラスを使うなどして整理したい
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

        /* キャンバス設定 */
        var fontSize = 20
        var fontFamily = (isFront ? card.front.font : card.back.font)
        
        /* 基本描画設定 */
        context.fillStyle = "#222"
        context.font = fontSize + "px " + fontFamily
        context.textAlign = "left"
        context.textBaseline = "top"

        // レイアウト情報
        cardLayoutInfo = {
            content: {
                top: 80,
                left: 10,
                width: element.width - 20,
                height: element.height - 90,
                isBordered: true,
                textPadding: 6
            },
            heading: {
                top: 40,
                left: 10,
                width: 70,
                height: 40,
                isBordered: true,
                textPadding: 10
            },
            title: {
                top: 40,
                left: 80,
                width: element.width - 90,
                height: 40,
                isBordered: true,
                textPadding: 10
            }
        }

        /* 枠 */
        // 裏の場合は白く塗りつぶす
        if (!isFront) {
            var oldFillStyle = context.fillStyle
            context.fillStyle = 'white'
            for (var key in cardLayoutInfo) {
                if (cardLayoutInfo[key].isBordered) {
                    context.fillRect(cardLayoutInfo[key].left, cardLayoutInfo[key].top, cardLayoutInfo[key].width, cardLayoutInfo[key].height)
                }
            }
            context.fillStyle = oldFillStyle
        }
        // 枠線を引く
        for (var key in cardLayoutInfo) {
            if (cardLayoutInfo[key].isBordered) {
                context.strokeRect(cardLayoutInfo[key].left, cardLayoutInfo[key].top, cardLayoutInfo[key].width, cardLayoutInfo[key].height)
            }
        }

        /* キャプション */
        var caption = han2zen(isFront ? card.front.name : card.back.name)
        var captionSize = 20
        var oldFont = context.font
        var captionWidth = caption.length * captionSize
        if (captionWidth > element.width) {
            captionWidth = element.width
        }
        var captionX = (element.width - captionWidth) / 2
        context.fillStyle = (isFront ? 'black' : 'white')
        context.font =  'bold ' + captionSize + 'px ' + fontFamily
        context.fillText(caption, captionX, 10, element.width)
        context.font = oldFont

        /* 見出し */
        var headingText = (isFront ? card.front.heading : card.back.heading)
        var headingParam = {
            left: 15,
            top: 53,
            maxWidth: 60
        }
        oldFont = context.font
        context.font =  '14px ' + fontFamily
        context.fillStyle = 'black'
        context.fillText(headingText, headingParam.left, headingParam.top, headingParam.maxWidth)
        context.font = oldFont

        /* タイトル */
        var titleParam = {
            left: 85,
            top: 52,
            maxWidth: 250
        }
        context.fillStyle = 'black'
        oldFont = context.font
        context.font = '16px ' + fontFamily
        context.fillText((isFront ? card.front.title : card.back.title), titleParam.left, titleParam.top, titleParam.maxWidth)
        context.font = oldFont

        /* 内容 */
        var charInfo = {
            x: 0,
            y: 0,
            yOffset: cardLayoutInfo.content.top + cardLayoutInfo.content.textPadding,
            fontSize: fontSize
        }
        var oldFontSize = fontSize
        var contentWidth = cardLayoutInfo.content.width - cardLayoutInfo.content.textPadding * 2
        var contentHeight = cardLayoutInfo.content.height - cardLayoutInfo.content.textPadding * 2

        var titleStr = han2zen((isFront ? card.front.content : card.back.content)).slice('')

        charInfo.fontSize = calcDrawCharFontSize(titleStr, contentWidth, contentHeight, charInfo.fontSize)

        context.font = charInfo.fontSize + 'px ' + fontFamily
        var maxColumn = Math.floor(contentWidth / charInfo.fontSize) 
        for (var i = 0; i < titleStr.length; i++) {
            drawChar(titleStr[i], charInfo, cardLayoutInfo.content.left + cardLayoutInfo.content.textPadding, charInfo.fontSize, maxColumn)
        }
        fontSize = oldFontSize

        function calcDrawCharFontSize(titleStrArr, contentWidth, contentHeight, defaultFontSize) {
            var contentInfo = {
                x: 0,
                y: 0,
                fontSize: defaultFontSize
            }
            for (var i = 0; i < titleStrArr.length; i++) {
                contentInfo.x++
                if (titleStrArr[i] == '\n' || contentInfo.x * contentInfo.fontSize > contentWidth) {
                    contentInfo.x = 0
                    contentInfo.y++
                }
                if ((contentInfo.y + 1) * contentInfo.fontSize > contentHeight) {
                    contentInfo.fontSize--
                    i = 0
                    contentInfo.x = 0
                    contentInfo.y = 0
                }
            }

            return contentInfo.fontSize
        }

        function drawChar(char, charInfo, padding, fontSize, maxColumn) {
            context.fillText(char,
                padding + (charInfo.x * fontSize),
                charInfo.yOffset + charInfo.y * fontSize,
                maxColumn * fontSize)

            charInfo.x++

            if (char == '\n'
                || charInfo.x > maxColumn - 1) {
                charInfo.x = 0
                charInfo.y += 1
            }
        }
    })
}

// Vue インスタンス
var vm = new Vue({
    el: '#app',
    data: {
        cardList: [
            generateFormObject(0)
        ],
        isAddCard: false
    },
    updated: function() {
        allCanvasRedraw(this.cardList)
        if (this.isAddCard) {
            this.scrollWindow()
            this.isAddCard = false
        }
    },
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
            console.log('add card [ID:' + nextCardId + ']')

            // 新たなカードデータをカードリストに追加する
            this.cardList.push(generateFormObject(nextCardId))
            this.isAddCard = true
        },
        deleteCard: function(element) {
            var targetCardNum = element.target.dataset.cardnum

            if (targetCardNum == 0 && this.cardList.length == 1) {
                alert('カードを0枚にすることはできません')
                return
            }

            if (!checkFormObjectNoUpdate(this.cardList[targetCardNum])) {
                var resultConfirm = window.confirm('入力された内容がクリアされます。カード' + (targetCardNum * 1.0 + 1) + 'を削除しますか？')
                if (!resultConfirm) {
                    return
                }
            }

            console.log('delete card [ID:' + targetCardNum + ']')
            this.cardList.splice(targetCardNum, 1)

            for (var i = targetCardNum; i < this.cardList.length; i++) {
                this.cardList[i].id = i
            }
        },
        toggleTabs: function(element) {
            if (element.target.classList.contains('active')) {
                return
            }

            allCanvasRedraw(this.cardList)

            var targetTabNodeList = document.querySelectorAll('.tab')
            var targetTabContentNodeList = document.querySelectorAll('.tab-content')

            targetTabNodeList.forEach(function(element) {
                element.classList.toggle('active')
            })

            targetTabContentNodeList.forEach(function(element) {
                element.classList.toggle('hidden')
            })
        },
        scrollWindow: function() {
            var element = document.documentElement
            var bottom = element.scrollHeight - element.clientHeight
            window.scroll(0, bottom)
        },
        focusInputForm: function(element) {
            var label = element.target.nextElementSibling
            if (element.target.value == '') {
                label.classList.toggle('focus')
            }
        }
    }
})

/* イベント */
window.onbeforeunload = function (event) {
    event = event || window.event
    event.returnValue = 'ページをリロードすると内容が失われますがよろしいですか？'
}
