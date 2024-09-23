module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      timestamps: true,
      tableName: 'notes'
    });
  
    return Note;
  };
  