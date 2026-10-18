/*
  喫茶レシピキッチン ゲームデータ
  ・アプリの「レシピ編集」→「データ」→「data.js を書き出す」で作ったファイルで、このファイルを丸ごと置き換えられます。
  ・手で直す場合は、下の JSON の形を崩さないようにしてください(各項目の説明は README.md にあります)。
  ・内容を変えたら version も変えてください。各ブラウザに「新しいデータがあります」と表示されます。
*/
window.GAME_DATA = {
  "version": "2026-10-18-1",
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
      "step": 1
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
      "step": 1
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
      "step": 1
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
      "step": 1
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
      "step": 0.1
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
      "step": 5
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
      "step": 5
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
      "step": 1
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
      "neutral": true
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
      "thickness": 3
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
      "thickness": 3
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
      "thickness": 3
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
      "thickness": 3
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
      "thickness": 4
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
      "thickness": 3
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
      "thickness": 3
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
      "thickness": 8
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
      "thickness": 2
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
      "thickness": 10
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
      "thickness": 12
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
      "thickness": 6
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
      "thickness": 4
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
      "thickness": 2
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
      "step": 1
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
      "step": 5
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
        "ice": [
          5,
          6
        ]
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
        "whip": 25
      }
    },
    {
      "id": "iwiener",
      "name": "アイスウインナー",
      "cat": "drink",
      "look": "ice",
      "items": {
        "drip": 130,
        "whip": 25
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
        "tea": 3,
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
        "tea": 3,
        "hotwater": 300,
        "mirabelle": 22.5,
        "fruitmix": 50,
        "lemonSlice": 1
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
        "fruitmix": 50,
        "lemonSlice": 1
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
        "cocoa": 6,
        "sugar": 9
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
        "matcha": 5,
        "whip": 25,
        "matchaS": 0.1
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
        "matchaS": 0.1
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
        "lemonSlice": 1
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
        "whip": 25
      }
    },
    {
      "id": "morningA",
      "name": "モーニングA",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 0.5,
        "butter": 8,
        "consomme": 4,
        "egg": 1
      }
    },
    {
      "id": "morningB",
      "name": "モーニングB",
      "cat": "food",
      "look": "food",
      "items": {
        "breadS": 2,
        "mustard": 8,
        "mayo": 8,
        "eggpaste": 45,
        "ham": 2,
        "consomme": 4
      }
    },
    {
      "id": "morningC",
      "name": "モーニングC",
      "cat": "food",
      "look": "food",
      "items": {
        "breadS": 2,
        "mayo": 8,
        "mustard": 8,
        "ham": 2,
        "cucumber": 3,
        "consomme": 4,
        "egg": 1
      },
      "note": "スープ(コンソメ粉末4g)とゆで卵を添えます。",
      "stepsTitle": "サンドの組み立て順(下から)",
      "steps": [
        "サンドパン(下)",
        "マヨネーズ",
        "ハム×2枚",
        "キュウリ×3枚",
        "マスタード",
        "サンドパン(上)"
      ]
    },
    {
      "id": "premium",
      "name": "プレミアムモーニングプレート",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 0.5,
        "butter": 8,
        "whiteRose": 1,
        "eggpaste": 45,
        "leaf": 15,
        "onion": 3,
        "tomato": 0.5,
        "caesar": 10,
        "cheesePowder": 2,
        "consomme": 4
      },
      "note": "グリーンリーフは葉の部分だけを、フリルが見えるよう縦に入れるときれいに見えます。オニオンスライスは散らすように盛ります。シーザードレッシング10g・パルメザンチーズ2g。",
      "stepsTitle": "下準備と作り方の順番",
      "steps": [
        "(下準備)サラダ用のアンプボール(透明な器)に、グリーンリーフ15g・オニオンスライス3g・トマトスライス0.5枚を盛り付ける",
        "角パン(トースト用)0.5枚を半分にカットし、トースターでキツネ色になるまで焼く",
        "焼き上がったトーストに発酵バターブレンド8gを塗る",
        "スープカップにコンソメ粉末4gを入れ、熱湯を注ぐ",
        "サラダにパルメザンチーズを振り、シーザードレッシングをかける",
        "モーニング用皿に、サラダ・スープ・トースト・ホワイトロースを置く",
        "ホワイトロースの横に、タマゴペースト45g(#18ディッシャーすりきり1杯)を乗せる"
      ]
    },
    {
      "id": "toast",
      "name": "トースト",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 1,
        "butter": 8
      }
    },
    {
      "id": "honeytoast",
      "name": "ハニートースト〜バニラアイス添え〜",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 1,
        "butter": 8,
        "honey": 15,
        "vanillaF": 45
      }
    },
    {
      "id": "mixsand",
      "name": "ミックスサンド",
      "cat": "food",
      "look": "food",
      "items": {
        "breadS": 2,
        "mayo": 12,
        "mustard": 8,
        "eggpaste": 45,
        "cucumber": 3,
        "bacon": 1,
        "sliceCheese": 1,
        "tomato": 1,
        "leaf": 8
      }
    },
    {
      "id": "saba",
      "name": "国産サバと彩り野菜の贅沢サンド",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 1,
        "pizzaSauce": 20,
        "saba": 3,
        "onion": 20,
        "mayo": 12,
        "cucumber": 3,
        "tomato": 1,
        "leaf": 15,
        "mustard": 8
      }
    },
    {
      "id": "stew",
      "name": "ビーフシチュープレート",
      "cat": "food",
      "look": "food",
      "items": {
        "stew": 1,
        "parsley": 0.1,
        "portion": 1,
        "breadT": 0.5,
        "butter": 8,
        "leaf": 15,
        "onion": 3,
        "tomato": 0.5,
        "caesar": 10,
        "cheesePowder": 2
      }
    },
    {
      "id": "hamburg",
      "name": "極厚チーズハンバーグサンド",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 1,
        "pizzaSauce": 40,
        "hamburg": 1,
        "sliceCheese": 2
      }
    },
    {
      "id": "teriyaki",
      "name": "ありたどり照り焼きチキンとハニーマスタードのプレミアムサンドウィッチ",
      "cat": "food",
      "look": "food",
      "items": {
        "breadS": 2,
        "mayo": 8,
        "honeyMustard": 8,
        "teriyaki": 150,
        "leaf": 8
      }
    },
    {
      "id": "pizza",
      "name": "ピザトースト",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 1,
        "pizzaSauce": 40,
        "mayo": 10,
        "shred": 70,
        "piman": 3,
        "bacon": 0.5
      }
    },
    {
      "id": "baconcheese",
      "name": "ベーコンチーズトースト",
      "cat": "food",
      "look": "food",
      "items": {
        "breadT": 1,
        "mayo": 8,
        "mustard": 8,
        "bacon": 1.5,
        "cucumber": 3,
        "sliceCheese": 1
      },
      "note": "サンドした状態で焼くとベーコンが温まらないため、必ず別々に焼きます。コレール皿の汚れも確認します。手順3のつなぎ用マヨネーズ3gは、表の8gとは別です。",
      "stepsTitle": "作り方の順番",
      "steps": [
        "トーストパンを半分にスライスし、片面にマヨネーズ8g、もう片面にマスタード8gを塗る",
        "片面にベーコン3枚、もう片面にキュウリ3枚とスライスチーズを乗せ、トースターで焼く",
        "焼き上がったら、マヨネーズ3gをつなぎにしてサンドする",
        "パンの耳の左右を切り落とし、断面からキュウリが3枚見える向きで3つにカットする",
        "コレール皿に紙ナプキンを敷き、①を耳側を下にして皿の中央に置き、②も盛り付ける"
      ]
    }
  ]
};
