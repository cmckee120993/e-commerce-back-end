const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
  const tagsData = await Tag.findAll({
    include: {
      model: Product,
    attributes: ['product_name', 'price', 'stock', 'category_id']}
  });
  if(!tagsData) {
    res.status(404).json({message: 'No products found.'});
    return
  };
  return res.json(tagsData);
} catch(err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
  const tagsData = await Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
    attributes: ['product_name', 'price', 'stock', 'category_id']}
  });
  if(!tagsData) {
    res.status(404).json({message: 'No products were found using that tag id.'});
    return
  };
  return res.json(tagsData);
} catch(err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
const newTag = await Tag.create({
  tag_name: req.body.tag_name
});
 res.json(newTag);
} catch(err) {
  res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
 try { const updateTag = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  if(!updateTag) {
    res.status(404).json({message: 'No tags were found using this id.'});
    return
  };
  res.json(updateTag);
} catch(err) {
  res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
try {
  const deleteTag = Tag.destroy({
  where: {
    id: req.params.id
  }
});
if (!deleteTag) {
  res.status(404).json({message: 'No tag was found using this id.'});
  return
}
res.json(deleteTag)
} catch(err) {
  res.status(500).json(err);
}
});

module.exports = router;
