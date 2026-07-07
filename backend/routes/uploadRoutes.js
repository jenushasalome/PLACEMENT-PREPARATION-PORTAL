import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});


router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          message: "No image selected",
        });
      }

      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(
        base64,
        {
          folder: "PrepPortal/ProfileImages",
        }
      );

      res.json({
        imageUrl: result.secure_url,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Image upload failed",
      });

    }
  }
);

export default router;