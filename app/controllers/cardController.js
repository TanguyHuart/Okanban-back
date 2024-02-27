const { Card, List, Tag } = require('../models/index');

const cardController = {

  getAllCards: async (req, res, next) => {
    try {
      const { id } = req.params
      const cards = await Card.findAll({
        where: {
          list_id: id
        },
        include: [
          {
            association: 'tags'
          }
        ],
        order: [['position', 'ASC']]

      });

      if (!cards) {
        return res.status(400).json({ "error": "Card not found. Please verify the provided id." })
      }
      res.json(cards);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }
  },

  getOneCard: async (req, res, next) => {
    try {
      const { id } = req.params;

      const card = await Card.findByPk(id, {
        include: [
          {
            association: 'tags'
          }
        ]
      });
      if (!card) {
        return res.status(400).json({ "error": "Card not found. Please verify the provided id." })
      }
      res.json(card);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }
  },

  createCard: async (req, res) => {
    try {
      const { title, color, position, list_id } = req.body;
      if (!title || !list_id) {
        return res.status(400).json({ "error": "Missing body parameter" })
      }
      if (position && typeof position !== "number") {
        return res.status(400).json({ "error": "Invalid type : position should be a number" })
      }
      if (typeof parseInt(list_id) !== 'number') {
        return res.status(400).json({ "error": "Invalid type : level_id should be a number" })
      }
      const card = await Card.create({
        title,
        color,
        position,
        list_id
      })
      res.status(201).json(card);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }
  },

  updateCard: async (req, res) => {
    try {
      const { title, position, color, list_id } = req.body;
      const { id } = req.params;

      const updatedCard = await Card.findByPk(id);

      // if (position && typeof position !== "number") {
      //   return res.status(400).json({ "error": "Invalid type : position should be a number" })
      // }

      if (title) {
        await updatedCard.update({ title })

      }
      if (color) {
        await updatedCard.update({
          color
        })
      }
      if (position) {
        await updatedCard.update({
          position
        })
      }
      if (list_id) {
        await updatedCard.update({
          list_id
        })
      }

      // const newCard = await Card.update({
      //   title,
      //   color,
      //   position,
      // },
      //   {
      //     where: { id }
      //   });

      res.json(updatedCard);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }
  },

  deleteCard: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteCard = await Card.destroy({
        where: { id }
      });
      res.json(deleteCard);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = cardController;