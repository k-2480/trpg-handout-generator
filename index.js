/* クラス */

// TODO クラス化したい

/* 関数 */

/**
 * 半角英数字を全角英数字に変換して返却する
 * @param {String} str
 */
function hankaku2Zenkaku(str) {
    return str.replace(/[A-Za-z0-9]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
    });
}

/**
 * 半角カタカナを全角カタカナに変換して返却する
 * @param {String} str
 */
function hankana2Zenkana(str) {
    var kanaMap = {
        ｶﾞ: "ガ",
        ｷﾞ: "ギ",
        ｸﾞ: "グ",
        ｹﾞ: "ゲ",
        ｺﾞ: "ゴ",
        ｻﾞ: "ザ",
        ｼﾞ: "ジ",
        ｽﾞ: "ズ",
        ｾﾞ: "ゼ",
        ｿﾞ: "ゾ",
        ﾀﾞ: "ダ",
        ﾁﾞ: "ヂ",
        ﾂﾞ: "ヅ",
        ﾃﾞ: "デ",
        ﾄﾞ: "ド",
        ﾊﾞ: "バ",
        ﾋﾞ: "ビ",
        ﾌﾞ: "ブ",
        ﾍﾞ: "ベ",
        ﾎﾞ: "ボ",
        ﾊﾟ: "パ",
        ﾋﾟ: "ピ",
        ﾌﾟ: "プ",
        ﾍﾟ: "ペ",
        ﾎﾟ: "ポ",
        ｳﾞ: "ヴ",
        ﾜﾞ: "ヷ",
        ｦﾞ: "ヺ",
        ｱ: "ア",
        ｲ: "イ",
        ｳ: "ウ",
        ｴ: "エ",
        ｵ: "オ",
        ｶ: "カ",
        ｷ: "キ",
        ｸ: "ク",
        ｹ: "ケ",
        ｺ: "コ",
        ｻ: "サ",
        ｼ: "シ",
        ｽ: "ス",
        ｾ: "セ",
        ｿ: "ソ",
        ﾀ: "タ",
        ﾁ: "チ",
        ﾂ: "ツ",
        ﾃ: "テ",
        ﾄ: "ト",
        ﾅ: "ナ",
        ﾆ: "ニ",
        ﾇ: "ヌ",
        ﾈ: "ネ",
        ﾉ: "ノ",
        ﾊ: "ハ",
        ﾋ: "ヒ",
        ﾌ: "フ",
        ﾍ: "ヘ",
        ﾎ: "ホ",
        ﾏ: "マ",
        ﾐ: "ミ",
        ﾑ: "ム",
        ﾒ: "メ",
        ﾓ: "モ",
        ﾔ: "ヤ",
        ﾕ: "ユ",
        ﾖ: "ヨ",
        ﾗ: "ラ",
        ﾘ: "リ",
        ﾙ: "ル",
        ﾚ: "レ",
        ﾛ: "ロ",
        ﾜ: "ワ",
        ｦ: "ヲ",
        ﾝ: "ン",
        ｧ: "ァ",
        ｨ: "ィ",
        ｩ: "ゥ",
        ｪ: "ェ",
        ｫ: "ォ",
        ｯ: "ッ",
        ｬ: "ャ",
        ｭ: "ュ",
        ｮ: "ョ",
        "｡": "。",
        "､": "、",
        ｰ: "ー",
        "｢": "「",
        "｣": "」",
        "･": "・",
        '"': "”",
        "'": "’",
    };

    var reg = new RegExp("(" + Object.keys(kanaMap).join("|") + ")", "g");
    return str
        .replace(reg, function (match) {
            return kanaMap[match];
        })
        .replace(/ﾞ/g, "゛")
        .replace(/ﾟ/g, "゜");
}

/**
 * UUID ver4 を生成
 */
