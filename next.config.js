/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig

// Este arquivo agora usa App Router (pasta app/)
// Rotas:
// - / → Dashboard (protegido - requer token)
// - /login → Login
// - /cadastro → Cadastro público (sem token)
