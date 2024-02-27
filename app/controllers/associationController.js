const { List, Card, Tag } = require('../models/index');

const associationController = {

  setTagToCard: async (req, res) => {
    const { id } = req.params;
    const { tag_id } = req.body;
    console.log(tag_id);
    try {

      const card = await Card.findByPk(id)
      if (!card) {
        return res.status(400).json({ "error": "Card not found. Please verify the provided id." })
      }

      const tag = await Tag.findByPk(tag_id)
      if (!tag) {
        res.status(404).json({ "error": "Tag not found. Please verify the provided id." })
      }
      await card.addTags(tag);

      const associatedCard = await Card.findByPk(id, {
        include: ['tags']
      })
      console.log(associatedCard);
      res.status(201).json(associatedCard);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }
  },

  deleteCardTagAssociation: async (req, res) => {
    const { card_id, tag_id } = req.params;

    try {
      const card = await Card.findByPk(card_id)
      if (!card) {
        return res.status(400).json({ "error": "Card not found. Please verify the provided id." })
      }
      const tag = await Tag.findByPk(tag_id)
      if (!tag) {
        response.status(404).json({ "error": "Tag not found. Please verify the provided id." })
      }

      await card.removeTag(tag);

      const associatedCard = await Card.findByPk(card_id, {
        include: ['tags']
      })
      res.status(201).json(associatedCard);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }

  }
};

module.exports = associationController;
