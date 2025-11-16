import { InstructorStoreInitializer } from '@/providers/instructor-store-initializer'
import { PricingStoreInitializer } from '@/providers/pricing-store-initializer'
import { VehicleStoreInitializer } from '@/providers/vehicle-store-initializer'
import { getInstructorServer } from '@/services/instructor/instructor.server'
import { getAllPricingsServer } from '@/services/pricing/pricing.server'
import { getAllVehiclesServer } from '@/services/vehicle/vehicle.server'

import { Sidebar } from './components/sidebar'
import { sidebarItems } from './components/sidebar-items'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const instructor = await getInstructorServer()

  const pricings = await getAllPricingsServer(instructor.instructor_key)
  const vehicles = await getAllVehiclesServer(instructor.instructor_key)
  return (
    <InstructorStoreInitializer initialInstructor={instructor}>
      <PricingStoreInitializer initialPricings={pricings}>
        <VehicleStoreInitializer initialVehicles={vehicles}>
          <Sidebar items={sidebarItems} />
          <main className="lg:ml-[var(--sidebar-width,4rem)] transition-all duration-300 min-h-screen w-full overflow-x-hidden">
            {children}
          </main>
        </VehicleStoreInitializer>
      </PricingStoreInitializer>
    </InstructorStoreInitializer>
  )
}

