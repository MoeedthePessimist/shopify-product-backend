import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Shopify from "shopify-api-node";

dotenv.config();

const adminApiToken = process.env.ADMIN_API_TOKEN;
const shopifyApiKey = process.env.SHOPIFY_API_KEY;

const shopName = process.env.SHOPIFY_SHOP_NAME;

const shopify = new Shopify({
  shopName: shopName,
  apiKey: shopifyApiKey,
  password: adminApiToken,
});

const port = process.env.PORT;

const app = express();

app.use(cors());

app.get("/products", async (req, res) => {
  const { id } = req.query;

  try {
    const products = await shopify.product.list();

    const foundProduct = products.find((product) =>
      product.title.toLowerCase().includes(id.toLowerCase())
    );

    const data = {
      link: `${process.env.APP_LINK}${foundProduct.handle}`,
      price: foundProduct.variants[0].price,
    };

    res.status(200).json({
      data,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
