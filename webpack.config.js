const path = require('path')

module.exports = env => ({
    entry: path.resolve(__dirname, 'src', 'app', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'src', 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, 'src', 'app'),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                      ]
                    }
                  }],
            }
        ]
    }
})