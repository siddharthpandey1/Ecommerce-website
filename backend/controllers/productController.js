import { product } from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const addProduct = async (req, res) => {
    try {
        const { productName, productDesc, productPrice, category, brand } = req.body;
        const userId = req.id;

        if (!productName || !productDesc || !productPrice || !category || !brand) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        //Handle multiple Images upload

        let productImg = [];
        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const fileUri = getDataUri(file)
                const result = await cloudinary.uploader.upload(fileUri, {
                    folder: "mern_products"
                });
                productImg.push({
                    url: result.secure_url,
                    public_id: result.public_id
                })
            }
        }
        const newProduct = await product.create({
            userId,
            productName,
            productDesc,
            productPrice,
            category,
            brand,
            productImg,
        })
        return res.status(200).json({
            success: true,
            message: "Product addedd successfully",
            product: newProduct
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const gettAllProduct = async (_, res) => {
    try {
        const products = await product.find()
        if (!products) {
            return res.status(404).json({
                success: false,
                message: "No product available",
                product: []
            })
        }
        return res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const Product = await product.findById(productId);

        if (!Product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            });
        }

        // Delete images from Cloudinary
        if (Product.productImg && Product.productImg.length > 0) {
            for (let img of Product.productImg) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        }

        // Delete product from MongoDB
        await product.findByIdAndDelete(productId);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { productName, productDesc, productPrice, category, brand, existingImages } = req.body;

        const Product = await product.findById(productId)
        if (!Product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            })
        }
        let updateImages = []

        if (existingImages) {
            const keepIds = JSON.parse(existingImages);
            updateImages = Product.productImg.filter((img) =>
                keepIds.includes(img.public_id)
            );
            const removedImages = Product.productImg.filter(
                (img) => !keepIds.includes(img.public_id)
            );
            for (let img of removedImages) {
                await cloudinary.uploader.destroy(img.public_id)
            }
        } else {
            updateImages = Product.productImg
        }

        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const fileUri = getDataUri(file)
                const result = await cloudinary.uploader.upload(fileUri, { folder: "mern_products" })
                updateImages.push({
                    url: result.secure_url,
                    public_id: result.public_id
                })
            }
        }

        Product.productName = productName || Product.productName;
        Product.productDesc = productDesc || Product.productDesc;
        Product.productPrice = productPrice || Product.productPrice;
        Product.category = category || Product.category;
        Product.brand = brand || Product.brand;
        Product.productImg = updateImages;

        await Product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: Product
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}