import express from "express";
import prisma from "../lib/prisma.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Récupérer toutes les annonces
router.get("/", async (req, res) => {
  try {
    const ads = await prisma.ad.findMany({
      include: { author: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Créer une annonce (Authentifié)
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, price, category, location, image } = req.body;
  try {
    const ad = await prisma.ad.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
        location,
        image,
        author: { connect: { id: req.userId } },
      },
    });
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de l'annonce" });
  }
});

export default router;
