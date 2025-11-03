'use client'

import React from 'react'
import { observer } from 'mobx-react-lite'
import { personStore } from '@/stores/person.store'
import { calculateAge } from '@/utils/birth-handlers'
import { InfoCard } from '@/components/InfoCard'
import { InfoRow } from '@/components/InfoRow'

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const formatPhone = (phone: { country_code: string; area_code: string; number: string }) => {
  return `+${phone.country_code} (${phone.area_code}) ${phone.number}`
}

export const PersonalInfoCard: React.FC = observer(() => {
  const person = personStore.person!

  return (
    <InfoCard title="Informações Pessoais">
      <InfoRow label="Nome Completo" value={`${person.first_name} ${person.last_name}`} />
      <InfoRow label="CPF" value={person.document_number} />
      <InfoRow label="Data de Nascimento" value={formatDate(person.birth_date)} />
      <InfoRow label="Idade" value={`${calculateAge(person.birth_date)} anos`} />
      <InfoRow label="Email" value={person.email} />
      <InfoRow label="Telefone" value={formatPhone(person.phone)} />
    </InfoCard>
  )
})