function generateUuid() {
    let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, l = chars.length; i < l; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

/**
 * 半角をすべて全角に変換し返却する
 * @param {String} str
 */
function han2zen(str) {
    return hankaku2Zenkaku(hankana2Zenkana(str));
}

/**
 * 入力フォームのオブジェクトを新規で作成する
 * @param {number} id
 */
function generateFormObject(id) {
    var skeleton = {
        id: id,
        front: {
            name: "ＨＡＮＤＯＵＴ",
            title: "",
            heading: "",
            content: "",
            font: "sans-serif",
            filename: generateUuid(),
        },
        back: {
            name: "ＨＡＮＤＯＵＴ",
            title: "",
            heading: "",
            content: "",
            font: "sans-serif",
            filename: generateUuid(),
        },
    };
    var currentFont = document.querySelector("#global-font-setting");
    if (currentFont && currentFont.value != "") {
        skeleton.front.font = currentFont.value;
        skeleton.back.font = currentFont.value;
    }

    return skeleton;
}

/**
 * 入力フォームのオブジェクトが編集されていないかをチェックし
 * 更新されていなければtrueを、更新されていればfalseを返す
 * @param {object} formObject
 * @return {boolean}
 */
function checkFormObjectNoUpdate(formObject) {
    var front = formObject.front;
    var back = formObject.back;
    var emptyFlg = true;
    var defaultFormObject = generateFormObject(formObject.id);

    Object.keys(front).forEach((key) => {
        if (front[key] != defaultFormObject.front[key]) {
            emptyFlg = false;
            return;
        }
    });
    Object.keys(back).forEach((key) => {
        if (back[key] != defaultFormObject.back[key]) {
            emptyFlg = false;
            return;
        }
    });

    return emptyFlg;
}

/**
 * カードのフォントがデフォルトフォントから変更されていないことをチェックし
 * 変更されていればtrueを、変更されていなければfalseを返す
 * @param {object} formObject
 * @returns {boolean}
 */
function checkFormObjectFontNoUpdate(formObject) {
    return false;
}

/**
 * 全てのキャンバスをVueのdataの内容で再描画する
 * TODO: ぐちゃぐちゃなのでクラスを使うなどして整理したい
 * @param {Object} cardList
 */
function allCanvasRedraw(cardList) {
    var canvases = document.querySelectorAll("canvas.card-canvas");

    canvases.forEach(function (element) {
        var context = element.getContext("2d");

        /* キャンバスデータ */
        // カードのID
        var canvasId = element.dataset.canvasnum;
        // 表か裏か
        var isFront = element.dataset.type == "front";
        // カードのデータ
        var card = cardList[canvasId];

        context.clearRect(0, 0, element.width, element.height);
        context.fillStyle = isFront ? "white" : "black";
        context.fillRect(0, 0, element.width, element.height);

        /* キャンバス設定 */
        var fontSize = 40;
        var fontFamily = isFront ? card.front.font : card.back.font;

        /* 基本描画設定 */
        context.fillStyle = "#222";
        context.font = fontSize + "px " + fontFamily;
        context.textAlign = "left";
        context.textBaseline = "top";
        context.lineWidth = 2.0;

        // レイアウト情報
        var cardLayoutInfo = {
            content: {
                top: 160,
                left: 20,
                width: element.width - 40,
                height: element.height - 180,
                isBordered: true,
                textPadding: 12,
            },
            heading: {
                top: 80,
                left: 20,
                width: 140,
                height: 80,
                isBordered: true,
                textPadding: 20,
            },
            title: {
                top: 80,
                left: 160,
                width: element.width - 180,
                height: 80,
                isBordered: true,
                textPadding: 20,
            },
        };

        /* 枠 */
        // 裏の場合は白く塗りつぶす
        if (!isFront) {
            var oldFillStyle = context.fillStyle;
            context.fillStyle = "white";
            for (var key in cardLayoutInfo) {
                if (cardLayoutInfo[key].isBordered) {
                    context.fillRect(
                        cardLayoutInfo[key].left,
                        cardLayoutInfo[key].top,
                        cardLayoutInfo[key].width,
                        cardLayoutInfo[key].height
                    );
                }
            }
            context.fillStyle = oldFillStyle;
        }
        // 枠線を引く
        for (var key in cardLayoutInfo) {
            if (cardLayoutInfo[key].isBordered) {
                context.strokeRect(
                    cardLayoutInfo[key].left,
                    cardLayoutInfo[key].top,
                    cardLayoutInfo[key].width,
                    cardLayoutInfo[key].height
                );
            }
        }

        /* キャプション */
        var caption = han2zen(isFront ? card.front.name : card.back.name);
        var captionSize = 40;
        var oldFont = context.font;
        var captionWidth = caption.length * captionSize;
        if (captionWidth > element.width) {
            captionWidth = element.width;
        }
        var captionX = (element.width - captionWidth) / 2;
        context.fillStyle = isFront ? "black" : "white";
        context.font = "bold " + captionSize + "px " + fontFamily;
        context.fillText(caption, captionX, 20, element.width);
        context.font = oldFont;

        /* 見出し */
        var headingText = isFront ? card.front.heading : card.back.heading;
        var headingParam = {
            left: 30,
            top: 100,
            maxWidth: 120,
        };
        oldFont = context.font;
        context.font = "40px " + fontFamily;
        context.fillStyle = "black";
        context.fillText(
            headingText,
            headingParam.left,
            headingParam.top,
            headingParam.maxWidth
        );
        context.font = oldFont;

        /* タイトル */
        var titleParam = {
            left: cardLayoutInfo.title.left + 10,
            top: 100,
            maxWidth: element.width - cardLayoutInfo.title.left - fontSize,
        };
        context.fillStyle = "black";
        oldFont = context.font;
        context.font = "40px " + fontFamily;
        context.fillText(
            isFront ? card.front.title : card.back.title,
            titleParam.left,
            titleParam.top,
            titleParam.maxWidth
        );
        context.font = oldFont;

        /* 内容 */
        var charInfo = {
            x: 0,
            y: 0,
            yOffset:
                cardLayoutInfo.content.top + cardLayoutInfo.content.textPadding,
            fontSize: fontSize,
        };
        var oldFontSize = fontSize;
        var contentWidth =
            cardLayoutInfo.content.width -
            cardLayoutInfo.content.textPadding * 2;
        var contentHeight =
            cardLayoutInfo.content.height -
            cardLayoutInfo.content.textPadding * 2;

        var titleStr = han2zen(
            isFront ? card.front.content : card.back.content
        ).slice("");

        charInfo.fontSize = calcDrawCharFontSize(
            titleStr,
            contentWidth,
            contentHeight,
            charInfo.fontSize
        );

        context.font = charInfo.fontSize + "px " + fontFamily;
        var maxColumn = Math.floor(contentWidth / charInfo.fontSize);
        for (var i = 0; i < titleStr.length; i++) {
            drawChar(
                titleStr[i],
                charInfo,
                cardLayoutInfo.content.left +
                    cardLayoutInfo.content.textPadding,
                charInfo.fontSize,
                contentWidth
            );
        }
        fontSize = oldFontSize;

        function calcDrawCharFontSize(
            titleStrArr,
            contentWidth,
            contentHeight,
            defaultFontSize
        ) {
            var contentInfo = {
                x: 0,
                y: 0,
                fontSize: defaultFontSize,
            };
            for (var i = 0; i < titleStrArr.length; i++) {
                contentInfo.x++;
                if (
                    titleStrArr[i] == "\n" ||
                    (1 + contentInfo.x) * contentInfo.fontSize > contentWidth
                ) {
                    contentInfo.x = 0;
                    contentInfo.y += 1.5;
                }
                if (
                    (contentInfo.y + 1.5) * contentInfo.fontSize >
                    contentHeight
                ) {
                    contentInfo.fontSize -= 0.5;
                    i = 0;
                    contentInfo.x = 0;
                    contentInfo.y = 0;
                }
            }

            return contentInfo.fontSize;
        }

        function drawChar(char, charInfo, padding, fontSize, contentWidth) {
            context.fillText(
                char,
                padding + charInfo.x * fontSize,
                charInfo.yOffset + charInfo.y * fontSize,
                contentWidth
            );

            charInfo.x++;

            if (char == "\n" || (1 + charInfo.x) * fontSize > contentWidth) {
                charInfo.x = 0;
                charInfo.y += 1.5;
            }
        }
    });
}

// Vue インスタンス
var vm = new Vue({
    el: "#app",
    data: {
        cardList: [generateFormObject(0)],
        isAddCard: false,
        isDeleteCard: false,
        globalFontSetting: "sans-serif",
    },
    updated: function () {
        allCanvasRedraw(this.cardList);
        if (this.isAddCard) {
            this.scrollWindow();
            this.resetFocusInputForm();
            this.isAddCard = false;
        }
        if (this.isDeleteCard) {
            this.resetFocusInputForm();
            this.isDeleteCard = false;
        }
    },
    methods: {
        window: (onload = function () {
            this.document.querySelector("#card-output-tab").click();
            this.document.querySelector("#card-input-tab").click();
        }),
        addCard: function () {
            var maxCardId = 0;

            // カードIDの最大を求める
            for (card of this.cardList) {
                if (card.id > maxCardId) {
                    maxCardId = card.id;
                }
            }

            var nextCardId = maxCardId * 1.0 + 1;
            console.log("add card [ID:" + nextCardId + "]");

            // 新たなカードデータをカードリストに追加する
            this.cardList.push(generateFormObject(nextCardId));
            this.isAddCard = true;
        },
        deleteCard: function (element) {
            var targetCardNum = element.target.dataset.cardnum;

            if (targetCardNum == 0 && this.cardList.length == 1) {
                alert("カードを0枚にすることはできません");
                return;
            }

            if (!checkFormObjectNoUpdate(this.cardList[targetCardNum])) {
                var resultConfirm = window.confirm(
                    "入力された内容がクリアされます。カード" +
                        (targetCardNum * 1.0 + 1) +
                        "を削除しますか？"
                );
                if (!resultConfirm) {
                    return;
                }
            }

            console.log("delete card [ID:" + targetCardNum + "]");
            this.cardList.splice(targetCardNum, 1);

            for (var i = targetCardNum; i < this.cardList.length; i++) {
                this.cardList[i].id = i;
            }

            this.isDeleteCard = true;
        },
        toggleTabs: function (element) {
            if (element.target.classList.contains("active")) {
                return;
            }

            allCanvasRedraw(this.cardList);

            var targetTabNodeList = document.querySelectorAll(".tab");
            var targetTabContentNodeList =
                document.querySelectorAll(".tab-content");

            targetTabNodeList.forEach(function (element) {
                element.classList.toggle("active");
            });

            targetTabContentNodeList.forEach(function (element) {
                element.classList.toggle("hidden");
            });
        },
        scrollWindow: function () {
            var element = document.documentElement;
            var bottom = element.scrollHeight - element.clientHeight;
            window.scroll(0, bottom);
        },
        focusInputForm: function (element) {
            var label = element.target.nextElementSibling;
            if (element.target.value == "") {
                label.classList.toggle("focus");
            }
        },
        resetFocusInputForm: function () {
            var cardFormGroupInput = document.querySelectorAll(
                ".card-form-group input, .card-form-group textarea"
            );
            cardFormGroupInput.forEach((element) => {
                console.log(element.value);
                var label = element.nextElementSibling;
                if (element.value == "") {
                    label.classList.remove("focus");
                } else {
                    label.classList.add("focus");
                }
            });
        },
        zoomCanvas: function (element) {
            let canvasContainer = element.target.parentNode;
            if (element.target.tagName != "CANVAS") {
                return;
            }
            canvasContainer.classList.toggle("zoom");
        },
        checkAllCardNoUpdate: function () {
            var isNotChanged = true;
            console.log(`globalFontSetting: ${this.globalFontSetting}`);
            console.log(
                `global-font-setting: ${
                    document.querySelector("#global-font-setting").value
                }`
            );
            this.cardList.forEach((card) => {
                console.log(card.front.font);
                console.log(card.back.font);
                isNotChanged = isNotChanged && checkFormObjectNoUpdate(card);
            });
            return isNotChanged;
        },
        changeGlobalFont: function (element) {
            var cardList = this.cardList;

            if (!this.globalFontSetting || this.globalFontSetting == "") {
                return;
            }

            if (!this.checkAllCardNoUpdate()) {
                var resultConfirm = window.confirm(
                    "すべてのカードのフォントを変更しますか？"
                );
                if (!resultConfirm) {
                    return;
                }
            }

            cardList.forEach((card) => {
                card.front.font = this.globalFontSetting;
                card.back.font = this.globalFontSetting;
            });
        },
        saveCanvasImage: function () {
            var zip = new JSZip();
            var canvases = document.querySelectorAll("canvas.card-canvas");
            var promises = new Array();
            var cardXmlList = new Array();
            var deckXml = "";
            var cardList = this.cardList;

            canvases.forEach((canvas) => {
                promises.push(
                    new Promise((resolve) => {
                        var cardInfo = cardList[canvas.dataset.canvasnum];
                        canvas.toBlob((blob) => {
                            var arrayBuffer = blob.arrayBuffer();
                            arrayBuffer.then((result) => {
                                crypto.subtle
                                    .digest("SHA-256", result)
                                    .then((hashBuffer) => {
                                        var hashArray = Array.from(
                                            new Uint8Array(hashBuffer)
                                        );
                                        var hashHex = hashArray
                                            .map((b) =>
                                                b.toString(16).padStart(2, "0")
                                            )
                                            .join("");
                                        zip.file(hashHex + ".png", blob, {
                                            base64: true,
                                        });
                                        if (canvas.dataset.type == "front") {
                                            cardInfo.front.filename = hashHex;
                                        } else {
                                            cardInfo.back.filename = hashHex;
                                        }
                                        resolve(hashHex);
                                    });
                            });
                        });
                    })
                );
            });

            Promise.all(promises).then(function (values) {
                cardList.forEach((card) => {
                    console.log(card.id);
                    cardXmlList.push(
                        createCardXml(
                            card.front.filename,
                            card.back.filename,
                            card.front.title,
                            card.back.title,
                            card.back.content
                        )
                    );
                });
                deckXml = createDeckXml(cardXmlList);
                zip.file("data.xml", deckXml);
                zip.generateAsync({ type: "blob" }).then(function (content) {
                    console.log("to save");
                    console.log(zip.file);
                    var date = new Date();
                    var dateToStr =
                        "" +
                        date.getFullYear() +
                        ("0" + (date.getMonth() + 1.0)).slice(-2) +
                        date.getDate() +
                        date.getHours() +
                        date.getMinutes() +
                        date.getSeconds();
                    console.log(dateToStr);

                    saveAs(content, `xml_${dateToStr}_handout_udonarium.zip`);
                });
            });
        },
        importText: function (e) {
            this.cardList = [generateFormObject(0)];
            const files = e.target.files;
            const importedFile = files[0];
            const reader = new FileReader();
            let _self = this;
            let cardList = _self.cardList;

            if (
                !window.confirm(
                    "テキストからインポートするとすべてのハンドアウトデータが消えますがよろしいですか？"
                )
            ) {
                e.target.value = "";
                return;
            }

            reader.readAsText(importedFile);
            reader.onload = function () {
                const importedText = reader.result;

                const lines = importedText.replace(/\r/g, "").split("\n");
                var isCaption = true;
                var isFrontTitle = false;
                var isFrontContent = false;
                var isBackTitle = false;
                var isBackContent = false;
                var cardIndex = 0;

                for (const line of lines) {
                    if (cardList.length <= cardIndex) {
                        console.log(cardList.length + " card追加");
                        _self.addCard();
                    }
                    if (isCaption) {
                        console.log("captionの追加 " + line.trim());
                        cardList[cardIndex].front.name = line.trim();
                        cardList[cardIndex].back.name = line.trim();
                        isCaption = false;
                        isFrontTitle = true;
                    } else if (isFrontTitle) {
                        console.log("FrontTitleの追加 " + line.trim());
                        if (line.trim().includes(":")) {
                            let headAndTitle = line.trim().split(":");
                            cardList[cardIndex].front.heading = headAndTitle[0];
                            cardList[cardIndex].front.title = headAndTitle[1];
                        }
                        isFrontTitle = false;
                        isFrontContent = true;
                    } else if (isFrontContent) {
                        isBackTitle = line.trim().includes(":");
                        if (!isBackTitle && !line.match(/^--/g)) {
                            console.log("FrontContentの追加 " + line.trim());
                            let content = cardList[cardIndex].front.content;
                            if (content) content += "\n";
                            content += line.trim();
                            cardList[cardIndex].front.content = content;
                        } else if (isBackTitle) {
                            console.log("BackTitleの追加 " + line.trim());
                            let headAndTitle = line.trim().split(":");
                            cardList[cardIndex].back.heading = headAndTitle[0];
                            cardList[cardIndex].back.title = headAndTitle[1];
                            isBackTitle = false;
                            isFrontContent = false;
                            isBackContent = true;
                        } else {
                            isFrontContent = false;
                            isBackContent = true;
                        }
                    } else if (isBackContent) {
                        console.log("BackContentの追加 " + line.trim());
                        if (!line.match(/^--/g)) {
                            let content = cardList[cardIndex].back.content;
                            if (content) content += "\n";
                            content += line.trim();
                            cardList[cardIndex].back.content = content;
                        } else {
                            isBackContent = false;
                            isCaption = true;
                            cardIndex++;
                        }
                    }
                }
            };
            e.target.value = "";
        },
    },
});

/* イベント */
window.onbeforeunload = function (event) {
    event = event || window.event;
    event.returnValue =
        "ページをリロードすると内容が失われますがよろしいですか？";
};

function showManual() {
    document.querySelector("#how-to-use-modal").classList.toggle("hidden");
}
