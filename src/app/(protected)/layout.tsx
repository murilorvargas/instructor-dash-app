import { PersonStoreInitializer } from '@/providers/person-store-initializer'
import { getPersonServer } from '@/services/person/person.server'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const person = await getPersonServer()

  return (
    <PersonStoreInitializer initialPerson={person}>
      {children}
    </PersonStoreInitializer>
  )
}
