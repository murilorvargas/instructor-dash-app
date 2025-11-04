import { InstructorStoreInitializer } from '@/providers/instructor-store-initializer'
import { PricingStoreInitializer } from '@/providers/pricing-store-initializer'
import { getInstructorServer } from '@/services/instructor/instructor.server'
import { getAllPricingsServer } from '@/services/pricing/pricing.server'

import { Sidebar } from './components/sidebar'
import { sidebarItems } from './components/sidebar-items'
import { InstructorPricingResponse } from '@/services/pricing/pricing.types'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const instructor = await getInstructorServer()

  let pricings: InstructorPricingResponse[] = []
  if (instructor) {
    pricings = await getAllPricingsServer(instructor.instructor_key)
  }
  return (
    <InstructorStoreInitializer initialInstructor={instructor}>
      <PricingStoreInitializer initialPricings={pricings}>
        <Sidebar items={sidebarItems} />
        <main className="lg:ml-[var(--sidebar-width,4rem)] transition-all duration-300 min-h-screen w-full overflow-x-hidden">
          {children}
        </main>
      </PricingStoreInitializer>
    </InstructorStoreInitializer>
  )
}

