/* eslint-disable max-len */
const {executeSQL} = require('../database');
const create = require('./orm/create');
const find = require('./orm/find');
const save = require('./orm/save');
const dbName = require('../config').db_name;

class Model {
  constructor(tableName, fields, user) {
    this.tableName = tableName;
    this.fields = fields;
    this.user = user;
    this.pk = null;
  }

  async create(obj) {
    const {cols, values} = create(obj, this.fields);
    try {
      await executeSQL(this.user, `INSERT INTO ?? ${cols.length === 0 ? '' : '(??)'} VALUES ${
                typeof values[0] === 'object' ? '?' : '(?)'
      }`,
      [this.tableName, cols, values]);
      return {success: 'Successfully added!'};
    } catch (e) {
      return {error: e};
    }
  }

  async findAll(obj) {
    const isAll = obj? false : true;
    let con = null;
    if (!isAll) {
      con = find(obj, this.tableName);
    }
    const query = `SELECT ${(!isAll && con.attributes)? '??': '*'} FROM ?? ${(!isAll && con.where)? 'WHERE '+con.where.query:''} ${(!isAll && con.like)? `${con.where?'AND':'WHERE'} ?? LIKE ?`:''} ${(!isAll && con.orderBy)? 'ORDER BY ??':''} ${(!isAll && con.orderByDESC)? 'ORDER BY ?? DESC':''} ${(!isAll && con.limit)? 'LIMIT '+con.limit:''}`;

    try {
      const data = await executeSQL(this.user, query, con.arr);
      return data;
    } catch (e) {
      return {error: e};
    }
  }

  async findOne({pk}) {
    let row;
    try {
      row = await this.findAll({where: pk});
      if(row.error) return {error : row.error.error.code};
    } catch (err) {
      return {error: err};
    }
    if (row.length > 1) {
      return {error: 'PK is not vaild'};
    }
    if (row.length == 0) {
      return {error: 'PK not found'};
    }
    this.pk = pk;
    this.fields = row[0];
    return {success: 'Employee found '};
  }

  async save() {
    if (!this.pk) return ({error: 'Need to call findOne before save'});
    const updates = save(this.fields);
    const query = `UPDATE ?? SET ${updates.map((e, i) =>i % 2 === 0 ? `?? = ?` : `${i === updates.length - 1 ? `` : `,`}`).join('')} WHERE ${this.pk.query? this.pk.query:'??=?'}`;
    try {
      const data = await executeSQL(this.user,
          query, [this.tableName, ...updates, ...(this.pk.query?this.pk.arr:Object.entries(this.pk)[0])]);
      return {data};
    } catch (e) {
      return {error: e};
    }
  }

  // eslint-disable-next-line require-jsdoc
  async describe() {
    try {
      const data =await executeSQL(this.user, `SELECT column_name, column_type FROM information_schema.columns WHERE table_schema = ? AND table_name = ?;`, [dbName, this.tableName]);
      return data;
    } catch (error) {
      return {error};
    }
  }
}

module.exports = Model;
