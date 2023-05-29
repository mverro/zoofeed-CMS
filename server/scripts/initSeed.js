const { execSync } = require('child_process');

const initSeed = () => {
  try {
    execSync('npx sequelize-cli db:seed:all');
    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

initSeed();
