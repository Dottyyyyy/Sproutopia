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

const uploadMultiple = async ({ imageFiles, request }) => {
    const basePath = `${request.protocol}://${request.get('host')}/${path}`;

    const images = imageFiles.map(image => {
        return `${basePath}${image.filename}`
    })

    return images
}

exports.createBrand = async (req, res) => {

    try {
        const file = req.file;
        const imageFiles = req.files; // Assuming req.files contains an array of additional images

        if (!file && !imageFiles.length) return res.status(400).send('No images in the request');

        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        const mainImage = file ? `${basePath}${file.filename}` : null;

        const images = imageFiles.map(image => {
            return `${basePath}${image.filename}`;
        });

        let brand = new Brand({
            name: req.body.name,
            location: req.body.location,
            image: mainImage,
            images: images, // Assuming there's a field in Brand model to store multiple images
            // icon: req.body.icon,
            // color: req.body.color
        });

        brand = await brand.save();

        if (!brand)
            return res.status(400).send('the brand cannot be created!')

        res.send(brand);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
        console.log(error)
    }

    // try {

    //     req.body.images = await ImageFile.uploadMultiple({
    //         imageFiles: req.files,
    //         request: req
    //     })

    //     const brand = await Brand.create(req.body);

    //     return res.status(200).json({
    //         success: true,
    //         message: 'Category successfully added',
    //         brand: brand,
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