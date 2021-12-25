const CompressionPlugin = require(`compression-webpack-plugin`);
// const BrotliPlugin = require(`brotli-webpack-plugin`);
// const path = require(`path`);
module.exports = {
    plugins:[
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
}