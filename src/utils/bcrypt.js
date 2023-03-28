import bcrypt from 'bcrypt';

export const createHash = (password) => {
    const saltRounds = parseInt(process.env.SALT);
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

export const comparePassword = (passwordLogin, passwordDB) => {
    return bcrypt.compareSync(passwordLogin, passwordDB);
}