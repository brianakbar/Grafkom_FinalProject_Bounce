const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    plugins: [
        // Automatically create an index.html with the right bundle name and references to our javascript.
        new HtmlWebpackPlugin({
            template: 'HTML/index.html'
        }),
        // Copy game assets from our static directory, to the webpack output
        new CopyPlugin({
            patterns: [
                {from: 'Assets', to: 'Assets'}
            ]
        }),
    ],
    // Entrypoint for our game
    entry: './Game.ts',
    module: {
        rules: [
            {
                // Load our GLSL shaders in as text
                test: /.(glsl|vs|fs|vert|frag)$/, exclude: /node_modules/, use: ['raw-loader']
            },
            {
                // Process our typescript and use ts-loader to transpile it to Javascript
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }

        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                },
            }),
        ],
    },
}