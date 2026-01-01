/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongodb']
  },
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        child_process: false,
        worker_threads: false,
        crypto: false,
        dns: false,
        os: false,
        path: false,
        stream: false,
        util: false,
        zlib: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;