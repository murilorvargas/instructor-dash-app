import { CurrencyDollarIcon, UserIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const sidebarItems = [
  {
    icon: <UserIcon className="w-5 h-5" />,
    label: 'Meu Perfil',
    href: '/',
  },
  {
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
    label: 'Configuração de Preços',
    href: '/precos',
  },
]

