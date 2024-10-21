const Book = require("../models/book");
const ResponseService = require("../services/response.service");

const resHandler = ResponseService.responseHandler;

class BookController{
    
    // [GET] /books/getall
    async getAll(req,res) {
        const books = await Book.find({});
        resHandler(res, books);
    }

    // [GET] /books/get?from=&to=
    async getCount(req,res) {
        const {from, to} = req.query;
        const books = await Book.find({})
                        .skip(from)
                        .limit(to);
        resHandler(res,books);
    }

    // [GET] /books/total
    async getTotal(req, res) {
        const total = await Book.countDocuments();
        res.status(200).json({total: total})
    }
}

module.exports = new BookController();