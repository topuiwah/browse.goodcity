module.exports = function(app) {
  var express = require('express');
  var itemsRouter = express.Router();

  var items = [{ "id": "1", "offer_id": "2"} , { "id": "2", "offer_id": "2" }];
  var new_item = { "id": "3", "offer_id": "2", "donor_conditions_id": "1", "donor_description": "this is test item", "image_ids": ["1"] };
  var donor_conditions = [{ "id": 1, "name": "New" },{ "id": 4,"name": "Broken" },{ "id": 2,"name": "Lightly Used" },{ "id": 3,"name": "Heavily Used" }];

  var items_json = {
    "item": new_item,
    "donor_conditions": [{ "id": 1, "name": "New" }],
    "images": [{ "id": 1, "favourite":"true", "cloudinary_id":"1407764294/default/test_image.jpg" }],
  };

  itemsRouter.get('/', function(req, res) {
    res.send(items_json);
  });

  app.use('/api/v1/items', itemsRouter);
  app.use('/api/v1/items/:id', itemsRouter);
};
