const PizzaModel=require("./../model/pizzaSchema")
// const CommentModel = require('./../model/pizzaSchema');





exports.allpizzas=(req,res)=>{
    PizzaModel.find().then((pizzas)=>res.json(pizzas)).catch((err)=>console.log(err))
}

exports.comments = async (req, res) => {
  try {
    const { id, username } = req.params;
    const { comment } = req.body;

   


    const pizza = await PizzaModel.findById(id);
    if (!pizza) {
      return res.status(404).json({ error: 'Pizza not found' });
    }
    var ct={
      username:username,
      comment:comment,
      createdat:Date.now()
    }
    console.log(ct)
    pizza.comments.push(ct);
    await pizza.save();
    console.log(pizza)
    res.json({ message: 'Comment added', comment: ct});
  } catch (err) {
    console.log('Error adding comment:', err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

exports.displaycomments = async (req, res) => {
  try {
    const { pizzaId } = req.params;

    const pizza = await PizzaModel.findById(pizzaId);
    if (!pizza) {
      return res.status(404).json({ error: 'Pizza not found' });
    }

    const comments = pizza.comments;
    res.send(comments);
  } catch (err) {
    console.log('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

