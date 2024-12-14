const { responseHandler, errorResponseHandler } = require("../services/response.service");
const BookCategory = require("../models/book-category");
const mongoose = require('mongoose');


class BookCategoryCommandController {
    // router.put("put-update", Controller.updateCategory);
    /**
     * body {
     *  id: string,
     *  categoryName: string
     * }
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async updateCategory(req, res) {
        const { id, categoryName } = req.body;
        if(!id || !categoryName ) {
            responseHandler(res, {});
            return;
        }
        try {
            const objectId = mongoose.Types.ObjectId(id);
            const record = await BookCategory.findByIdAndUpdate(objectId, {categoryName : categoryName});
            responseHandler(res, record);
        } catch (error) {
            errorResponseHandler(res, error);
        }
    }
    
    // router.post("post-create", Controller.createCategorys);
    /**
     * body {
     *  categoryNames: string[]
     * }
     * @param {*} req 
     * @param {*} res 
     */
    async createCategorys(req, res) {
        const {categoryNames} = req.body;
        if(!categoryNames || categoryNames.length) {
            responseHandler(req, {});
            return;
        }
        try {
            const bookCategorys = categoryNames.map(name => {
                return {
                    categoryName: name,
                    initDate: new Date(),
                    delFlg: false,
                }
            });
            const records = await BookCategory.insertMany(bookCategorys);
            responseHandler(res, records);
        } catch (error) {
            errorResponseHandler(res, error);
        }
    }
    
    // router.delete("delete-delete", Controller.deleteCategorys)
    /**
     * body {
     *  categoryIds: string[]
     * }
     * @param {*} req 
     * @param {*} res 
     */
    async deleteCategorys(req, res) {
        const { categoryIds } = req.body;
        if(!categoryIds || categoryIds.length < 0){
            responseHandler(req, {});
            return;
        }
        try {
            const objectIds = categoryIds.map(item => mongoose.Types.ObjectId(item));
            const records = await BookCategory.updateMany({_id: {$in: objectIds}}, {delFlg: true});
            responseHandler(req, records);
        } catch (error) {
            errorResponseHandler(req, error);
        }
    }
}

module.exports = new BookCategoryCommandController();