const Cart = require("./../models/cartModel");

const Book = require("./../models/bookModel");

// Add to cart
exports.addToCart = async(req,res) =>{
    
    const userId = req.user.id;
    const {itemId, quantity} = req.body;
    let cart = await Cart.findOne({userId});
    let book = await Book.findById(itemId);

    if (cart) {
        //Check whether the user is trying to add a item which is already exists in cart
        //if so, take its index value
        let itemIndex = cart.items.findIndex(p=>p.itemId.toString() === itemId);
        if(itemIndex > -1){
            //simply update the item quatity, price, totalPrice
            cart.items[itemIndex].quantity+= quantity;
            cart.items[itemIndex].price = book.price;
            cart.items[itemIndex].total = cart.items[itemIndex].quantity*book.price;
        }else{
            //when a new item is added to cart, then push it to items array
            cart.items.push({
                itemId,
                quantity,
                price: book.price,
                total: quantity* book.price
            })

        }      
    } else {
        //If the user donot have a cart, then try to create a new cart
        let price = book.price;
        cart = new Cart({
            userId,
            items:[{itemId, quantity, price:book.price, total:quantity*price} ]
        })
        
    }
    //update subtotal in cart
    cart.subTotal = cart.items.reduce((acc, item)=> acc + item.total,0);
    const myCart = await cart.save();
    res.status(201).json({
        status: 'success',
        myCart
    })
}

//Get cart
exports.goToCart = async(req, res)=>{
    const userId = req.user.id;
    const cart = await Cart.findOne({userId});
    res.status(200).json({
        status:'success',
        data:{
            cart
        }
    })
}

//removeFromCart

exports.removeItem =async(req, res)=>{
  const itemId = req.body.itemId;
  const userId = req.user.id;
  const cart = await Cart.findOne({userId});
  if(!cart) return res.status(400).json({
    message: 'cart is not present for this id'
  }) 
  
  const itemIndex = cart.items.findIndex((p)=>p.itemId.toString()===itemId);
  if(itemIndex>-1){
    cart.items.splice(itemIndex,1);
    //recalculate the subTotal amount in cart
    cart.subTotal = cart.items.reduce((acc,item)=>acc+item.total, 0);
    const myCart = await cart.save();
    res.status(200).json({
        status:'success',
        message:'Item removed from cart'
    })
  }else{
    res.status(400).json({
        status:'fail',
        message:'Item doesnot exist in Cart!'
    })
  }
}