import express from "express";
import protectedRoute from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protectedRoute, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    //upload image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image);
    const imageUrl = uploadedImage.secure_url;

    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });
    await newBook.save();

    res.status(201).json({ message: "Book created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating book" });
  }
});

router.get("/", protectedRoute, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profilePic");

    res.status(200).json({
      books,
      currentPage: page,
      totalBooks: books.length,
      totalPages: Math.ceil(books.length / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching books" });
  }
});

router.get("/:id", protectedRoute, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "user",
      "username profilePic"
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    res.status(500).json({ message: "Error fetching book" });
  }
});

export default router;
