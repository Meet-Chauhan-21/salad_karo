const SaladModel = require("../model/Salad");

const getAllSalads = async (req, res) => {
    try {
        const salads = await SaladModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Salads fetched successfully",
            success: true,
            salads
        });
    } catch (err) {
        console.error("Fetch salads error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const createSalad = async (req, res) => {
    try {
        const { name, description, price, originalPrice, image, rating, reviews, badge, category } = req.body;

        if (!name || !description || !price || !image) {
            return res.status(400).json({
                message: "Name, description, price, and image are required",
                success: false
            });
        }

        const newSalad = new SaladModel({
            name,
            description,
            price,
            originalPrice,
            image,
            rating: rating || 5,
            reviews: reviews || 0,
            badge,
            category: category || 'Classic',
            isActive: true
        });

        await newSalad.save();

        res.status(201).json({
            message: "Salad created successfully",
            success: true,
            salad: newSalad
        });
    } catch (err) {
        console.error("Create salad error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const updateSalad = async (req, res) => {
    try {
        const { saladId } = req.params;
        const updateData = req.body;

        const updatedSalad = await SaladModel.findByIdAndUpdate(
            saladId,
            updateData,
            { new: true }
        );

        if (!updatedSalad) {
            return res.status(404).json({
                message: "Salad not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Salad updated successfully",
            success: true,
            salad: updatedSalad
        });
    } catch (err) {
        console.error("Update salad error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const deleteSalad = async (req, res) => {
    try {
        const { saladId } = req.params;

        const deletedSalad = await SaladModel.findByIdAndDelete(saladId);

        if (!deletedSalad) {
            return res.status(404).json({
                message: "Salad not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Salad deleted successfully",
            success: true
        });
    } catch (err) {
        console.error("Delete salad error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const toggleSaladStatus = async (req, res) => {
    try {
        const { saladId } = req.params;

        const salad = await SaladModel.findById(saladId);
        if (!salad) {
            return res.status(404).json({
                message: "Salad not found",
                success: false
            });
        }

        salad.isActive = !salad.isActive;
        await salad.save();

        res.status(200).json({
            message: "Salad status updated successfully",
            success: true,
            salad
        });
    } catch (err) {
        console.error("Toggle salad status error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    getAllSalads,
    createSalad,
    updateSalad,
    deleteSalad,
    toggleSaladStatus
};
