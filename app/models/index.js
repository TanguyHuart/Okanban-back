const List = require('./List');
const Card = require('./Card');
const Tag = require('./Tag');

//  association many-to-many , on précise le nom de la table de liaison , et on précise CASCADE sinon on ne pourra pas supprimer les tables en relations 
Tag.belongsToMany(Card, {
  as: 'cards',
  through: 'card_tag',
  foreignKey: 'tag_id',
  otherKey: 'card_id',
});
Card.belongsToMany(Tag, {
  as: 'tags',
  through: 'card_tag',
  foreignKey: 'card_id',
  otherKey: 'tag_id',
});
Card.belongsTo(List, {
  as: 'list',
  foreignKey: 'list_id',
});

List.hasMany(Card, {
  as: 'card',
  foreignKey: 'list_id',
});



module.exports = { List, Card, Tag };