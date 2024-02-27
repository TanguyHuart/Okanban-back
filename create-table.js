require('dotenv').config();
// importation de sequelize
const sequelize = require('./app/database');
//  importation des models
const { List, Card, Tag } = require('./app/models/index');

// creation d'un objet db pour creer les tables et les seed
const db = {
  create: async () => {
    try {
      // drop toute les tables
      await sequelize.drop();
      //  crée les tables en fonctions des models définis
      await sequelize.sync();
      // appel de la fonction seeding 
      db.seeding();
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * Fonction qui permet de remplir la db
   */
  seeding: async () => {
    try {
      const listTodo = await List.create({
        name: 'ToDo',
        position: '1'
      });

      const listDoing = await List.create({
        name: 'Doing',
        position: '2'
      });
      const listDone = await List.create({
        name: 'Done',
        position: '3'
      });

      const cardCourse = await Card.create({
        title: 'Faire les courses',
        color: 'pink',
        position: '1'
      });

      const cardMenage = await Card.create({
        title: 'Faire le ménage',
        color: 'gray',
        position: '1'
      });

      const cardMagic = await Card.create({
        title: 'Jouer au Magic',
        color: 'wheet',
        position: '1'
      });

      const tagUrg = await Tag.create({
        name: 'Urgent',
        color: 'reg'
      });

      const tagTrkl = await Tag.create({
        name: 'Tranquille',
        color: 'green'
      });

      const tagWarning = await Tag.create({
        name: 'Critique',
        color: 'red'
      })

      //  cette suite de commande permet de définir la valeur de la clé étrangère 
      // cardCourse.setList(listTodo) va donner à la ligne cardCourse la clé étrangère list_id qui correspond à l'id de la ligne listTodo
      cardCourse.setList(listTodo);
      // cardMenage.setList(listDoing) va donner à la ligne cardMenage la clé étrangère list_id qui correspond à l'id de la ligne listDoing
      cardMenage.setList(listDoing);
      cardMagic.setList(listDone);

      //  dans le cas de la relation Many-to-Many, on attribue id de tagUrg et l'id de cardMagic à la table de liason card_tag 
      tagUrg.setCards(cardMagic);
      tagTrkl.setCards(cardMagic);
      cardMenage.setTags(tagTrkl);

    } catch (error) {
      console.error(error);
    }
  }
};

db.create();