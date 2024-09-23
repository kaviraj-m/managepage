module.exports = (sequelize, DataTypes) => {
    const TodoList = sequelize.define('TodoList', {
      task: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      timestamps: true,
      tableName: 'todolist'
    });
  
    return TodoList;
  };
  