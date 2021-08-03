import express from "express";
const routerConfig = require('../config/router')

const router = express.Router()

router.get(routerConfig.default.kb.listingPage, (req, res) => {
  res.render('listing')
})

export default router
