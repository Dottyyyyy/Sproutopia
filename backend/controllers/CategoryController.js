const { Category } = require('../models/category');

exports.getCategory = async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        req.status(500).json({ success: false })
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

// const uploadMultiple = async ({ imageFiles, request }) => {
//     const basePath = `${request.protocol}://${request.get('host')}/${path}`;

    // const images = imageFiles.map(image => {
    //     return `${basePath}${image.filename}`
    // })

//     return images
// }

exports.createCategory = async (req, res) => {

    try {
        const file = req.file;
        const imageFiles = req.files; // Assuming req.files contains an array of additional images
        
        if (!file && !imageFiles.length) return res.status(400).send('No images in the request');

        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        const mainImage = file ? `${basePath}${file.filename}` : null;

        const images = imageFiles.map(image => {
            return `${basePath}${image.filename}`;
        });

        let category = new Category({
            name: req.body.name,
            location: req.body.location,
            image: mainImage,
            images: images, // Assuming there's a field in Brand model to store multiple images
            // icon: req.body.icon,
            // color: req.body.color
        });

        category = await category.save();

        if (!category)
            return res.status(400).send('the brand cannot be created!')

        res.send(category);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
        console.log(error)
    }

    // try {

    //     req.body.images = await ImageFile.uploadMultiple({
    //         imageFiles: req.files,
    //         request: req
    //     })

    //     const category= await Brand.create(req.body);

    //     return res.status(200).json({
    //         success: true,
    //         message: 'Category successfully added',
    //         category: category,
    //     })

    // } catch (err) {
    //     errorHandler({ error: err, response: res })
    // }
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


// exports.updateCategory = async (req, res, next) => {
//     try {
//         let categories = await category.findById(req.params.id);

//         if (!categories) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'category not found'
//             });
//         }

//         if (req.files && req.files.length > 0) {
//             let images = [];

//             for (let i = 0; i < req.files.length; i++) {
//                 const image = req.files[i];
//                 const imagePath = `${req.protocol}://${req.get('host')}/public/uploads/${image.filename}`;
//                 images.push(imagePath);
//             }

//             // You may want to handle the deletion of previous images here if necessary

//             req.body.images = images;
//         }

//         brands = await Brand.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true,
//             useFindandModify: false
//         });

//         return res.status(200).json({
//             success: true,
//             brands
//         });
//     } catch (error) {
//         console.error('Error updating category:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Failed to update category'
//         });
//     }
// };
exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Check if categoryId is provided
        if (!categoryId) return res.status(400).send('Category ID is required');

        // Find the category by ID
        let category = await Category.findById(categoryId);

        // If category doesn't exist, return 404
        if (!category) return res.status(404).send('Category not found');

        // Update brand properties
        if (req.body.name) cateogry.name = req.body.name;
        if (req.body.location) category.location = req.body.location;

        /// Handle image updates if any images are provided in the request
        if (req.files && req.files.length > 0) {
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
            const images = req.files.map(image => `${basePath}${image.filename}`);
            category.images = images;
        }

        // Save the updated category
        category = await category.save();

        // If category couldn't be updated, return an error
        if (!category) return res.status(400).send('The category could not be updated');

        // Respond with the updated category
        res.send(category);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
        console.log(error);
    }
};