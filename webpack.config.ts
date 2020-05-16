import path from 'path'
import webpack from 'webpack'

const isDev: boolean = process.env.NODE_ENV === 'development'

const config: webpack.Configuration = {
    mode: isDev?"development": "production",
    entry : './src/index.ts',
    module:{
        rules : [
            {
                test : /\.tsx?$/,
                use : 'ts-loader',
                exclude : '/node_modules/'
            }
        ]
    },
    resolve : {
        extensions : ['.tsx','.ts','.js']
    },
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : '[name].bundle.js'
    }
}

export default config