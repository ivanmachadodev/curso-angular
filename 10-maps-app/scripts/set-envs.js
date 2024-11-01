const { writeFileSync, mkdirSync } = require('fs')

require('dotenv').config()

const targetPath = './src/environments/environments.ts';

const envFileContent = `
export const environment = {
  MAPBOX_KEY: "${ process.env['MAPBOX_KEY']}",
  otra: 'PROPIEDAD',
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync( targetPath, envFileContent );
