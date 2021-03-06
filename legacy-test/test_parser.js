var expect = chai.expect;
var mock_txt = "\
4/3\n\
  T: 11:00 國光 => 嘉義\n\
  T: 嘉義 => 台鐵 => 高雄\n\
  S: 康橋雄中館; 高雄市三民區建國三路44號; +886-7-9698899  Booking ID 66020786\n\
\n\
----- \n\
4/4\n\
  T: 捷運凹仔底 => 紅32/紅33/168 => 美術館\n\
  S: 美術館\n\
  T: 捷運西子灣\n\
  F: 哈瑪星廟口正老牌汕頭麵\n\
  S: 英國領事館, 中山大學\n\
  S: 駁二特區, 真愛碼頭, 光榮碼頭 \n\
  T: 捷運鹽埕埔 or 中央公園\n\
  S: 三多商圈/中央公園/85 大樓\n\
  \n\
-----\n\
4/5\n\
  T: (高雄車站前站 => 60號公車 或 後驛站 => 紅28公車) => 科工館\n\
  S: 科工館\n\
  F: 老澳廚房 高雄市三民區延慶街65號\n\
  T: 捷運\n\
  S: 橋頭糖廠\n\
  S: //都會公園\n\
  S: //蓮池潭 捷運左營 => 舊城假日文化公車\n\
  S: //衛武營\n\
  T: 高鐵 18:30\n\
-----\n\
腳踏車: 信用卡借 60 分鐘免費\n\
公車: 可用\n\
";

mock_nodes = [
  {
    'type':'traffic',
    'node':{}
  }
]

describe('User story', function(){
  describe('parse the whole file', function(){
    it('Parse the whole file', function(){
      var nodes = parser.parse(mock_txt);
      expect(nodes).to.be.equal(mock_nodes);
    })
  })
})

describe('Parse a single line', function(){
  it('Parse a sight', function(){
    var mock_txt = 'S: 駁二特區 真愛碼頭 光榮碼頭; 12:15 ; 西子灣站 ; bla foo';
    var mock_obj = [[{
      'type': 'S:',
      'title': '駁二特區 真愛碼頭 光榮碼頭',
      'time': '12:15',
      'address': '西子灣站',
      'description': 'bla foo',
    }]];

    var obj = parser.parse(mock_txt);
    console.log(obj)
    expect(obj).to.be.deep.equal(mock_obj);
  });

  it('Parse a info line', function(){
    var mock_txt = '4/12';
    var mock_obj = [[{
      'type': 'NOTE',
      'title': '4/12',
    }]];

    var obj = parser.parse(mock_txt);
    expect(obj).to.be.deep.equal(mock_obj);
  })
})

describe('Parse multiple lines', function(){
  it('Parse multiple days', function(){
    var mock_txt = "xyz\n-----\n112\n-----\n18\n-----\nabc";
    var mock_obj = [
      [{
      'type': 'NOTE',
      'title': 'xyz',
      }],
      [{
      'type': 'NOTE',
      'title': '112',
      }],
      [{
      'type': 'NOTE',
      'title': '18',
      }],
      [{
      'type': 'NOTE',
      'title': 'abc',
      }],
    ];

    var obj = parser.parse(mock_txt);
    expect(obj).to.be.deep.equal(mock_obj);
  });
  it('Parse multiple simple line', function(){
    var mock_txt = "112\n\n18";
    var mock_obj = [[
      {
      'type': 'NOTE',
      'title': '112',
      },
      {
      'type': 'NOTE',
      'title': '18',
      },
    ]];

    var obj = parser.parse(mock_txt);
    expect(obj).to.be.deep.equal(mock_obj);
  });
})
