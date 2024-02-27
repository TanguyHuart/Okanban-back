/* eslint-disable no-undef */
const express = require('express');

const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController');
const associationController = require('./controllers/associationController');


const router = express.Router();

router.get('/lists', listController.getAllLists);
router.post('/lists', listController.createList);
router.get('/lists/:id', listController.getOneList);
router.patch('/lists/:id', listController.updateList);
router.delete('/lists/:id', listController.deleteList);


router.get('/lists/:id/cards', cardController.getAllCards);
router.post('/cards', cardController.createCard);
router.get('/cards/:id', cardController.getOneCard);
router.patch('/cards/:id', cardController.updateCard);
router.delete('/cards/:id', cardController.deleteCard);

router.get('/tags', tagController.getAllTags);
router.post('/tags', tagController.createTag);
router.get('/tags/:id', tagController.getOneTag);
router.patch('/tags/:id', tagController.updateTag);
router.delete('/tags/:id', tagController.deleteTag);

router.post('/cards/:id/tag', associationController.setTagToCard);
router.delete('/cards/:card_id/tag/:tag_id', associationController.deleteCardTagAssociation);


module.exports = router; 