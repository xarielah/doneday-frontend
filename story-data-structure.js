const story = {
  _id: "s101",
  txt: "Best trip ever",
  imgUrl: "http://some-img",
  by: {
    _id: "u101",
    fullname: "Ulash Ulashi",
    imgUrl: "http://some-img"
  },
  loc: { // Optional
    lat: 11.11,
    lng: 22.22,
    name: "Tel Aviv"
  },
  comments: [
    {
      id: "c1001",
      by: {
        _id: "u105",
        fullname: "Bob",
        imgUrl: "http://some-img"
      },
      txt: "good one!",
      likedBy: [ // Optional
        {
          "_id": "u105",
          "fullname": "Bob",
          "imgUrl": "http://some-img"
        }
      ]
    },
    {
      id: "c1002",
      by: {
        _id: "u106",
        fullname: "Dob",
        imgUrl: "http://some-img"
      },
      txt: "not good!",
    }
  ],
  likedBy: [
    {
      _id: "u105",
      fullname: "Bob",
      imgUrl: "http://some-img"
    },
    {
      _id: "u106",
      fullname: "Dob",
      imgUrl: "http://some-img"
    }
  ],
  tags: ["fun", "romantic"]
}

const user = {
  _id: "u101",
  username: "Muko",
  password: "mukmuk",
  fullname: "Muki Muka",
  imgUrl: "http://some-img",
  following: [
    {
      _id: "u106",
      fullname: "Dob",
      imgUrl: "http://some-img"
    }
  ],
  followers: [
    {
      _id: "u105",
      fullname: "Bob",
      imgUrl: "http://some-img"
    }
  ],
  savedStoryIds: ["s104", "s111", "s123"],
  posts: ["d101", "d102", "d103"],
  highlights: [
    {
      name: "Rome",
      stories: ["s101", "s102", "s103"]
    },
    {
      name: "NYC",
      stories: ["s105", "s106", "s107"]
    },
  ],
  reels: ["r101", "r102", "r103"],
  saved: ["r107", "p304", "r343"],
  tagged: ["p4543", "r3240", "p3450"]
}

const post = {
  _id: "s1231",
  txt: "Wednesday night!",
  imgUrl: "http://some-img2",
  by: {
    _id: "u101",
    fullname: "Ulbogogi Ulashi",
    imgUrl: "http://some-img"
  },
  loc: { // Optional
    lat: 11.11,
    lng: 22.22,
    name: "Tel Aviv"
  },
  comments: [
    {
      id: "c1001",
      by: {
        _id: "u105",
        fullname: "Bob",
        imgUrl: "http://some-img"
      },
      txt: "good one!",
      likedBy: [ // Optional
        {
          "_id": "u105",
          "fullname": "Bob",
          "imgUrl": "http://some-img"
        }
      ]
    },
    {
      id: "c1002",
      by: {
        _id: "u106",
        fullname: "Dob",
        imgUrl: "http://some-img"
      },
      txt: "not good!",
    }
  ],
  likedBy: [
    {
      _id: "u105",
      fullname: "Bob",
      imgUrl: "http://some-img"
    },
    {
      _id: "u106",
      fullname: "Dob",
      imgUrl: "http://some-img"
    }
  ],
  tags: ["fun", "romantic"]
}


const reel = {
  _id: "s123221",
  txt: "Wednesday night!",
  imgUrl: "http://some-img2",
  by: {
    _id: "u101",
    fullname: "Ulbogogi Ulashi",
    imgUrl: "http://some-img"
  },
  loc: { // Optional
    lat: 11.11,
    lng: 22.22,
    name: "Tel Aviv"
  },
  sound: {
    _id: "34MHK2B11",
    name: 'MJ-billy jean',
  },
  comments: [
    {
      id: "c1001",
      by: {
        _id: "u105",
        fullname: "Bob",
        imgUrl: "http://some-img"
      },
      txt: "good one!",
      likedBy: [ // Optional
        {
          "_id": "u105",
          "fullname": "Bob",
          "imgUrl": "http://some-img"
        }
      ]
    },
    {
      id: "c1002",
      by: {
        _id: "u106",
        fullname: "Dob",
        imgUrl: "http://some-img"
      },
      txt: "not good!",
    }
  ],
  likedBy: [
    {
      _id: "u105",
      fullname: "Bob",
      imgUrl: "http://some-img"
    },
    {
      _id: "u106",
      fullname: "Dob",
      imgUrl: "http://some-img"
    }
  ],
  tags: ["fun", "romantic"]
}


const inbox = [
  {
    _id: "t324532",
    users: [{
      _id: "afik_yefet",
      name: "Afik Yefet",
      imgUrl: "http://profile"
    },
    {
      _id: "marva",
      name: "marva",
      imgUrl: "http://profile2"
    }],
    messages: [
      {
        _id: "3451",
        userId: "afik_yefet",
        type: "text",
        replyId: null,
        reaction: {
          _id: "R45y",
          name: "heart",
        },
        content: "Hey!, how are you?",
        createdAt: 17854123233665,
        editedAt: 17854123233665
      },
      {
        _id: "3461",
        userId: "marva",
        type: "text",
        replyId: null,
        reaction: null,
        content: "Great, how are yoyu?",
        createdAt: 17854123233775,
        editedAt: 17854123654726,
      }
    ]
  }
]