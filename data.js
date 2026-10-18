/*
  ルノアール暗記用 ゲームデータ
  ・このファイルを書き換えて Netlify にアップロードし直すと、全員のゲームに反映されます。
  ・JSON の形を崩さないようにしてください(各項目の説明は README.md にあります)。
  ・内容を変えたら version も別の文字(更新した日付など)に変えてください。
*/
window.GAME_DATA = {
  "version": "2026-10-19-3",
  "vessels": [
    {
      "name": "グラス",
      "shape": "rock"
    },
    {
      "name": "タンブラー",
      "shape": "tumbler"
    },
    {
      "name": "ジャグ",
      "shape": "jug"
    }
  ],
  "ingredients": {
    "drip": {
      "name": "ドリップ",
      "cat": "drink",
      "group": "コーヒー",
      "kind": "liq",
      "vis": "liquid",
      "icon": "pot",
      "color": "#5b3520",
      "unit": "",
      "step": 5
    },
    "blend": {
      "name": "ブレンド",
      "cat": "drink",
      "group": "コーヒー",
      "kind": "liq",
      "vis": "liquid",
      "icon": "pot",
      "color": "#3e2416",
      "unit": "",
      "step": 1,
      "once": true
    },
    "mizudashi": {
      "name": "水出し",
      "cat": "drink",
      "group": "コーヒー",
      "kind": "liq",
      "vis": "liquid",
      "icon": "bottle",
      "color": "#4a2c1a",
      "unit": "",
      "step": 5
    },
    "aitora": {
      "name": "アイトラ",
      "cat": "drink",
      "group": "コーヒー",
      "kind": "liq",
      "vis": "liquid",
      "icon": "pot",
      "color": "#3a2214",
      "unit": "",
      "step": 5
    },
    "jelly": {
      "name": "ゼリー",
      "cat": "drink",
      "group": "コーヒー",
      "kind": "liq",
      "vis": "liquid",
      "icon": "tub",
      "color": "#2e1a10",
      "unit": "",
      "step": 5
    },
    "milk": {
      "name": "牛乳",
      "cat": "drink",
      "group": "ミルク・お茶・お湯",
      "kind": "liq",
      "vis": "liquid",
      "icon": "carton",
      "color": "#fbf7ee",
      "unit": "",
      "step": 5
    },
    "soy": {
      "name": "豆乳",
      "cat": "drink",
      "group": "ミルク・お茶・お湯",
      "kind": "liq",
      "vis": "liquid",
      "icon": "carton",
      "color": "#efe0bd",
      "unit": "",
      "step": 5
    },
    "yogurt": {
      "name": "ヨーグルト",
      "cat": "drink",
      "group": "ミルク・お茶・お湯",
      "kind": "liq",
      "vis": "liquid",
      "icon": "tub",
      "color": "#fdfcf4",
      "unit": "",
      "step": 5
    },
    "icetea": {
      "name": "アイスティー",
      "cat": "drink",
      "group": "ミルク・お茶・お湯",
      "kind": "liq",
      "vis": "liquid",
      "icon": "pot",
      "color": "#b5561e",
      "unit": "",
      "step": 5
    },
    "matchaPrep": {
      "name": "抹茶仕込み",
      "cat": "drink",
      "group": "ミルク・お茶・お湯",
      "kind": "liq",
      "vis": "liquid",
      "icon": "bottle",
      "color": "#7da63f",
      "unit": "",
      "step": 5
    },
    "hotwater": {
      "name": "お湯",
      "cat": "drink",
      "group": "ミルク・お茶・お湯",
      "kind": "liq",
      "vis": "liquid",
      "icon": "pot",
      "color": "#d6ecf5",
      "unit": "",
      "step": 10
    },
    "water": {
      "name": "水",
      "cat": "drink",
      "group": "ミルク・お茶・お湯",
      "kind": "liq",
      "vis": "liquid",
      "icon": "bottle",
      "color": "#dcf0f7",
      "unit": "ml",
      "step": 5
    },
    "tea": {
      "name": "茶葉",
      "cat": "drink",
      "group": "粉・茶葉",
      "kind": "pow",
      "vis": "powder",
      "icon": "jar",
      "color": "#6b4520",
      "unit": "g",
      "step": 1,
      "once": true
    },
    "cocoa": {
      "name": "ココア",
      "cat": "drink",
      "group": "粉・茶葉",
      "kind": "pow",
      "vis": "powder",
      "icon": "jar",
      "color": "#7a4a2c",
      "unit": "",
      "step": 1,
      "once": true
    },
    "sugar": {
      "name": "砂糖",
      "cat": "drink",
      "group": "粉・茶葉",
      "kind": "pow",
      "vis": "powder",
      "icon": "jar",
      "color": "#fffdf6",
      "unit": "",
      "step": 1,
      "once": true
    },
    "matcha": {
      "name": "抹茶粉",
      "cat": "drink",
      "group": "粉・茶葉",
      "kind": "pow",
      "vis": "powder",
      "icon": "jar",
      "color": "#6f9d3a",
      "unit": "g",
      "step": 1,
      "once": true
    },
    "matchaS": {
      "name": "抹茶粉(ふりかけ)",
      "cat": "drink",
      "group": "粉・茶葉",
      "kind": "pow",
      "vis": "powder",
      "icon": "shaker",
      "color": "#6f9d3a",
      "unit": "g",
      "step": 0.1,
      "once": true
    },
    "kuromitsu": {
      "name": "黒蜜",
      "cat": "drink",
      "group": "シロップ・ソース",
      "kind": "liq",
      "vis": "liquid",
      "icon": "bottle",
      "color": "#2c180c",
      "unit": "",
      "step": 5
    },
    "mirabelle": {
      "name": "ミラベルシロップ",
      "cat": "drink",
      "group": "シロップ・ソース",
      "kind": "liq",
      "vis": "liquid",
      "icon": "bottle",
      "color": "#ecb63c",
      "unit": "",
      "step": 2.5
    },
    "choco": {
      "name": "チョコ",
      "cat": "drink",
      "group": "シロップ・ソース",
      "kind": "liq",
      "vis": "liquid",
      "icon": "bottle",
      "color": "#4b2816",
      "unit": "",
      "step": 5
    },
    "melon": {
      "name": "メロン",
      "cat": "drink",
      "group": "シロップ・ソース",
      "kind": "liq",
      "vis": "liquid",
      "icon": "bottle",
      "color": "#45c05a",
      "unit": "",
      "step": 5
    },
    "berry": {
      "name": "ベリー",
      "cat": "drink",
      "group": "シロップ・ソース",
      "kind": "liq",
      "vis": "liquid",
      "icon": "bottle",
      "color": "#9b2f55",
      "unit": "",
      "step": 5
    },
    "lemonJ": {
      "name": "レモン",
      "cat": "drink",
      "group": "シロップ・ソース",
      "kind": "liq",
      "vis": "liquid",
      "icon": "bottle",
      "color": "#f0d85c",
      "unit": "",
      "step": 5
    },
    "orange": {
      "name": "オレンジジュース",
      "cat": "drink",
      "group": "ジュース・ソーダ・お酒",
      "kind": "liq",
      "vis": "liquid",
      "icon": "carton",
      "color": "#f69a2b",
      "unit": "",
      "step": 5
    },
    "soda": {
      "name": "ソーダ",
      "cat": "drink",
      "group": "ジュース・ソーダ・お酒",
      "kind": "liq",
      "vis": "liquid",
      "icon": "bottle",
      "color": "#e6f5fa",
      "unit": "",
      "step": 5
    },
    "midori": {
      "name": "碧",
      "cat": "drink",
      "group": "ジュース・ソーダ・お酒",
      "kind": "liq",
      "vis": "liquid",
      "icon": "bottle",
      "color": "#c9923e",
      "unit": "ml",
      "step": 5
    },
    "whip": {
      "name": "ホイップ",
      "cat": "drink",
      "group": "トッピング",
      "kind": "top",
      "vis": "whip",
      "icon": "tub",
      "color": "#ffffff",
      "unit": "",
      "step": 5,
      "once": true
    },
    "vanilla": {
      "name": "バニラ",
      "cat": "drink",
      "group": "トッピング",
      "kind": "top",
      "vis": "scoop",
      "icon": "ball",
      "color": "#fff3d4",
      "unit": "",
      "step": 1,
      "once": true
    },
    "fruitmix": {
      "name": "フルーツミックス",
      "cat": "drink",
      "group": "トッピング",
      "kind": "top",
      "vis": "fruit",
      "icon": "can",
      "color": "#f6a35b",
      "unit": "",
      "step": 5,
      "once": true
    },
    "lemonSlice": {
      "name": "レモン(切れ)",
      "cat": "drink",
      "group": "トッピング",
      "kind": "top",
      "vis": "slice",
      "icon": "round",
      "color": "#f7dd3e",
      "unit": "切れ",
      "step": 1,
      "once": true
    },
    "ice": {
      "name": "氷",
      "cat": "drink",
      "group": "トッピング",
      "kind": "top",
      "vis": "ice",
      "icon": "cube",
      "color": "#cfeaf5",
      "unit": "個",
      "step": 1,
      "neutral": true,
      "once": true
    },
    "pudding": {
      "name": "プリン",
      "cat": "drink",
      "group": "トッピング",
      "kind": "top",
      "vis": "pudding",
      "icon": "pudding",
      "color": "#f5c74e",
      "unit": "",
      "step": 1,
      "once": true
    },
    "breadT": {
      "name": "角パン(トースト用)",
      "cat": "food",
      "group": "パン",
      "kind": "layer",
      "vis": "bread",
      "icon": "bread",
      "color": "#e9b46a",
      "unit": "枚",
      "step": 0.5,
      "thickness": 18
    },
    "breadS": {
      "name": "角パン(サンド用)",
      "cat": "food",
      "group": "パン",
      "kind": "layer",
      "vis": "bread",
      "icon": "bread",
      "color": "#f6e0b2",
      "unit": "枚",
      "step": 0.5,
      "thickness": 14
    },
    "butter": {
      "name": "発酵バターブレンド",
      "cat": "food",
      "group": "塗る・かける",
      "kind": "layer",
      "vis": "band",
      "icon": "tub",
      "color": "#f8e08e",
      "unit": "g",
      "step": 1,
      "thickness": 3,
      "once": true
    },
    "mayo": {
      "name": "マヨネーズ",
      "cat": "food",
      "group": "塗る・かける",
      "kind": "layer",
      "vis": "band",
      "icon": "bottle",
      "color": "#fbf0c4",
      "unit": "g",
      "step": 1,
      "thickness": 3,
      "once": true
    },
    "mustard": {
      "name": "マスタード",
      "cat": "food",
      "group": "塗る・かける",
      "kind": "layer",
      "vis": "band",
      "icon": "bottle",
      "color": "#e2b021",
      "unit": "g",
      "step": 1,
      "thickness": 3,
      "once": true
    },
    "honeyMustard": {
      "name": "ハニーマスタード",
      "cat": "food",
      "group": "塗る・かける",
      "kind": "layer",
      "vis": "band",
      "icon": "bottle",
      "color": "#e9a62a",
      "unit": "g",
      "step": 1,
      "thickness": 3,
      "once": true
    },
    "pizzaSauce": {
      "name": "ピザソース",
      "cat": "food",
      "group": "塗る・かける",
      "kind": "layer",
      "vis": "band",
      "icon": "jar",
      "color": "#d9472b",
      "unit": "g",
      "step": 1,
      "thickness": 4,
      "once": true
    },
    "caesar": {
      "name": "シーザードレッシング",
      "cat": "food",
      "group": "塗る・かける",
      "kind": "layer",
      "vis": "band",
      "icon": "bottle",
      "color": "#f2ebd6",
      "unit": "g",
      "step": 1,
      "thickness": 3,
      "once": true
    },
    "honey": {
      "name": "ハチミツ",
      "cat": "food",
      "group": "塗る・かける",
      "kind": "layer",
      "vis": "band",
      "icon": "jar",
      "color": "#f0a91e",
      "unit": "g",
      "step": 1,
      "thickness": 3,
      "once": true
    },
    "ham": {
      "name": "ロースハム",
      "cat": "food",
      "group": "具材",
      "kind": "layer",
      "vis": "band",
      "icon": "sheet",
      "color": "#f2a7a6",
      "unit": "枚",
      "step": 1,
      "thickness": 5
    },
    "whiteRose": {
      "name": "ホワイトローススライス",
      "cat": "food",
      "group": "具材",
      "kind": "layer",
      "vis": "band",
      "icon": "sheet",
      "color": "#f6c9c0",
      "unit": "枚",
      "step": 1,
      "thickness": 5
    },
    "bacon": {
      "name": "ベーコン",
      "cat": "food",
      "group": "具材",
      "kind": "layer",
      "vis": "band",
      "icon": "sheet",
      "color": "#d9665a",
      "unit": "枚",
      "step": 0.5,
      "thickness": 5
    },
    "sliceCheese": {
      "name": "スライスチーズ",
      "cat": "food",
      "group": "具材",
      "kind": "layer",
      "vis": "band",
      "icon": "sheet",
      "color": "#f8d257",
      "unit": "枚",
      "step": 1,
      "thickness": 4
    },
    "shred": {
      "name": "シュレッドチーズ",
      "cat": "food",
      "group": "具材",
      "kind": "layer",
      "vis": "band",
      "icon": "tub",
      "color": "#f9e08a",
      "unit": "g",
      "step": 5,
      "thickness": 8,
      "once": true
    },
    "cheesePowder": {
      "name": "粉チーズ",
      "cat": "food",
      "group": "具材",
      "kind": "layer",
      "vis": "band",
      "icon": "shaker",
      "color": "#fbf1cf",
      "unit": "g",
      "step": 1,
      "thickness": 2,
      "once": true
    },
    "eggpaste": {
      "name": "タマゴペースト",
      "cat": "food",
      "group": "具材",
      "kind": "layer",
      "vis": "band",
      "icon": "tub",
      "color": "#f7d45c",
      "unit": "g",
      "step": 1,
      "thickness": 10,
      "once": true
    },
    "saba": {
      "name": "サバ",
      "cat": "food",
      "group": "具材",
      "kind": "layer",
      "vis": "band",
      "icon": "sheet",
      "color": "#8f9aa3",
      "unit": "枚",
      "step": 1,
      "thickness": 8
    },
    "hamburg": {
      "name": "極厚ハンバーグ",
      "cat": "food",
      "group": "具材",
      "kind": "layer",
      "vis": "band",
      "icon": "ball",
      "color": "#7a4225",
      "unit": "個",
      "step": 1,
      "thickness": 22
    },
    "teriyaki": {
      "name": "照り焼きチキン",
      "cat": "food",
      "group": "具材",
      "kind": "layer",
      "vis": "band",
      "icon": "sheet",
      "color": "#b8692e",
      "unit": "g",
      "step": 5,
      "thickness": 12,
      "once": true
    },
    "cucumber": {
      "name": "キュウリ",
      "cat": "food",
      "group": "野菜",
      "kind": "layer",
      "vis": "dots",
      "icon": "round",
      "color": "#7cbf5a",
      "unit": "枚",
      "step": 1,
      "thickness": 6
    },
    "leaf": {
      "name": "グリーンリーフ",
      "cat": "food",
      "group": "野菜",
      "kind": "layer",
      "vis": "wave",
      "icon": "leaf",
      "color": "#78c25a",
      "unit": "g",
      "step": 1,
      "thickness": 6,
      "once": true
    },
    "onion": {
      "name": "オニオンスライス",
      "cat": "food",
      "group": "野菜",
      "kind": "layer",
      "vis": "band",
      "icon": "round",
      "color": "#efe3f2",
      "unit": "g",
      "step": 1,
      "thickness": 4,
      "once": true
    },
    "tomato": {
      "name": "トマトスライス",
      "cat": "food",
      "group": "野菜",
      "kind": "layer",
      "vis": "dots",
      "icon": "round",
      "color": "#e8483b",
      "unit": "枚",
      "step": 0.5,
      "thickness": 6
    },
    "piman": {
      "name": "ピーマン",
      "cat": "food",
      "group": "野菜",
      "kind": "layer",
      "vis": "dots",
      "icon": "round",
      "color": "#3f9a3c",
      "unit": "枚",
      "step": 1,
      "thickness": 4
    },
    "parsley": {
      "name": "パセリ",
      "cat": "food",
      "group": "野菜",
      "kind": "layer",
      "vis": "band",
      "icon": "leaf",
      "color": "#3f8f35",
      "unit": "g",
      "step": 0.1,
      "thickness": 2,
      "once": true
    },
    "consomme": {
      "name": "コンソメ粉末",
      "cat": "food",
      "group": "スープ・添え物",
      "kind": "side",
      "vis": "soup",
      "icon": "jar",
      "color": "#e3a84a",
      "unit": "g",
      "step": 1,
      "once": true
    },
    "egg": {
      "name": "タマゴ",
      "cat": "food",
      "group": "スープ・添え物",
      "kind": "side",
      "vis": "egg",
      "icon": "egg",
      "color": "#fffaf0",
      "unit": "個",
      "step": 1
    },
    "stew": {
      "name": "ビーフシチュー",
      "cat": "food",
      "group": "スープ・添え物",
      "kind": "side",
      "vis": "bowl",
      "icon": "pack",
      "color": "#6a2f1c",
      "unit": "袋",
      "step": 1
    },
    "portion": {
      "name": "ポーションミルク",
      "cat": "food",
      "group": "スープ・添え物",
      "kind": "side",
      "vis": "cup",
      "icon": "tub",
      "color": "#ffffff",
      "unit": "個",
      "step": 1
    },
    "vanillaF": {
      "name": "バニラ",
      "cat": "food",
      "group": "スープ・添え物",
      "kind": "side",
      "vis": "scoop",
      "icon": "ball",
      "color": "#fff3d4",
      "unit": "g",
      "step": 5,
      "once": true
    }
  },
  "recipes": [
    {
      "id": "american",
      "name": "アメリカン",
      "cat": "drink",
      "look": "hot",
      "items": {
        "blend": null,
        "hotwater": 30
      }
    },
    {
      "id": "drip",
      "name": "ドリップ",
      "cat": "drink",
      "look": "ice",
      "items": {
        "drip": 130
      }
    },
    {
      "id": "mizudashi",
      "name": "水出し",
      "cat": "drink",
      "look": "ice",
      "items": {
        "mizudashi": 130
      }
    },
    {
      "id": "itoraja",
      "name": "アイストラジャ",
      "cat": "drink",
      "look": "ice",
      "items": {
        "aitora": 150,
        "ice": null
      },
      "vessel": "ジャグ",
      "note": "アイトラ150はジャグに注ぎます。ジューグラには氷のみ5〜6個を入れます。"
    },
    {
      "id": "cfloat",
      "name": "コーヒーフロート",
      "cat": "drink",
      "look": "ice",
      "items": {
        "drip": 130,
        "vanilla": null
      }
    },
    {
      "id": "wiener",
      "name": "ウインナー",
      "cat": "drink",
      "look": "hot",
      "items": {
        "blend": null,
        "whip": null
      }
    },
    {
      "id": "iwiener",
      "name": "アイスウインナー",
      "cat": "drink",
      "look": "ice",
      "items": {
        "drip": 130,
        "whip": null
      }
    },
    {
      "id": "cafeaulait",
      "name": "カフェオーレ",
      "cat": "drink",
      "look": "hot",
      "items": {
        "milk": 80,
        "drip": 80
      }
    },
    {
      "id": "icafeaulait",
      "name": "アイスカフェオーレ",
      "cat": "drink",
      "look": "ice",
      "items": {
        "milk": 75,
        "drip": 75
      }
    },
    {
      "id": "soycafe",
      "name": "ソイカフェオレ",
      "cat": "drink",
      "look": "hot",
      "items": {
        "soy": 80,
        "drip": 80
      }
    },
    {
      "id": "isoycafe",
      "name": "アイスソイカフェオレ",
      "cat": "drink",
      "look": "ice",
      "items": {
        "soy": 75,
        "drip": 75
      }
    },
    {
      "id": "hottea",
      "name": "ホットティー",
      "cat": "drink",
      "look": "hot",
      "items": {
        "tea": null,
        "hotwater": 300
      }
    },
    {
      "id": "icetea",
      "name": "アイスティー",
      "cat": "drink",
      "look": "ice",
      "items": {
        "icetea": 130
      }
    },
    {
      "id": "fruittea",
      "name": "フルーツティー",
      "cat": "drink",
      "look": "hot",
      "items": {
        "tea": null,
        "hotwater": 300,
        "mirabelle": 22.5,
        "fruitmix": null,
        "lemonSlice": null
      },
      "note": "カップにフルーツミックス50(1/2缶)とレモン1切れを入れます。"
    },
    {
      "id": "ifruittea",
      "name": "アイスフルーツティー",
      "cat": "drink",
      "look": "ice",
      "items": {
        "icetea": 110,
        "mirabelle": 15,
        "ice": null,
        "fruitmix": null,
        "lemonSlice": null
      },
      "note": "氷+フルーツミックス50(1/2缶)+レモン1切れ。"
    },
    {
      "id": "kmilk",
      "name": "黒蜜ミルク",
      "cat": "drink",
      "look": "hot",
      "items": {
        "milk": 140,
        "kuromitsu": 20
      }
    },
    {
      "id": "ikmilk",
      "name": "アイス黒蜜ミルク",
      "cat": "drink",
      "look": "ice",
      "items": {
        "milk": 130,
        "kuromitsu": 20
      }
    },
    {
      "id": "ksoy",
      "name": "黒蜜ソイミルク",
      "cat": "drink",
      "look": "hot",
      "items": {
        "soy": 140,
        "kuromitsu": 20
      }
    },
    {
      "id": "iksoy",
      "name": "アイス黒蜜ソイミルク",
      "cat": "drink",
      "look": "ice",
      "items": {
        "soy": 130,
        "kuromitsu": 20
      }
    },
    {
      "id": "kcafe",
      "name": "黒蜜カフェオーレ",
      "cat": "drink",
      "look": "hot",
      "items": {
        "milk": 90,
        "kuromitsu": 20,
        "drip": 50
      }
    },
    {
      "id": "ikcafe",
      "name": "アイス黒蜜カフェオーレ",
      "cat": "drink",
      "look": "ice",
      "items": {
        "milk": 80,
        "kuromitsu": 20,
        "drip": 50
      }
    },
    {
      "id": "ksoycafe",
      "name": "黒蜜ソイカフェオレ",
      "cat": "drink",
      "look": "hot",
      "items": {
        "soy": 90,
        "kuromitsu": 20,
        "drip": 50
      }
    },
    {
      "id": "iksoycafe",
      "name": "アイス黒蜜ソイカフェオレ",
      "cat": "drink",
      "look": "ice",
      "items": {
        "soy": 80,
        "kuromitsu": 20,
        "drip": 50
      }
    },
    {
      "id": "cocoa",
      "name": "ココア",
      "cat": "drink",
      "look": "hot",
      "items": {
        "milk": 160,
        "cocoa": null,
        "sugar": null
      }
    },
    {
      "id": "icocoa",
      "name": "アイスココア",
      "cat": "drink",
      "look": "ice",
      "items": {
        "milk": 140,
        "choco": 20,
        "vanilla": null
      }
    },
    {
      "id": "milk",
      "name": "ミルク",
      "cat": "drink",
      "look": "hot",
      "items": {
        "milk": 160
      }
    },
    {
      "id": "imilk",
      "name": "アイスミルク",
      "cat": "drink",
      "look": "ice",
      "items": {
        "milk": 130
      }
    },
    {
      "id": "soymilk",
      "name": "ソイミルク",
      "cat": "drink",
      "look": "hot",
      "items": {
        "soy": 160
      }
    },
    {
      "id": "isoymilk",
      "name": "アイスソイミルク",
      "cat": "drink",
      "look": "ice",
      "items": {
        "soy": 150
      }
    },
    {
      "id": "matcha",
      "name": "天空の抹茶ラテ",
      "cat": "drink",
      "look": "hot",
      "items": {
        "milk": 160,
        "matcha": null,
        "whip": null,
        "matchaS": null
      },
      "note": "最後に抹茶粉0.1をふりかけます。"
    },
    {
      "id": "imatcha",
      "name": "天空のアイス抹茶ラテ",
      "cat": "drink",
      "look": "ice",
      "items": {
        "milk": 90,
        "matchaPrep": 55,
        "vanilla": null,
        "matchaS": null
      },
      "note": "最後に抹茶粉0.1をふりかけます。"
    },
    {
      "id": "jellyvanilla",
      "name": "ゼリーバニラ",
      "cat": "drink",
      "look": "ice",
      "items": {
        "jelly": 130,
        "vanilla": null
      }
    },
    {
      "id": "jellyaulait",
      "name": "ゼリーオーレ",
      "cat": "drink",
      "look": "ice",
      "items": {
        "milk": 50,
        "jelly": 50,
        "drip": 50,
        "vanilla": null
      }
    },
    {
      "id": "bluyo",
      "name": "ブルヨー",
      "cat": "drink",
      "look": "ice",
      "items": {
        "berry": 50,
        "milk": 50,
        "yogurt": 50,
        "vanilla": null
      }
    },
    {
      "id": "creamsoda",
      "name": "クリームソーダ",
      "cat": "drink",
      "look": "ice",
      "items": {
        "melon": 40,
        "soda": 130,
        "vanilla": null
      }
    },
    {
      "id": "orange",
      "name": "オレンジジュース",
      "cat": "drink",
      "look": "ice",
      "items": {
        "orange": 130
      }
    },
    {
      "id": "lemonsquash",
      "name": "レモンスカッシュ",
      "cat": "drink",
      "look": "ice",
      "items": {
        "lemonJ": 50,
        "soda": 110,
        "lemonSlice": null
      }
    },
    {
      "id": "aorock",
      "name": "碧ロック",
      "cat": "drink",
      "look": "ice",
      "items": {
        "midori": 40
      },
      "vessel": "グラス"
    },
    {
      "id": "aohighball",
      "name": "碧ハイボール",
      "cat": "drink",
      "look": "ice",
      "items": {
        "midori": 40,
        "soda": 95
      },
      "vessel": "タンブラー"
    },
    {
      "id": "aomizuwari",
      "name": "碧水割り",
      "cat": "drink",
      "look": "ice",
      "items": {
        "midori": 40,
        "water": 95
      },
      "vessel": "グラス"
    },
    {
      "id": "pudding",
      "name": "プリン(ホイップ)",
      "cat": "drink",
      "look": "dish",
      "items": {
        "pudding": null,
        "whip": null
      }
    },
    {
      "id": "morningA",
      "name": "モーニングA",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 0.5,
        "butter": null,
        "consomme": null,
        "egg": 1
      },
      "cut": {
        "scoreFirst": true,
        "lines": [
          {
            "t": "score",
            "a": [
              0.25,
              0
            ],
            "b": [
              0.25,
              1
            ]
          },
          {
            "t": "score",
            "a": [
              0.5,
              0
            ],
            "b": [
              0.5,
              1
            ]
          },
          {
            "t": "score",
            "a": [
              0.75,
              0
            ],
            "b": [
              0.75,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.4
            ],
            "b": [
              1,
              0.62
            ]
          }
        ]
      }
    },
    {
      "id": "morningB",
      "name": "モーニングB",
      "cat": "food",
      "look": "food",
      "items": {
        "breadS": 2,
        "mustard": null,
        "mayo": null,
        "eggpaste": null,
        "ham": 2,
        "consomme": null
      },
      "cut": {
        "scoreFirst": false,
        "lines": [
          {
            "t": "cut",
            "a": [
              0.06,
              0
            ],
            "b": [
              0.06,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0.95,
              0
            ],
            "b": [
              0.95,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0.375,
              0
            ],
            "b": [
              0.375,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0.375,
              0
            ],
            "b": [
              0.9,
              1
            ]
          }
        ]
      },
      "note": "パンの耳の左右を切り落とし、3つにカットします。"
    },
    {
      "id": "morningC",
      "name": "モーニングC",
      "cat": "food",
      "look": "food",
      "items": {
        "breadS": 2,
        "mayo": null,
        "mustard": null,
        "ham": 2,
        "cucumber": 3,
        "consomme": null,
        "egg": 1
      },
      "note": "スープ(コンソメ粉末)とゆで卵を添えます。",
      "stepsTitle": "サンドの組み立て順(下から)",
      "steps": [
        "サンドパン(下)",
        "マヨネーズ",
        "ハム×2枚",
        "キュウリ×3枚",
        "マスタード",
        "サンドパン(上)"
      ],
      "cut": {
        "scoreFirst": false,
        "lines": [
          {
            "t": "cut",
            "a": [
              0.06,
              0
            ],
            "b": [
              0.06,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0.94,
              0
            ],
            "b": [
              0.94,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.06
            ],
            "b": [
              1,
              0.06
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.94
            ],
            "b": [
              1,
              0.94
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.42
            ],
            "b": [
              1,
              0.6
            ]
          }
        ]
      }
    },
    {
      "id": "premium",
      "name": "プレミアムモーニングプレート",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 0.5,
        "butter": null,
        "whiteRose": 1,
        "eggpaste": null,
        "leaf": null,
        "onion": null,
        "tomato": 0.5,
        "caesar": null,
        "cheesePowder": null,
        "consomme": null
      },
      "note": "グリーンリーフは葉の部分だけを、フリルが見えるよう縦に入れるときれいに見えます。オニオンスライスは散らすように盛ります。",
      "stepsTitle": "下準備と作り方の順番",
      "steps": [
        "(下準備)サラダ用のアンプボール(透明な器)に、グリーンリーフ・オニオンスライス・トマトスライス0.5枚を盛り付ける",
        "角パン(トースト用)0.5枚を半分にカットし、トースターでキツネ色になるまで焼く",
        "焼き上がったトーストに発酵バターブレンドを塗る",
        "スープカップにコンソメ粉末を入れ、熱湯を注ぐ",
        "サラダにパルメザンチーズを振り、シーザードレッシングをかける",
        "モーニング用皿に、サラダ・スープ・トースト・ホワイトロースを置く",
        "ホワイトロースの横に、タマゴペースト(#18ディッシャーすりきり1杯)を乗せる"
      ]
    },
    {
      "id": "toast",
      "name": "トースト",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 1,
        "butter": null
      },
      "cut": {
        "scoreFirst": true,
        "lines": [
          {
            "t": "score",
            "a": [
              0,
              0.12
            ],
            "b": [
              1,
              0.3
            ]
          },
          {
            "t": "score",
            "a": [
              0,
              0.42
            ],
            "b": [
              1,
              0.6
            ]
          },
          {
            "t": "score",
            "a": [
              0,
              0.72
            ],
            "b": [
              1,
              0.88
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.06
            ],
            "b": [
              1,
              0.06
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.36
            ],
            "b": [
              1,
              0.36
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.66
            ],
            "b": [
              1,
              0.66
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.94
            ],
            "b": [
              1,
              0.94
            ]
          }
        ]
      }
    },
    {
      "id": "honeytoast",
      "name": "ハニートースト〜バニラアイス添え〜",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 1,
        "butter": null,
        "honey": null,
        "vanillaF": null
      },
      "cut": {
        "scoreFirst": true,
        "lines": [
          {
            "t": "score",
            "a": [
              0,
              0.12
            ],
            "b": [
              1,
              0.3
            ]
          },
          {
            "t": "score",
            "a": [
              0,
              0.42
            ],
            "b": [
              1,
              0.6
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.06
            ],
            "b": [
              1,
              0.06
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.36
            ],
            "b": [
              1,
              0.36
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.66
            ],
            "b": [
              1,
              0.66
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.94
            ],
            "b": [
              1,
              0.94
            ]
          }
        ]
      },
      "note": "切込み2本を入れてからカット4本。トーストと違い、3つのうち1つには切込みを入れません。"
    },
    {
      "id": "mixsand",
      "name": "ミックスサンド",
      "cat": "food",
      "look": "food",
      "items": {
        "breadS": 2,
        "mayo": null,
        "mustard": null,
        "eggpaste": null,
        "cucumber": 3,
        "bacon": 1,
        "sliceCheese": 1,
        "tomato": 1,
        "leaf": null
      },
      "cut": {
        "scoreFirst": false,
        "lines": [
          {
            "t": "cut",
            "a": [
              0.06,
              0
            ],
            "b": [
              0.06,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0.94,
              0
            ],
            "b": [
              0.94,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.06
            ],
            "b": [
              1,
              0.06
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.94
            ],
            "b": [
              1,
              0.94
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0
            ],
            "b": [
              1,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              1,
              0
            ],
            "b": [
              0,
              1
            ]
          }
        ]
      },
      "note": "耳を4辺とも切り落としてから、対角線を結んで4等分します。"
    },
    {
      "id": "saba",
      "name": "国産サバと彩り野菜の贅沢サンド",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 1,
        "pizzaSauce": null,
        "saba": 3,
        "onion": null,
        "mayo": null,
        "cucumber": 3,
        "tomato": 1,
        "leaf": null,
        "mustard": null
      },
      "cut": {
        "scoreFirst": false,
        "lines": [
          {
            "t": "cut",
            "a": [
              0.5,
              0
            ],
            "b": [
              0.5,
              1
            ]
          }
        ]
      },
      "note": "真ん中で二等分します。"
    },
    {
      "id": "stew",
      "name": "ビーフシチュープレート",
      "cat": "food",
      "look": "food",
      "items": {
        "stew": 1,
        "parsley": null,
        "portion": 1,
        "breadT": 0.5,
        "butter": null,
        "leaf": null,
        "onion": null,
        "tomato": 0.5,
        "caesar": null,
        "cheesePowder": null
      }
    },
    {
      "id": "hamburg",
      "name": "極厚チーズハンバーグサンド",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 1,
        "pizzaSauce": null,
        "hamburg": 1,
        "sliceCheese": 2
      },
      "cut": {
        "scoreFirst": false,
        "lines": [
          {
            "t": "cut",
            "a": [
              0.5,
              0
            ],
            "b": [
              0.5,
              1
            ]
          }
        ]
      },
      "note": "真ん中で二等分します。"
    },
    {
      "id": "teriyaki",
      "name": "ありたどり照り焼きチキンとハニーマスタードのプレミアムサンドウィッチ",
      "cat": "food",
      "look": "food",
      "items": {
        "breadS": 2,
        "mayo": null,
        "honeyMustard": null,
        "teriyaki": null,
        "leaf": null
      },
      "cut": {
        "scoreFirst": false,
        "lines": [
          {
            "t": "cut",
            "a": [
              0.5,
              0
            ],
            "b": [
              0.5,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0,
              0.5
            ],
            "b": [
              1,
              0.5
            ]
          }
        ]
      }
    },
    {
      "id": "pizza",
      "name": "ピザトースト",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 1,
        "pizzaSauce": null,
        "mayo": null,
        "shred": null,
        "piman": 3,
        "bacon": 0.5
      },
      "cut": {
        "scoreFirst": false,
        "lines": [
          {
            "t": "cut",
            "a": [
              0.06,
              0
            ],
            "b": [
              0.06,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0.94,
              0
            ],
            "b": [
              0.94,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0.35,
              0
            ],
            "b": [
              0.35,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0.65,
              0
            ],
            "b": [
              0.65,
              1
            ]
          }
        ]
      },
      "note": "左右の耳だけを切り落とし、3等分します。"
    },
    {
      "id": "baconcheese",
      "name": "ベーコンチーズトースト",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 1,
        "mayo": null,
        "mustard": null,
        "bacon": 1.5,
        "cucumber": 3,
        "sliceCheese": 1
      },
      "note": "サンドした状態で焼くとベーコンが温まらないため、必ず別々に焼きます。コレール皿の汚れも確認します。",
      "stepsTitle": "作り方の順番",
      "steps": [
        "トーストパンを半分にスライスし、片面にマヨネーズ、もう片面にマスタードを塗る",
        "片面にベーコン3枚、もう片面にキュウリ3枚とスライスチーズを乗せ、トースターで焼く",
        "焼き上がったら、マヨネーズをつなぎにしてサンドする",
        "パンの耳の左右を切り落とし、断面からキュウリが3枚見える向きで3つにカットする",
        "コレール皿に紙ナプキンを敷き、①を耳側を下にして皿の中央に置き、②も盛り付ける"
      ],
      "cut": {
        "scoreFirst": false,
        "lines": [
          {
            "t": "cut",
            "a": [
              0.06,
              0
            ],
            "b": [
              0.06,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0.94,
              0
            ],
            "b": [
              0.94,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0.32,
              0
            ],
            "b": [
              0.32,
              1
            ]
          },
          {
            "t": "cut",
            "a": [
              0.49,
              0
            ],
            "b": [
              0.73,
              1
            ]
          }
        ]
      }
    }
  ]
};
