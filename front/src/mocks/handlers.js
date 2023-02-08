import { rest } from "msw";

let books = [
  {
    "pid": 1,
    "title": "wher is cat",
    "author": "testauthor",
    "ImageURL": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "quantity": 20,
    "price": 5400,
    "accum": 5000
  },
  {
    "pid": 2,
    "title": "hello",
    "author": "testauthor",
    "ImageURL": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "quantity": 50,
    "price": 600,
    "accum": 5000
  },
  {
    "pid": 3,
    "title": "ant",
    "author": "testauthor",
    "ImageURL": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "quantity": 510,
    "price": 7000,
    "accum": 5000
  },
  {
    "pid": 4,
    "title": "dog",
    "author": "testauthor",
    "ImageURL": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "quantity": 450,
    "price": 8000,
    "accum": 5000
  },
  {
    "pid": 5,
    "title": "what are you",
    "author": "testauthor",
    "ImageURL": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "quantity": 10,
    "price": 6000,
    "accum": 5000
  },
  {
    "pid": 6,
    "title": "test",
    "author": "testauthor",
    "ImageURL": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "quantity": 80,
    "price": 10000,
    "accum": 5000
  },
  {
    "pid": 7,
    "title": "test2",
    "author": "testauthor",
    "ImageURL": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "quantity": 50,
    "price": 50000,
    "accum": 5000
  },
  {
    "pid": 8,
    "title": "test2",
    "author": "testauthor",
    "ImageURL": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "quantity": 50,
    "price": 50000,
    "accum": 5000
  },
  {
    "pid": 9,
    "title": "test2",
    "author": "testauthor",
    "ImageURL": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "quantity": 50,
    "price": 50000,
    "accum": 5000
  },
  {
    "pid": 10,
    "title": "test2",
    "author": "testauthor",
    "ImageURL": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "quantity": 50,
    "price": 50000,
    "accum": 5000
  },
  {
    "pid": 11,
    "title": "test2",
    "author": "testauthor",
    "ImageURL": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "quantity": 50,
    "price": 50000,
    "accum": 5000
  }
];

export const handlers = [
  rest.get("http://localhost:3001/book/:id", async (req, res, ctx) => {
    return res(ctx.json({
      msg: "책 상세 정보",
      success: true,
      detail: {
        "adult": false,
        "backdrop_path": "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
        "genre_ids": [
          878,
          12,
          14,
          28
        ],
        "id": req.params.id,
        "original_language": "en",
        "original_title": "Avatar: The Way of Water",
        "overview": "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
        "popularity": 8054.532,
        "poster_path": "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        "release_date": "2022-12-14",
        "title": "Avatar: The Way of Water",
        "video": false,
        "vote_average": 8.1,
        "vote_count": 1151
      }
    }));
  }),

  rest.get("http://localhost:3001/", async (req, res, ctx) => {
    console.log(req);
    return res(ctx.json({
      msg: "전체 책목록",
      success: true,
      data: books
    }));
  }),

  rest.get("http://localhost:3001/admin/book", async (req, res, ctx) => {
    return res(ctx.json({
      "status": 200,
      "msg": "success read book list",
      "data": books
    }));
  }),

  rest.post("http://localhost:3001/signup", async (req, res, ctx) => {
    try {
      return res(ctx.json({
        "status": 200,
        "msg": "signup success",
        "data": {
          "user": "user",
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhc3R6b28iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY3MjgxNDE3NiwiZXhwIjoxNjcyODE3Nzc2fQ.W1dQ_CVms2cREEVlzSBzmeTBbsl4HRGrvTD4v52uud4",
          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzI4MTQxNzYsImV4cCI6MTY3NDAyMzc3Nn0.X1lH5AYDY31_kmJU6BAE4ZK7VQrBjrMwzycBSrHkcTk"
        }
      }));

    } catch (error) {
      console.error(error);
    }
  }),

  rest.post("http://localhost:3001/login", async (req, res, ctx) => {
    try {
      if (req.body.id === "admin") {
        return res(ctx.json({
          "status": 200,
          "msg": "signup success",
          "data": {
            "user": "admin",
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhc3R6b28iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY3MjgxNDE3NiwiZXhwIjoxNjcyODE3Nzc2fQ.W1dQ_CVms2cREEVlzSBzmeTBbsl4HRGrvTD4v52uud4",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzI4MTQxNzYsImV4cCI6MTY3NDAyMzc3Nn0.X1lH5AYDY31_kmJU6BAE4ZK7VQrBjrMwzycBSrHkcTk"
          }
        }));
      } else {
        return res(ctx.json({
          "status": 200,
          "msg": "signup success",
          "data": {
            "user": "user",
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhc3R6b28iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY3MjgxNDE3NiwiZXhwIjoxNjcyODE3Nzc2fQ.W1dQ_CVms2cREEVlzSBzmeTBbsl4HRGrvTD4v52uud4",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzI4MTQxNzYsImV4cCI6MTY3NDAyMzc3Nn0.X1lH5AYDY31_kmJU6BAE4ZK7VQrBjrMwzycBSrHkcTk"
          }
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }),

  rest.delete("http://localhost:3001/admin/book/:id", async (req, res, ctx) => {
    try {
      console.log(books)
      books = books.filter(book => book.pid !== req.params.id)
      console.log(req.params.id)
      console.log(books)
      return res(ctx.json({
        "status": 200,
        "msg": "delete book success"
      }));
    } catch (error) {
      console.error(error)
    }
  }),

  rest.put("http://localhost:3001/admin/book/:id", async (req, res, ctx) => {
    try {
      console.log(req.params)
      return res(ctx.json({
        "status": 200,
        "msg": "update book success",
        "data": {
          "title": "testmodified",
          "author": "testauthor",
          "img": "img.jpg",
          "quantity": 50,
          "price": 50000,
          "accum": 5000
        }
      }));
    } catch (error) {
      console.error(error)
    }
  }),
];
