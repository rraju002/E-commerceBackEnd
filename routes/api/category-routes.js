const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
});
try {
  const categoryData = await Category.findAll({
    include: [
      {
        model: Product,
      }
    ]
  });
  if (!categoryData) {
    res.status(404).json({ message: "No categories available"});
  }
  res.status(200).json(categoryData);
} catch (err) {
  res.status(404).json(err);
};

router.post('/', async(req, res)=> {
  //build a new category 
  try {
    //check to see if category exists in db 
    const checkData = await Category.findOne({
      where: {
        category_name: req.body.category_name
      }
    });
    if (checkData){
      res.status(404).json({ message:"Category already exists in the database"});
      return;
    };
    //Create a new category
    const categoryData = await Category.create(req.body);
    //Send success message
    res.status(200).json({ message: "Success!" });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(
      req.params.id,
      {
        include: [
          {
            model: Product,
          }
        ]
      }
    );
    if (!categoryData) {
      res.status(404).json({ message: "No Results" });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try{
    const checkData = await Category.findOne({
      where: {
        category_name: req.body.category_name
      }
    });
    //send success msg
    if (checkData) {
      res.status(200).json({ message:"Success!"});
    } catch (err) {
      res.status(400).json(err)
    };

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const categoryData = await Category.findByPk(
      req.params.id,
      {
        include: [
          {
            model: Product
          }
        ]
      }
    );
    if (!categoryData) {
      res.status(404).json({ message: "No category matches ID." });
      return;
    }
});
//Update the row
    const updateData = await Category.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json(updateData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No results"});
      return;
    } else {
      res.status(200).json(categoryData);
    }
  } catch (err) {
    res.status(200).json(err);
  }
});

module.exports = router;
