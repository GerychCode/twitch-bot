module.exports = generateNick = (length = 5) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let nickname = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      nickname += characters[randomIndex];
    }
    return nickname;
}