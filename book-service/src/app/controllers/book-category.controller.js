const {responseHandler, errorResponseHandler} = require("../services/response.service");
const BookCategory = require("../models/book-category");
const mongoose = require('mongoose');

class BookCategoryController {
    // [GET] "/book-categories/get-all"
    async getAll(req, res) {
        try {
            const result = await BookCategory
                                .find({})
                                .sort({ categoryName: -1 });
            responseHandler(res, result);
        } catch (error) {
            errorResponseHandler(res, err);
        }
    }
    
    // [GET] "/book-categories/get-total"
    async getTotal(req, res) {
        try {
            const result = await BookCategory.countDocuments({});
            responseHandler(res, {total: result});
        } catch (error) {
            errorResponseHandler(res, err);
        }
    }
    
    // [GET] "/book-categories/get-count"
    /**
     * param {
     *  page: number
     *  limit: number
     * }
     * @param {*} req 
     * @param {*} res 
     */
    async getCount(req, res) {
        let {page, limit} = req.query;
        if(!page || page === 0) page = 1;
        if(!limit || limit === 0) limit = 1;
        const skip = (page - 1) * limit;
        try {
            const records = await BookCategory.find({})
                        .sort({ categoryName: -1 })
                        .skip(skip)
                        .limit(limit);
            responseHandler(res, records);
        } catch (error) {
            errorResponseHandler(res, error);
        }
    }

    // [POST] "/book-categories/post-get-by-ids"
    /**
     * param {
     *  ids: string[]
     * }
     * @param {*} req 
     * @param {*} res 
     */
    async postGetByIds(req, res) {
        const {ids} = req.body;
        if( !ids || !ids.length === 0 ) {
            responseHandler(res, {});
        }
        const objectIdList = ids.map(id => new mongoose.Types.ObjectId(id));
        try {
            const records = await BookCategory
                                .find({_id : { $in: objectIdList }})
                                .sort({ categoryName: -1 });
            responseHandler(res, records);
        } catch (error) {
            errorResponseHandler(res, error);
        }
    }

    // [GET] "/book-categories/get-by-name"
    /**
     * param {
     *  categoryName: string
     * }
     * @param {*} req 
     * @param {*} res 
     */
    async getByName(req, res) {
        const {categoryName} = req.query;
        if(!categoryName) {
            responseHandler(res, {});
            return;
        }
        try {
            const records = await BookCategory
                                .find({categoryName : { $regex: categoryName, $options: 'i' }})
                                .sort({ categoryName: -1 });
            responseHandler(res, records);
        } catch (error) {
            errorResponseHandler(res, error);
        }
    }

}

module.exports = new BookCategoryController();