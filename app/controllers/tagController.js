const { Tag, List, Card } = require('../models/index');

const tagController = {

  getAllTags: async (req, res, next) => {
    try {

      const tags = await Tag.findAll();
      res.json(tags);

    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }

  },

  getOneTag: async (req, res, next) => {
    const { id } = req.params;
    try {
      const tag = await Tag.findByPk(id);

      if (!tag) {
        response.status(404).json({ "error": "Tag not found. Please verify the provided id." })
      }
      res.json(tag);
    }
    catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }

  },

  createTag: async (req, res) => {
    const { name, color } = req.body;
    try {

      if (!name || !color) {
        return res.status(400).json({ error: "Missing body parameter: name or color" });
      }

      const newTag = await Tag.create({
        name,
        color,
      })
      res.status(201).json(newTag);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.toString());
    }

  },

  updateTag: async (req, res) => {
    try {
      const { name, color } = req.body;
      const { id } = req.params;

      const updatedTag = await Tag.findByPk(id)

      if (!updatedTag) {
        res.status(404).json({ "error": "Tag not found. Please verify the provided id." })
      }

      if (name) {
        await updatedTag.update({ name })
      }
      if (color) {
        await updatedTag.update({ color })
      }
      // const newTag = await Tag.update({
      //   name,
      //   position,
      // },
      //   {
      //     where: { id }
      //   });

      res.json(updatedTag);
    } catch (error) {
      console.error(error);
    }
  },

  deleteTag: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTag = await Tag.destroy({
        where: { id }
      });
      res.json(deleteTag);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = tagController;