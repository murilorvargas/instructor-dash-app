'use client'

import React from 'react'
import { observer } from 'mobx-react-lite'
import { personStore } from '@/stores/person.store'
import { InfoCard } from '@/components/InfoCard'
import { InfoRow } from '@/components/InfoRow'

export const AddressCard: React.FC = observer(() => {
  const person = personStore.person!

  return (
    <InfoCard title="Endereço">
      <InfoRow label="Rua" value={person.address.street} />
      <InfoRow label="Número" value={person.address.number} />
      {person.address.complement && (
        <InfoRow label="Complemento" value={person.address.complement} />
      )}
      <InfoRow label="Bairro" value={person.address.neighborhood} />
      <InfoRow label="Cidade" value={person.address.city} />
      <InfoRow label="Estado" value={person.address.state} />
      <InfoRow label="CEP" value={person.address.postal_code} />
    </InfoCard>
  )
})

