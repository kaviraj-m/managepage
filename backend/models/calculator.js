module.exports = (sequelize, DataTypes) => {
    const Calculator = sequelize.define('Calculator', {
      expression: {
        type: DataTypes.STRING,
        allowNull: false
      },
      result: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: true,
      tableName: 'calculator'
    });
  
    return Calculator;
  };
  