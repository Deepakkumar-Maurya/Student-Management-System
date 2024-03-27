const Parent = require('../../models/parents');

const listParents = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;

    try {
        const count = await Parent.countDocuments();
        const totalPages = Math.ceil(count / limit);    // total pages

        // get students and pagination
        const parents = await Parent.find({})
            .skip((page - 1) * limit)
            .limit(limit);
        const parentList = parents.map(user => user.name);

        return res.status(200).json({ parentList, totalPages });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

module.exports = listParents;
