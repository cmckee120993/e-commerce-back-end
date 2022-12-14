const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
  const catData = await Category.findAll({
    include: [Product]
  });
  if(!catData) {
    res.status(404).json({message: 'No categories were found.'});
    return;
  };
  return res.json(catData);
} catch(err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
  const catData = await Category.findOne({
    where: {
      id: req.params.id
    },
      include: [Product]
  });
  if(!catData) {
    res.status(404).json({message: 'No categories were found.'});
    return;
  };
  return res.json(catData);
} catch(err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
  const newCat = await Category.create({
    category_name: req.body.category_name
  });
  res.json(newCat);
} catch(err) {
  res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
try {  
const updateCat = await Category.update(req.body, {
where: {
  id: req.params.id
}, 
category_name: req.body.category_name
  }); 
  if (!updateCat) {
    res.status(404).json({message: 'No category was found using this id.'})
  };
  res.json(updateCat);
} catch(err) {
  res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
  const deleteCat = await Category.destroy({
    where: {
      id: req.params.id
    }
  });
  if (!deleteCat) {
    res.status(404).json({message: 'No category was found using this id.'})
  };
  res.json(deleteCat);
} catch(err) {
  res.status(500).json(err);
}
});

module.exports = router;
