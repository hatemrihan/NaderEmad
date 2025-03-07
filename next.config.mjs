/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/NaderEmad',
    typescript:{
        ignoreBuildErrors: true,
    },
    eslint:{
        ignoreDuringBuilds:true,
    },
    images: {
        unoptimized: true,
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            type: 'asset/resource',
        });
        config.module.rules.push({
            test: /\.(mp4|webm)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/_next',
                        name: 'static/media/[name].[hash].[ext]',
                    },
                },
            ],
        });
        return config;
    }
};

export default nextConfig;


