import { config } from '../config/config.js';
import sq from 'sequelize';
const { host, user, database, password } = config.mysql;
export const sqz = new sq.Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
    logging: false,
});
//# sourceMappingURL=mysql.js.map