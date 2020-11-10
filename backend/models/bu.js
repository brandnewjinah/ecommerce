const product = require("./product");
exports.addItemToCart = async (req, res) => { const { userId, productId } = rew.body;
const qty = Number.parseInt(req.body.quantity);
try {
//get users cart
let cart = await cart.findOne({
userId: userId, });
//get selected product details
const productDetails = await product.findById(productId);
//Check if cart Exists and Check the quantity if items if (!cart && quantity item.productId == productId);
//this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list
if (indexFound !== -1 && quantity item.total).reduce((acc, next) => acc + next); }
//check if product exist,just add the previous quantity with the new quantity and update the total price else if (indexFound !== -1) {
cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity; cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price; cart.items[indexFound].price = productDetails.price
cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
}
//Check if Quantity is Greater than 0 then add item to items Array else if (quantity > 0) {
cart.items.push({
productId: productId,
quantity: quantity,
price: productDetails.price,
total: parseInt(productDetails.price * quantity)
})
cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next); }
//if quantity of price is 0 throw the error else {
return res.status(400).json({ type: "Invalid",
msg: "Invalid request" })
}
let data = await cart.save(); res.status(200).json({
type: "success",
mgs: "Process Successful", data: data
}) }
//if there is no user with a cart
//it creates a new cart and then adds the item to the cart that has been created else {
const cartData = { userId: userId,
items: [{
productId: productId,
quantity: quantity,
total: parseInt(productDetails.price * quantity), price: productDetails.price
}],
subTotal: parseInt(productDetails.price * quantity) }
cart = new Cart(cartData); let data = await cart.save(); res.json(data);
}
} catch (err) { console.log(err)
res.status(400).json({ type: "Invalid",
msg: "Something Went Wrong",
err: err })
} };