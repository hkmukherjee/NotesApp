const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    return {        
        mode: env.production ? 'production' : 'development',
        entry: './src/build/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        devtool: env.production ? 'source-map' : 'eval-cheap-module-source-map',
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: 9000,
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,                         
                        "css-loader",
                        "sass-loader"
                    ],
                }
            ]
        },
        plugins: [new MiniCssExtractPlugin({
            filename: 'styles.css'
        })]
    };
};