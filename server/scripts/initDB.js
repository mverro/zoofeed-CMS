const { execSync } = require('child_process');

const initDB = () => {
  try {
    execSync('npx sequelize-cli db:create');
    execSync('npx sequelize-cli db:migrate');
    console.log('Database initialization completed.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initDB();
