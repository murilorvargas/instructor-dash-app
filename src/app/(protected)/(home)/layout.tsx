import { InstructorStoreInitializer } from '@/providers/instructor-store-initializer'
import { getInstructorServer } from '@/services/instructor/instructor.server'
import { Sidebar } from './components/sidebar'
import { sidebarItems } from './components/sidebar-items'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const instructor = await getInstructorServer()

  return (
    <InstructorStoreInitializer initialInstructor={instructor}>
      <Sidebar items={sidebarItems} />
      <main className="lg:ml-[var(--sidebar-width,4rem)] transition-all duration-300 min-h-screen w-full overflow-x-hidden">
        {children}
      </main>
    </InstructorStoreInitializer>
  )
}

