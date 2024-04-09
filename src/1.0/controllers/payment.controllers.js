exports.createPayments = async (req, res) => {
    try {
        var newPayment = new Payment({
            example: req.body.example,
        })
        await newPayment.save()
        return res.status(200).json(newPayment)
    } catch (error) {
        console.log(error)
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json(errors);
        }
        if (error.name === "MongoServerError") {
            return res.status(400).json({ message: error.message });

        }
        return res.status(500).json({ message: "Something went wrong!" });
    }
}

exports.readPayments = async (req, res) => {
    try {
        if (req.params.id) {
            return res.status(200).json(await Payment.find({ _id: req.params.id }))
        }
        return res.status(200).json(await Payment.find())
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

exports.updatePayments = async (req, res) => {
    try {
        const updatedPayment = await Payment.findOneAndUpdate({ _id: req.params.id }, req.body)
        if (updatedPayment != null) {
            return res.status(200).json({ message: `Payment ${req.params.id} updated!` })
        }
        return res.status(404).json({ message: `Payment ${req.params.id} not found!` })

    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

exports.deletePayments = async (req, res) => {
    try {
        const deletedPayment = await Payment.deleteOne({ _id: req.params.id })
        if (deletedPayment.deletedCount != 0) {
            return res.status(200).json({ message: `Payment ${req.params.id} deleted!` })
        }
        return res.status(404).json({ message: `Payment ${req.params.id} not found!` })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}