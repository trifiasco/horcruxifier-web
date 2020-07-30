const chunkify = (data, chunkNums) => {
    var chunkLength = Math.ceil(data.length / chunkNums)
    var chunks = new Array(chunkNums)
  
    for (let i = 0, o = 0; i < chunkNums; ++i, o += chunkLength) {
      chunks[i] = data.substr(o, chunkLength);
    }
    return chunks
}

module.exports = {
    chunkify: chunkify
}