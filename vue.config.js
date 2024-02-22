module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/music-key-trainer/'
      : '/',
    configureWebpack: {
        module: {
            rules: [
                { 
                    test: /\.mid$/, type: 'asset/source' 
                },
            ],
        },
    }
  }
  