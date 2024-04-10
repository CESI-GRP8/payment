const express = require("express")
const router = express.Router();

const paymentController = require("../controllers/payment.controllers")

router.get("/check", (req, res) => {
    res.status(200).json({ message: "API is up!" })
})

router.patch("/pay/:id", paymentController.pay)

router.post("/create", paymentController.createPayments)

router.get("/payments", paymentController.readPayments)
router.get("/payments/:id", paymentController.readPayments)

router.patch("/payments/:id", paymentController.updatePayments)

router.delete("/payments/:id", paymentController.deletePayments)

module.exports = router