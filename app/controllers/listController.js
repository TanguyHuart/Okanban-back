const { List, Tag, Card } = require('../models/index')
const path = require('path')

const listController = {
// SELECT * FROM list
// JOIN card ON list.id = card.list_id
// JOIN card_tag ON card.id = card_tag.card_id 
// JOIN tag ON card_tag.tag_id = tag.id
// ORDER BY list.position ASC, 
// card.position ASC,
// tag.name ASC,
// card.title ASC;

  getAllLists: async (req, res) => {
    try {
      const list = await List.findAll({
        include: [
          {
            association: 'card',
            include: [
              {
                association: 'tags'
              }
            ],
            order: ['tags', 'name', 'ASC']
          },
        ],
        order: [
          ['position', 'ASC'],
          ['card', 'position', 'ASC']
        ]
      });
      res.json(list);

    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }
  },

  getOneList: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const list = await List.findByPk(id, {
        include: [
          {
            association: 'card',
            include: [
              {
                association: 'tags'
              }
            ],
            order: ['tags', 'name', 'ASC']
          },
        ],
        order: [
          ['card', 'position', 'ASC']
        ]
      });

      if (!list) {
        response.status(404).json({ "error": "List not found. Please verify the provided id." })
      }
      res.json(list);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }
  },

  createList: async (req, res) => {
    try {
      const { name, position } = req.body;
      console.log(name);
      if (!name) {
        return res.status(400).json({ error: "Missing name parameter" });
      }
      if (position && typeof position !== "number") {
        return res.status(400).json({ error: "Invalid type : position should be a number" });
      }
      const newlist = await List.create({
        name,
      })
      res.status(201).json(newlist);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },

  updateList: async (req, res) => {
    try {
      const { name, position } = req.body;
      const { id } = req.params;

      const list = await List.findByPk(id);

      if (!list) {
        return response.status(404).json({ "error": "List not found. Please verify the provided id." })
      }

      if (name) {
        await list.update({ name })
      }
      if (position) {
        if (typeof position !== "number") {
          return res.status(400).json({ error: "Invalid type : position should be a number" });
        }
        await list.update({ position })
      }
      res.json(list);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }
  },

  deleteList: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteList = await List.destroy({
        where: { id }
      });
      res.status(204).json(deleteList);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }
  }
};

module.exports = listController;