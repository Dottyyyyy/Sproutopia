const {Category} = require('../models/category');

exports.getCategory = async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        req.status(500).json({success: false})
    }
    res.status(200).send(categoryList);
}

exports.getCategoryId = async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(500).json({ message: 'The category with the given ID was not found.' })
    }
    res.status(200).send(category);;
}

exports.createCategory = async (req, res) => {
    let category = new Category({
        name: req.body.name,
        description: req.body.description,
        icon: req.body.icon,
        color: req.body.color
    })

    category = await category.save();

    if (!category)
        return res.status(400).send('The category cant be created!')

    res.send(category);
}

exports.deleteCategory = async (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, message: 'Category deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "Category not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
}